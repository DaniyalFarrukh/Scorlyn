"use client";
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ChevronDown, Plus } from 'lucide-react';
import { sendEmailAction } from '@/app/actions/sendEmail';

export default function TalkToUs() {
  const [isPending, setIsPending] = React.useState(false);
  const [status, setStatus] = React.useState<{ success?: boolean; message?: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setStatus({});
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await sendEmailAction(formData);
    
    setStatus(result);
    setIsPending(false);

    if (result.success) {
      form.reset();
    }
  };

  return (
    <main className="bg-[var(--color-brand-beige)] text-black font-sans min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center pt-32 pb-24 px-4 sm:px-6">
        <div className="w-full max-w-[700px] bg-white rounded-[2rem] p-8 md:p-16 shadow-2xl border border-black/5">
          <h1 className="text-4xl md:text-5xl font-black mb-10 text-black tracking-tighter uppercase text-center">Get in Touch</h1>
          
          <a 
            href="https://wa.me/923000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] text-white font-black uppercase tracking-widest py-5 rounded-full flex items-center justify-center gap-3 transition-all hover:brightness-105 hover:shadow-lg text-sm mb-2"
          >
            Chat with us on WhatsApp
          </a>

          <div className="flex items-center gap-4 my-8 opacity-50">
            <div className="flex-1 h-px bg-black"></div>
            <span className="font-bold text-xs uppercase tracking-widest">OR SEND A MESSAGE</span>
            <div className="flex-1 h-px bg-black"></div>
          </div>
          
          {status.message && (
            <div className={`mb-8 p-4 rounded-xl text-sm font-bold text-center ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {status.message}
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>
            
            {/* How can we help you */}
            <div className="relative group">
              <select name="helpReason" required defaultValue="" className="w-full appearance-none bg-transparent border-0 border-b-2 border-black/10 text-black px-2 py-4 outline-none focus:border-black focus:ring-0 transition-colors font-medium text-lg cursor-pointer">
                <option value="" disabled className="text-gray-400">How can we help you? *</option>
                <option value="Sales Inquiry">Sales Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Partnership">Partnership</option>
              </select>
              <ChevronDown size={20} className="absolute right-2 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black pointer-events-none transition-colors" />
            </div>

            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <input 
                type="text" 
                name="name"
                required
                placeholder="Your Name *"
                className="w-full bg-transparent border-0 border-b-2 border-black/10 text-black px-2 py-4 outline-none focus:border-black focus:ring-0 transition-colors placeholder:text-gray-400 font-medium text-lg"
              />
              <input 
                type="email" 
                name="email"
                required
                placeholder="Your Email *"
                className="w-full bg-transparent border-0 border-b-2 border-black/10 text-black px-2 py-4 outline-none focus:border-black focus:ring-0 transition-colors placeholder:text-gray-400 font-medium text-lg"
              />
            </div>

            {/* Phone Number with Country Code */}
            <div className="flex border-b-2 border-black/10 focus-within:border-black transition-colors group">
              <div className="flex items-center gap-3 px-2 py-4 select-none cursor-pointer relative pr-6">
                <img src="https://flagcdn.com/w40/pk.png" width="24" alt="Pakistan Flag" className="rounded-sm shadow-sm" />
                <span className="text-black font-bold text-lg">+92</span>
                <input type="hidden" name="phoneCode" value="+92" />
                <ChevronDown size={14} className="text-black/40 group-focus-within:text-black transition-colors" />
              </div>
              <input 
                type="tel" 
                name="phoneNumber"
                placeholder="Phone Number"
                className="w-full bg-transparent text-black px-4 py-4 outline-none placeholder:text-gray-400 font-medium text-lg"
              />
            </div>

            {/* Location */}
            <input 
              type="text" 
              name="location"
              required
              placeholder="Location (City/Country) *"
              className="w-full bg-transparent border-0 border-b-2 border-black/10 text-black px-2 py-4 outline-none focus:border-black focus:ring-0 transition-colors placeholder:text-gray-400 font-medium text-lg"
            />

            {/* Project Details */}
            <textarea 
              name="projectDetails"
              required
              placeholder="Tell us about your project *"
              rows={4}
              className="w-full bg-transparent border-0 border-b-2 border-black/10 text-black px-2 py-4 outline-none focus:border-black focus:ring-0 transition-colors placeholder:text-gray-400 resize-none font-medium text-lg mt-2"
            ></textarea>

            {/* Submit Button */}
            <div className="pt-8">
              <button 
                type="submit"
                disabled={isPending}
                className="w-full bg-black text-white font-black uppercase tracking-widest py-5 rounded-full flex items-center justify-center gap-3 transition-all hover:bg-black/80 hover:shadow-lg disabled:opacity-50 text-sm"
              >
                {isPending ? 'Sending...' : 'Send Message'}
                {!isPending && <span>→</span>}
              </button>
            </div>

          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
