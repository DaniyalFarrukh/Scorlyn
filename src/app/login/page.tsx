"use client";
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { loginAdmin, loginCourt } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [loginType, setLoginType] = useState<'court' | 'admin'>('court');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    let result;
    if (loginType === 'admin') {
      result = await loginAdmin(formData);
      if (result.success) {
        router.push('/admin');
        return; // Don't set isPending false on redirect
      }
    } else {
      result = await loginCourt(formData);
      if (result.success) {
        router.push('/court');
        return;
      }
    }

    setError(result.message || 'Login failed');
    setIsPending(false);
  };

  return (
    <main className="bg-[var(--color-brand-beige)] text-black font-sans min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center pt-32 pb-24 px-4 sm:px-6">
        <div className="w-full max-w-[500px] bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-black/5 hover:-translate-y-1 transition-transform">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Welcome Back</h1>
            <p className="text-gray-500 font-medium">Log in to your {loginType === 'court' ? 'court' : 'admin'} portal</p>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-full mb-8 relative">
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-transform duration-300 ease-out ${loginType === 'admin' ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'}`}
            ></div>
            <button 
              type="button"
              onClick={() => { setLoginType('court'); setError(null); }}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold uppercase tracking-widest relative z-10 transition-colors ${loginType === 'court' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Court Login
            </button>
            <button 
              type="button"
              onClick={() => { setLoginType('admin'); setError(null); }}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold uppercase tracking-widest relative z-10 transition-colors ${loginType === 'admin' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Admin Login
            </button>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 rounded-xl text-sm font-bold text-center bg-red-100 text-red-800">
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
              <input 
                name="email"
                type="email" 
                className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-black focus:bg-white transition-colors"
                placeholder="admin@scorlyn.pk"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
              <input 
                name="password"
                type="password" 
                className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-black focus:bg-white transition-colors"
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

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-black text-white font-black uppercase tracking-widest py-4 rounded-full hover:bg-black/80 hover:shadow-lg disabled:opacity-50 transition-all mt-4 text-sm"
            >
              {isPending ? 'Signing In...' : 'Sign In'}
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
