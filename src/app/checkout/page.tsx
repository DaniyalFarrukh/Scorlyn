"use client";
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const { items, cartTotal, cartCount } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <main className="bg-[var(--color-brand-beige)] text-black font-sans min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center pt-32 pb-24 px-6">
          <div className="max-w-xl w-full bg-white rounded-3xl p-12 shadow-xl border border-black/5 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-black mb-4 uppercase tracking-tight">Order Confirmed!</h1>
            <p className="text-gray-600 mb-8 font-medium">
              Thank you for your purchase. We've sent a confirmation email with your order details and tracking information.
            </p>
            <Link 
              href="/"
              className="inline-block bg-black text-white font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-black/80 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-[var(--color-brand-beige)] text-black font-sans min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/#models" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors mb-8 uppercase tracking-wider">
            <ChevronLeft size={16} />
            Back to Shop
          </Link>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left: Checkout Form */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-black/5">
                <h1 className="text-3xl font-black mb-10 tracking-tighter uppercase">Checkout</h1>
                
                <form onSubmit={handleCheckout} className="space-y-10">
                  
                  {/* Contact Info */}
                  <section>
                    <h2 className="text-xl font-bold mb-6 uppercase tracking-wider border-b-2 border-black/10 pb-2">Contact Information</h2>
                    <div className="space-y-4">
                      <input type="email" required placeholder="Email Address *" className="w-full bg-black/5 border border-black/10 rounded-xl px-5 py-4 outline-none focus:border-black font-medium" />
                      <input type="tel" required placeholder="Phone Number *" className="w-full bg-black/5 border border-black/10 rounded-xl px-5 py-4 outline-none focus:border-black font-medium" />
                    </div>
                  </section>

                  {/* Shipping Info */}
                  <section>
                    <h2 className="text-xl font-bold mb-6 uppercase tracking-wider border-b-2 border-black/10 pb-2">Shipping Address</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" required placeholder="First Name *" className="w-full bg-black/5 border border-black/10 rounded-xl px-5 py-4 outline-none focus:border-black font-medium" />
                        <input type="text" required placeholder="Last Name *" className="w-full bg-black/5 border border-black/10 rounded-xl px-5 py-4 outline-none focus:border-black font-medium" />
                      </div>
                      <input type="text" required placeholder="Address Line 1 *" className="w-full bg-black/5 border border-black/10 rounded-xl px-5 py-4 outline-none focus:border-black font-medium" />
                      <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full bg-black/5 border border-black/10 rounded-xl px-5 py-4 outline-none focus:border-black font-medium" />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input type="text" required placeholder="City *" className="w-full bg-black/5 border border-black/10 rounded-xl px-5 py-4 outline-none focus:border-black font-medium" />
                        <input type="text" required placeholder="State / Province *" className="w-full bg-black/5 border border-black/10 rounded-xl px-5 py-4 outline-none focus:border-black font-medium" />
                        <input type="text" required placeholder="Postal Code *" className="w-full bg-black/5 border border-black/10 rounded-xl px-5 py-4 outline-none focus:border-black font-medium" />
                      </div>
                    </div>
                  </section>

                  {/* Payment (Dummy) */}
                  <section>
                    <h2 className="text-xl font-bold mb-6 uppercase tracking-wider border-b-2 border-black/10 pb-2 flex justify-between items-center">
                      Payment Details
                      <Lock size={18} className="text-gray-400" />
                    </h2>
                    
                    <div className="flex gap-4 mb-6">
                      <label className={`flex-1 border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-black bg-black/5 ring-1 ring-black' : 'border-black/10 hover:border-black/30'}`}>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-4 h-4 text-black accent-black" />
                          <span className="font-bold">Credit Card</span>
                        </div>
                      </label>
                      <label className={`flex-1 border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-black bg-black/5 ring-1 ring-black' : 'border-black/10 hover:border-black/30'}`}>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-4 h-4 text-black accent-black" />
                          <span className="font-bold">Cash on Delivery</span>
                        </div>
                      </label>
                    </div>

                    {paymentMethod === 'card' ? (
                      <div className="bg-black/5 border border-black/10 rounded-xl p-6 text-center transition-all">
                        <p className="text-gray-600 font-medium mb-4">This is a secure mock checkout for demonstration.</p>
                        <input type="text" required placeholder="Card Number *" maxLength={19} className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 outline-none focus:border-black font-medium mb-4" />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" required placeholder="MM/YY *" maxLength={5} className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 outline-none focus:border-black font-medium" />
                          <input type="text" required placeholder="CVC *" maxLength={4} className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 outline-none focus:border-black font-medium" />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-black/5 border border-black/10 rounded-xl p-6 transition-all">
                        <p className="text-gray-600 font-medium text-center">
                          You will pay the courier in cash when your Scorlyn is delivered to your address.
                        </p>
                      </div>
                    )}
                  </section>

                  <button 
                    type="submit"
                    disabled={isProcessing || cartCount === 0}
                    className="w-full bg-[var(--color-brand-accent)] text-white font-black uppercase tracking-widest py-5 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-sm disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isProcessing 
                      ? 'Processing...' 
                      : paymentMethod === 'card' 
                        ? `Pay Rs ${cartTotal.toLocaleString()}` 
                        : 'Place Order'}
                  </button>
                  
                </form>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-black/5 sticky top-32">
                <h2 className="text-xl font-black mb-8 uppercase tracking-wider border-b-2 border-black/10 pb-2">Order Summary</h2>
                
                {items.length === 0 ? (
                  <p className="text-gray-500 font-medium text-center py-8">Your cart is empty.</p>
                ) : (
                  <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between gap-4">
                        <div className="flex gap-4">
                          {item.image && (
                            <div className="w-16 h-16 bg-black/5 rounded-xl shrink-0 flex items-center justify-center p-2">
                              <Image src={item.image} alt={item.name} width={64} height={64} className="object-contain w-full h-full" />
                            </div>
                          )}
                          <div>
                            <p className="font-bold uppercase tracking-tight">{item.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            {item.powerOption && <p className="text-xs text-gray-500">Power: {item.powerOption}</p>}
                          </div>
                        </div>
                        <p className="font-mono font-bold mt-1">Rs {(item.numericPrice * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t border-black/10 pt-6 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-mono">Rs {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-mono text-green-600 font-bold">Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-black pt-4 border-t border-black/5">
                    <span className="uppercase tracking-wider">Total</span>
                    <span className="font-mono">Rs {cartTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
