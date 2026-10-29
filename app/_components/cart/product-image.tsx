import Image from "next/image";
import mark from "@/public/images/mark.png";
import type { MenuItem } from "../../_data/site";

/** Product photo, or a branded placeholder while the item has no image yet. */
export function ProductImage({ item, sizes, className = "" }: { item: MenuItem; sizes: string; className?: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden bg-brand ${className}`}>
      {item.image ? (
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes={sizes}
          style={item.imageFocus ? { objectPosition: item.imageFocus } : undefined}
          className="object-cover"
        />
      ) : (
        <>
          <div className="checker absolute inset-0 h-full opacity-15 [--checker-color:var(--color-ink)] [--sq:8px]" aria-hidden />
          <Image src={mark} alt="" aria-hidden className="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 opacity-90" />
        </>
      )}
    </div>
  );
}
