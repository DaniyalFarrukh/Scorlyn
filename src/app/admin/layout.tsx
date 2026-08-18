"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, LogOut, Settings } from 'lucide-react';
import { logout } from '@/app/actions/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Courts Management', href: '/admin/courts', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-black font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm hidden md:flex sticky top-0 h-screen">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Link href="/" className="text-xl font-black tracking-tighter uppercase">
            Scorlyn Admin
          </Link>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-black text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-black'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 3 : 2} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} strokeWidth={2.5} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-white h-16 border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-10 shadow-sm">
        <Link href="/admin" className="text-lg font-black tracking-tighter uppercase">
          Scorlyn
        </Link>
        <button onClick={handleLogout} className="text-red-600 font-bold text-sm flex items-center gap-2">
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
