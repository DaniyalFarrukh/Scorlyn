"use client";
import React, { useState } from 'react';
import { Save, User, Bell, Lock } from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<'account' | 'security' | 'notifications'>('account');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Settings</h1>
        <p className="text-gray-500 font-medium">Manage your admin preferences and system configurations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Settings Navigation */}
        <div className="md:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('account')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'account' ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
          >
            <User size={18} />
            Account
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'security' ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
          >
            <Lock size={18} />
            Security
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'notifications' ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
          >
            <Bell size={18} />
            Notifications
          </button>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3 space-y-6 min-h-[500px]">
          
          {activeTab === 'account' && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-black/5 mb-6">
                <h2 className="text-lg font-black uppercase tracking-tight mb-6">Account Profile</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Admin Name</label>
                      <input 
                        type="text" 
                        defaultValue="Super Admin"
                        className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Admin Email</label>
                      <input 
                        type="email" 
                        defaultValue="admin@scorlyn.pk"
                        disabled
                        className="w-full bg-gray-100 border border-transparent rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed"
                      />
                      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Email is configured in .env.local</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Bio / Notes</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors resize-none"
                      placeholder="Internal notes..."
                    ></textarea>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button 
                      type="button"
                      className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors shadow-md flex items-center gap-2"
                    >
                      <Save size={16} /> Save Changes
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-black/5">
                <h2 className="text-lg font-black uppercase tracking-tight mb-2 text-red-600">Danger Zone</h2>
                <p className="text-sm text-gray-500 mb-6">Irreversible and destructive actions.</p>
                
                <div className="flex items-center justify-between border border-red-100 bg-red-50/50 p-4 rounded-xl">
                  <div>
                    <h3 className="font-bold text-sm text-red-900">Purge Inactive Courts</h3>
                    <p className="text-xs text-red-700/80">Delete all courts that haven't logged in for 6 months.</p>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-red-700 transition-colors">
                    Purge
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-black/5">
                <h2 className="text-lg font-black uppercase tracking-tight mb-6">Security & Passwords</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Current Password</label>
                    <input 
                      type="password" 
                      className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
                    />
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Note: Password changes require updating .env.local manually.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">New Password</label>
                      <input 
                        type="password" 
                        className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Confirm New Password</label>
                      <input 
                        type="password" 
                        className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button 
                      type="button"
                      className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors shadow-md flex items-center gap-2"
                    >
                      <Save size={16} /> Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-black/5">
                <h2 className="text-lg font-black uppercase tracking-tight mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-black/5">
                    <div>
                      <h3 className="font-bold text-sm">New Court Signups</h3>
                      <p className="text-xs text-gray-500">Receive an email when a new court is registered.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-black/5">
                    <div>
                      <h3 className="font-bold text-sm">System Alerts</h3>
                      <p className="text-xs text-gray-500">Critical security and server notifications.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-black/5">
                    <div>
                      <h3 className="font-bold text-sm">Marketing Emails</h3>
                      <p className="text-xs text-gray-500">Newsletters and feature updates.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
