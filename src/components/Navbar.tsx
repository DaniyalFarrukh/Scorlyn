"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Product', href: '/#product' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Shop', href: '/#models' },
    { name: 'Support', href: '/#faq' },
    { name: 'Talk to Us', href: '/talk-to-us' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md py-4 border-b border-black/5 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className={`text-2xl font-bold tracking-tighter transition-colors hover:text-[var(--color-brand-accent)] text-black`}>
          SCORLYN
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className={`flex space-x-8 text-sm font-bold text-black`}>
            {navLinks.map(link => (
              <li key={link.name}>
                <Link href={link.href} className={`transition-colors hover:text-black`}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
        </div>

        {/* Action Buttons (Cart + Mobile Toggle) */}
        <div className="flex items-center space-x-4 md:space-x-0">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-black hover:opacity-70 transition-opacity md:ml-8"
            aria-label="Open Cart"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 translate-x-1 -translate-y-1 bg-[var(--color-brand-accent)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            className={`md:hidden text-black p-2`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-black/5 p-6 md:hidden flex flex-col space-y-6 shadow-xl">
          <ul className="flex flex-col space-y-4 text-lg font-medium text-gray-600">
            {navLinks.map(link => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className="hover:text-black transition-colors block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};
