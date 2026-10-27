'use client';

import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart, Trash2, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { menuByCategory, MenuItem } from '@/lib/menu';
import { useMemo, useEffect, useState } from 'react';
import { isMondayPromoActive } from '@/lib/promotions';

export default function CartDrawer() {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    updateNotes,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isOpen,
    closeCart,
  } = useCart();

  // Track if Monday promotion is active
  const [isMondayPromo, setIsMondayPromo] = useState(false);

  // Check Monday promo status on mount and periodically
  useEffect(() => {
    // Initial check
    setIsMondayPromo(isMondayPromoActive());

    // Check every minute in case time/day changes
    const interval = setInterval(() => {
      setIsMondayPromo(isMondayPromoActive());
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  // Detectar promociones de pizza
  const pizzaPromotion = useMemo(() => {
    // Contar pizzas totales (con cantidades)
    const totalPizzas = items
      .filter(item => item.category === 'PIZZAS')
      .reduce((sum, item) => sum + item.quantity, 0);

    // Promotion is NOT available if: no pizzas OR not Monday
    if (totalPizzas === 0 || !isMondayPromo) {
      return {
        available: false,
        totalPizzas: 0,
        churroBitesAdded: 0,
        canClaimChurroBites: false,
      };
    }

    // Contar Churro Bites promocionales agregados
    const churroBitesAdded = items
      .filter(item => item.id === 'postre-churro-bites-promo' && item.price === 0)
      .reduce((sum, item) => sum + item.quantity, 0);

    return {
      available: true,
      totalPizzas,
      churroBitesAdded,
      canClaimChurroBites: churroBitesAdded < totalPizzas,
    };
  }, [items, isMondayPromo]);

  // Churro Bites para la promoción
  const pizzaPromotionChurroBites = useMemo(() => {
    if (!pizzaPromotion.available || !pizzaPromotion.canClaimChurroBites) return null;
    return menuByCategory['POSTRES']?.find(item => item.id === 'postre-churro-bites') ?? null;
  }, [pizzaPromotion]);

  // Auto-cleanup: Remover Churro Bites promocionales excedentes cuando se reducen pizzas
  useEffect(() => {
    const promoItem = items.find(item => item.id === 'postre-churro-bites-promo' && item.price === 0);
    if (!promoItem) return;

    if (!pizzaPromotion.available) {
      removeItem('postre-churro-bites-promo');
      return;
    }

    const excess = pizzaPromotion.churroBitesAdded - pizzaPromotion.totalPizzas;
    if (excess > 0) {
      const newQty = promoItem.quantity - excess;
      if (newQty > 0) {
        updateQuantity('postre-churro-bites-promo', newQty);
      } else {
        removeItem('postre-churro-bites-promo');
      }
    }
  }, [pizzaPromotion.available, pizzaPromotion.totalPizzas, pizzaPromotion.churroBitesAdded]);

  // Sugerencias: Solo mostrar items de PA_PICAR_Y_COMPARTIR y ENSALADAS
  const suggestedItems = useMemo(() => {
    if (items.length === 0) return [];

    const suggestions: MenuItem[] = [];

    // Obtener items de ambas categorías
    const snacks = menuByCategory['PA_PICAR_Y_COMPARTIR'] || [];
    const ensaladas = menuByCategory['ENSALADAS'] || [];

    // Combinar ambas categorías
    const allSuggestions = [...snacks, ...ensaladas];

    // Eliminar items que ya están en el carrito
    const cartItemIds = new Set(items.map(item => item.id));

    return allSuggestions
      .filter(item => !cartItemIds.has(item.id))
      .slice(0, 4); // Mostrar hasta 4 sugerencias
  }, [items]);

  // Helper para validar si se puede aumentar la cantidad de un item promocional
  const handleQuantityIncrease = (item: typeof items[0]) => {
    const isPromoChurro = item.id === 'postre-churro-bites-promo' && item.price === 0;

    if (isPromoChurro && !pizzaPromotion.canClaimChurroBites) {
      alert('⚠️ Ya has reclamado todos los Churro Bites de promoción. Necesitas más pizzas para obtener más.');
      return;
    }

    updateQuantity(item.id, item.quantity + 1);
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

    // Generar mensaje para WhatsApp
    let message = '*🍕 PEDIDO JIMMY\'S 🍔*\n\n';

    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* x${item.quantity}\n`;
      message += `   💲 $${item.price} c/u = $${item.price * item.quantity}\n`;
      if (item.selectedOptions && item.options) {
        item.options.forEach(group => {
          const val = item.selectedOptions![group.id];
          if (!val) return;
          const label = Array.isArray(val)
            ? val.map(id => group.items.find(i => i.id === id)?.label ?? id).join(', ')
            : group.items.find(i => i.id === val)?.label ?? val;
          message += `   • ${group.title}: ${label}\n`;
        });
      }
      const notes = item.notes?.trim().replace(/\s+/g, ' ');
      if (notes) {
        message += `   📝 Comentarios: ${notes}\n`;
      }
      message += '\n';
    });

    message += `━━━━━━━━━━━━━━━\n`;
    message += `*Total de productos:* ${getTotalItems()}\n`;
    message += `*TOTAL A PAGAR: $${getTotalPrice().toFixed(2)} MXN*\n\n`;
    message += `_¿Podrían confirmar mi pedido?_ 🙏`;

    const whatsappUrl = `https://wa.me/526692139090?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-orange px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold text-white cubano">
                  MI CARRITO
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-orange-dark rounded-full transition-colors"
                aria-label="Cerrar carrito"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              {/* Productos en el carrito */}
              <div>
                {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="w-24 h-24 text-gray-300 mb-4" />
                  <p className="text-xl text-gray-500 font-medium">
                    Tu carrito está vacío
                  </p>
                  <p className="text-gray-400 mt-2">
                    Agrega productos desde el menú
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="bg-cream rounded-xl p-4 shadow-sm"
                    >
                      <div className="flex gap-4">
                        {/* Imagen */}
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-orange text-lg leading-tight mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            ${item.price} {item.currency}
                          </p>

                          {/* Controles de cantidad */}
                          <div className="flex items-center justify-between">
                            {(() => {
                              // Identificar si es item promocional
                              const isPromoItem = item.id === 'postre-churro-bites-promo' && item.price === 0;

                              return (
                                <>
                                  <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1 shadow-sm">
                                    <button
                                      onClick={() =>
                                        updateQuantity(item.id, item.quantity - 1)
                                      }
                                      className="p-1 hover:bg-orange-50 rounded-full transition-colors"
                                      aria-label="Disminuir cantidad"
                                    >
                                      <Minus className="w-4 h-4 text-orange" />
                                    </button>
                                    <span className="font-bold text-orange w-8 text-center">
                                      {item.quantity}
                                    </span>
                                    {!isPromoItem ? (
                                      <button
                                        onClick={() => handleQuantityIncrease(item)}
                                        className="p-1 hover:bg-orange-50 rounded-full transition-colors"
                                        aria-label="Aumentar cantidad"
                                      >
                                        <Plus className="w-4 h-4 text-orange" />
                                      </button>
                                    ) : (
                                      <div className="w-6 h-6 flex items-center justify-center">
                                        <span className="text-xs text-gray-400">🎁</span>
                                      </div>
                                    )}
                                  </div>

                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className="p-2 hover:bg-red-50 rounded-full transition-colors"
                                    aria-label="Eliminar producto"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                  </button>
                                </>
                              );
                            })()}
                          </div>

                          {/* Opciones seleccionadas */}
                          {item.selectedOptions && item.options && (
                            <div className="mt-1 space-y-0.5">
                              {item.options.map(group => {
                                const val = item.selectedOptions![group.id];
                                if (!val) return null;
                                const label = Array.isArray(val)
                                  ? val.map(id => group.items.find(i => i.id === id)?.label ?? id).join(', ')
                                  : group.items.find(i => i.id === val)?.label ?? val;
                                return (
                                  <p key={group.id} className="text-xs text-gray-500">
                                    <span className="font-semibold">{group.title}:</span> {label}
                                  </p>
                                );
                              })}
                            </div>
                          )}

                          {/* Nota para items promocionales */}
                          {(item.id === 'postre-churro-bites-promo' && item.price === 0) && (
                            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                              <span>🎁</span>
                              Item promocional - usa la sección de promoción para agregar más
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Comentarios del producto */}
                      <div className="mt-3">
                        <label
                          htmlFor={`notes-${item.id}`}
                          className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-600"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-orange" />
                          Comentarios
                        </label>
                        <textarea
                          id={`notes-${item.id}`}
                          value={item.notes ?? ''}
                          onChange={(event) => updateNotes(item.id, event.target.value)}
                          maxLength={160}
                          rows={2}
                          placeholder="Ej. sin tomate, bebida sin hielo"
                          className="w-full resize-none rounded-lg border border-orange-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-orange focus:ring-2 focus:ring-orange/20"
                        />
                      </div>

                      {/* Subtotal del item */}
                      <div className="mt-3 pt-3 border-t border-orange-200 flex justify-between items-center">
                        <span className="text-sm text-gray-600">Subtotal:</span>
                        <span className="font-bold text-orange">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Botón para limpiar carrito */}
                  {items.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="w-full py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm"
                    >
                      Vaciar carrito
                    </button>
                  )}
                </div>
              )}
              </div>

              {/* Promoción de Pizza - Solo si hay pizza en el carrito */}
              {pizzaPromotion.available && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-50 rounded-xl p-4 mb-4 border-2 border-orange-300 shadow-lg">
                    <h3 className="text-xl font-bold text-orange cubano mb-2 flex items-center gap-2">
                      <span>🍕</span>
                      ¡PROMO PIZZA LOVERS!
                    </h3>
                    <p className="text-sm text-gray-700 mb-3 font-medium">
                      Por cada pizza recibe unos <span className="text-orange font-bold">Churro Bites GRATIS</span>
                    </p>

                    {/* Status de promociones */}
                    <div className="bg-white rounded-lg p-3 mb-3 border border-orange-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-gray-700">
                          Pizzas en tu carrito: <span className="text-orange">{pizzaPromotion.totalPizzas}</span>
                        </span>
                        <span className="text-xs text-gray-500">
                          {pizzaPromotion.totalPizzas} {pizzaPromotion.totalPizzas === 1 ? 'promoción disponible' : 'promociones disponibles'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-gray-600">
                          Churro Bites reclamados: <span className="text-green-600 font-semibold">{pizzaPromotion.churroBitesAdded}</span>
                        </span>
                      </div>
                    </div>

                    {/* Churro Bites GRATIS */}
                    {pizzaPromotion.canClaimChurroBites && pizzaPromotionChurroBites ? (
                      <div>
                        <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1">
                          <span>🎁</span>
                          Tus Churro Bites GRATIS:
                        </h4>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white rounded-lg p-2 flex gap-2 items-center shadow-sm border-2 border-green-400"
                        >
                          <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={pizzaPromotionChurroBites.imageUrl}
                              alt={pizzaPromotionChurroBites.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-xs text-gray-800 leading-tight">
                              {pizzaPromotionChurroBites.name}
                            </h5>
                            <div className="flex items-center gap-1">
                              <p className="text-green-600 font-bold text-xs">¡GRATIS!</p>
                              <p className="text-gray-400 line-through text-xs">${pizzaPromotionChurroBites.price}</p>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (!pizzaPromotion.canClaimChurroBites) return;
                              const promoItem = {
                                ...pizzaPromotionChurroBites,
                                id: 'postre-churro-bites-promo',
                                price: 0,
                                name: `${pizzaPromotionChurroBites.name} (Promo Pizza)`,
                              };
                              addItem(promoItem, 1);
                            }}
                            className="shrink-0 bg-green-500 hover:bg-green-600 text-white rounded-full p-1.5 transition-colors shadow-md"
                            aria-label="Agregar Churro Bites gratis"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </motion.div>
                      </div>
                    ) : (
                      <div className="bg-gray-100 rounded-lg p-3 text-center">
                        <p className="text-sm text-gray-600">
                          ✅ ¡Has reclamado todos tus Churro Bites gratis!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Sugerencias - Solo si hay items en el carrito */}
              {items.length > 0 && suggestedItems.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-bold text-orange cubano mb-3 flex items-center gap-2">
                    <span>🔥</span>
                    NO OLVIDES LLEVAR
                  </h3>
                  <div className="space-y-3">
                    {suggestedItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3 flex gap-3 items-center shadow-sm border border-orange-100"
                      >
                        {/* Imagen pequeña */}
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-gray-800 leading-tight mb-1">
                            {item.name}
                          </h4>
                          <p className="text-orange font-bold text-sm">
                            ${item.price}
                          </p>
                        </div>

                        {/* Botón agregar */}
                        <button
                          onClick={() => addItem(item, 1)}
                          className="flex-shrink-0 bg-orange hover:bg-orange-dark text-white rounded-full p-2 transition-colors shadow-md"
                          aria-label={`Agregar ${item.name}`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer - Total y Checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 bg-white px-6 py-4 space-y-4">
                {/* Resumen */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Total de productos:</span>
                    <span className="font-semibold">{getTotalItems()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">TOTAL:</span>
                    <span className="text-3xl font-bold text-orange cubano">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Botón de WhatsApp */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-full font-bold text-lg cubano shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  ENVIAR PEDIDO
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
