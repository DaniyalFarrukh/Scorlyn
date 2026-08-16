"use client";
import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/10">
              <h2 className="text-2xl font-black uppercase tracking-tight text-black flex items-center gap-2">
                Your Cart <span className="text-sm bg-black text-white px-2 py-0.5 rounded-full">{cartCount}</span>
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors text-black"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingCart size={48} className="opacity-50" />
                  <p className="font-medium">Your cart is empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-black font-bold uppercase underline underline-offset-4 text-sm hover:text-[var(--color-brand-accent)] transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 border border-black/10 rounded-2xl p-4 bg-brand-cream/30">
                    {item.image && (
                      <div className="w-20 h-20 bg-black/5 rounded-xl shrink-0 flex items-center justify-center p-2">
                        <Image src={item.image} alt={item.name} width={80} height={80} className="object-contain w-full h-full" />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-black uppercase tracking-tight">{item.name}</h3>
                          {item.powerOption && (
                            <p className="text-xs text-gray-500 font-medium">Power: {item.powerOption}</p>
                          )}
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto pt-4">
                        <div className="flex items-center border border-black/20 rounded-full px-3 py-1 gap-4 bg-white">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-500 hover:text-black">
                            <Minus size={14} />
                          </button>
                          <span className="font-bold text-sm w-4 text-center text-black">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-500 hover:text-black">
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="font-bold text-black font-mono">
                          Rs {(item.numericPrice * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-black/10 p-6 bg-white space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold text-gray-500 uppercase tracking-wider text-sm">Subtotal</span>
                  <span className="font-black text-black text-2xl font-mono">Rs {cartTotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500 font-medium">Shipping and taxes calculated at checkout.</p>
                <Link 
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-[var(--color-brand-accent)] text-white font-black uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-sm block text-center"
                >
                  Proceed to Checkout
                  <span>→</span>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
