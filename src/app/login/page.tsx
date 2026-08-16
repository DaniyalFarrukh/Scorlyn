"use client";
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function LoginPage() {
  const [loginType, setLoginType] = useState<'court' | 'admin'>('court');

  return (
    <main className="bg-brand-cream text-black font-sans min-h-screen pt-32 pb-12 flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-md bg-white rounded-[2rem] p-6 sm:p-8 md:p-12 shadow-sm border border-black/5 hover:-translate-y-1 transition-transform">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Welcome Back</h1>
            <p className="text-gray-500 font-medium">Log in to your {loginType === 'court' ? 'court' : 'admin'} portal</p>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-full mb-8 relative">
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-transform duration-300 ease-out ${loginType === 'admin' ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'}`}
            ></div>
            <button 
              onClick={() => setLoginType('court')}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold uppercase tracking-widest relative z-10 transition-colors ${loginType === 'court' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Court Login
            </button>
            <button 
              onClick={() => setLoginType('admin')}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold uppercase tracking-widest relative z-10 transition-colors ${loginType === 'admin' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Admin Login
            </button>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--color-brand-accent)] focus:bg-white transition-colors"
                placeholder="admin@club.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
              <input 
                type="password" 
                className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--color-brand-accent)] focus:bg-white transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm font-medium text-gray-500 gap-4 sm:gap-0">
              <label className="flex items-center gap-2 cursor-pointer w-full sm:w-auto">
                <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black" />
                Remember me
              </label>
              <a href="#" className="hover:text-black transition-colors w-full sm:w-auto text-left sm:text-right">Forgot password?</a>
            </div>

            <button type="button" className="w-full bg-black text-white font-black uppercase tracking-widest py-4 rounded-full hover:bg-black/80 hover:shadow-lg transition-all mt-4 text-sm">
              Sign In
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm font-medium text-gray-500">
            Don't have an account? <a href="/talk-to-us" className="text-black hover:underline font-bold">Contact us</a> to get set up.
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
