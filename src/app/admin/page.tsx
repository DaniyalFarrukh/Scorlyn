import React from 'react';
import { Users, TrendingUp, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Courts', value: '12', icon: Users, trend: '+2 this month' },
    { title: 'Active Games', value: '34', icon: Activity, trend: 'Live' },
    { title: 'Revenue', value: '$4,200', icon: TrendingUp, trend: '+15% vs last month' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Admin Dashboard</h1>
        <p className="text-gray-500 font-medium">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <Icon size={24} className="text-black" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-1">{stat.title}</h3>
              <p className="text-4xl font-black">{stat.value}</p>
            </div>
          );
        })}
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 h-96 flex items-center justify-center">
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Activity Chart Placeholder</p>
      </div>
    </div>
  );
}
