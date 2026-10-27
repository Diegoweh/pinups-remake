'use client';

import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingCartButton() {
  const { getTotalItems, toggleCart } = useCart();
  const totalItems = getTotalItems();

  return (
    <motion.button
      onClick={toggleCart}
      className="fixed bottom-24 right-6 z-40 bg-orange hover:bg-orange-dark text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Abrir carrito de compras"
    >
      <div className="relative">
        <ShoppingCart className="w-7 h-7" />

        {/* Badge con número de items */}
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white"
            >
              {totalItems > 99 ? '99+' : totalItems}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Texto tooltip en hover */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {totalItems === 0 ? 'Tu carrito' : `${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`}
      </span>
    </motion.button>
  );
}
