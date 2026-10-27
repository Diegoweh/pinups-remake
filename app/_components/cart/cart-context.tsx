"use client";

import { createContext, use, useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { menuById, type MenuItem } from "../../_data/site";

const STORAGE_KEY = "pinups-cart-v1";

/** Selected choice id per option group id. */
export type SelectedOptions = Record<string, string>;

export type CartLine = {
  /** Item id + selected options; two lines with the same key are merged. */
  key: string;
  itemId: string;
  quantity: number;
  options: SelectedOptions;
  notes: string;
};

export type ResolvedLine = CartLine & {
  item: MenuItem;
  /** Unit price including option surcharges, or null when the item is market price. */
  unitPrice: number | null;
  optionLabels: { title: string; label: string }[];
};

type CartContextValue = {
  lines: ResolvedLine[];
  totalItems: number;
  total: number;
  /** True when at least one line is market price, so the total is partial. */
  hasPendingPrices: boolean;
  isOpen: boolean;
  /** Bumped on every add, so UI can replay a "just added" animation. */
  addedTick: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (itemId: string, options?: SelectedOptions) => void;
  setQuantity: (key: string, quantity: number) => void;
  setOption: (key: string, groupId: string, choiceId: string) => void;
  setNotes: (key: string, notes: string) => void;
  removeLine: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function defaultOptions(item: MenuItem): SelectedOptions {
  return Object.fromEntries((item.options ?? []).map((g) => [g.id, g.choices[0].id]));
}

function lineKey(itemId: string, options: SelectedOptions) {
  const opts = Object.keys(options)
    .sort()
    .map((k) => `${k}=${options[k]}`)
    .join("&");
  return opts ? `${itemId}?${opts}` : itemId;
}

/** Merges lines that ended up with the same key (e.g. after changing an option). */
function normalize(lines: CartLine[]) {
  const merged = new Map<string, CartLine>();
  for (const line of lines) {
    const key = lineKey(line.itemId, line.options);
    const prev = merged.get(key);
    if (prev) {
      prev.quantity += line.quantity;
      prev.notes = [prev.notes, line.notes].filter(Boolean).join(" · ");
    } else {
      merged.set(key, { ...line, key });
    }
  }
  return [...merged.values()];
}

function resolve(line: CartLine): ResolvedLine | null {
  const item = menuById.get(line.itemId);
  if (!item) return null;
  let unitPrice = item.price;
  const optionLabels: ResolvedLine["optionLabels"] = [];
  for (const group of item.options ?? []) {
    const choice = group.choices.find((c) => c.id === line.options[group.id]) ?? group.choices[0];
    if (unitPrice !== null) unitPrice += choice.price ?? 0;
    optionLabels.push({ title: group.title, label: choice.label });
  }
  return { ...line, item, unitPrice, optionLabels };
}

function readStorage(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as CartLine[]) : [];
    return Array.isArray(parsed) ? parsed.filter((l) => menuById.has(l.itemId) && l.quantity > 0) : [];
  } catch {
    return [];
  }
}

/* localStorage-backed store: survives reloads and stays in sync across tabs. */

const EMPTY: CartLine[] = [];
let storeLines: CartLine[] | null = null;
const listeners = new Set<() => void>();

const getSnapshot = () => (storeLines ??= readStorage());
const getServerSnapshot = () => EMPTY;

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    storeLines = readStorage();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function setRawLines(update: (lines: CartLine[]) => CartLine[]) {
  storeLines = update(getSnapshot());
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storeLines));
  } catch {
    // Storage unavailable (private mode); the cart still works for this visit.
  }
  listeners.forEach((l) => l());
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const rawLines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);
  const [addedTick, setAddedTick] = useState(0);

  const addItem = useCallback((itemId: string, options?: SelectedOptions) => {
    const item = menuById.get(itemId);
    if (!item) return;
    const opts = { ...defaultOptions(item), ...options };
    setRawLines((lines) => normalize([...lines, { key: "", itemId, quantity: 1, options: opts, notes: "" }]));
    setAddedTick((t) => t + 1);
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setRawLines((lines) =>
      quantity <= 0 ? lines.filter((l) => l.key !== key) : lines.map((l) => (l.key === key ? { ...l, quantity } : l)),
    );
  }, []);

  const setOption = useCallback((key: string, groupId: string, choiceId: string) => {
    setRawLines((lines) =>
      normalize(lines.map((l) => (l.key === key ? { ...l, options: { ...l.options, [groupId]: choiceId } } : l))),
    );
  }, []);

  const setNotes = useCallback((key: string, notes: string) => {
    setRawLines((lines) => lines.map((l) => (l.key === key ? { ...l, notes } : l)));
  }, []);

  const removeLine = useCallback((key: string) => {
    setRawLines((lines) => lines.filter((l) => l.key !== key));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const lines = rawLines.map(resolve).filter((l): l is ResolvedLine => l !== null);
    return {
      lines,
      totalItems: lines.reduce((n, l) => n + l.quantity, 0),
      total: lines.reduce((n, l) => n + (l.unitPrice ?? 0) * l.quantity, 0),
      hasPendingPrices: lines.some((l) => l.unitPrice === null),
      isOpen,
      addedTick,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      setQuantity,
      setOption,
      setNotes,
      removeLine,
      clear: () => setRawLines(() => []),
    };
  }, [rawLines, isOpen, addedTick, addItem, setQuantity, setOption, setNotes, removeLine]);

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const ctx = use(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
