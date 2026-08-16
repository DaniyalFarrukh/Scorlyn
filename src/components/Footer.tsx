import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <a href="#" className="text-3xl font-bold tracking-tighter text-black block mb-6">
              SCORLYN
            </a>
            <p className="text-gray-600 text-sm max-w-xs font-medium">
              Everything that happens on court, with nothing to set up.
            </p>
          </div>
          
          <div>
            <h4 className="text-black font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><a href="#models" className="hover:text-[var(--color-brand-accent)] hover:text-black transition-colors">Scorlyn</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-black font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><a href="#faq" className="hover:text-black transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-black font-bold mb-6">Connect</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-black transition-colors">LinkedIn</a></li>
              <li className="pt-4">
                <a href="mailto:scorlynhq@gmail.com" className="hover:text-black transition-colors">scorlynhq@gmail.com</a>
              </li>
              <li>
                <a href="tel:+1800000000" className="hover:text-black transition-colors">+1 (800) 000-0000</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} Scorlyn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
