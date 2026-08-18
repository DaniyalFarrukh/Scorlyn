"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, MoreVertical, Shield, Loader2, Trash2, Mail } from 'lucide-react';
import { createCourt, getCourts, deleteCourt } from '@/app/actions/auth';

export default function CourtsManagement() {
  const [isAdding, setIsAdding] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [courts, setCourts] = useState<any[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchCourts = async () => {
    setIsLoading(true);
    const result = await getCourts();
    if (result.success && result.courts) {
      setCourts(result.courts);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await createCourt(formData);

    if (result.success) {
      setMessage({ type: 'success', text: result.message || 'Court created successfully!' });
      // Fetch the updated list from Supabase
      await fetchCourts();
      form.reset();
      setIsAdding(false); // Close form on success
    } else {
      setMessage({ type: 'error', text: result.message || 'Failed to create court' });
    }
    
    setIsPending(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this court? This action cannot be undone.")) {
      const result = await deleteCourt(id);
      if (result.success) {
        await fetchCourts();
      } else {
        alert(result.message);
      }
    }
    setOpenDropdownId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500" onClick={() => {}}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Courts Management</h1>
          <p className="text-gray-500 font-medium">Manage your court accounts and passwords.</p>
        </div>
        
        <button 
          onClick={() => { setIsAdding(!isAdding); setMessage(null); }}
          className="bg-black text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-sm"
        >
          {isAdding ? 'Cancel' : <><Plus size={16} /> Add New Court</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-black/5 animate-in slide-in-from-top-4 duration-300">
          <h2 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-2">
            <Shield size={20} className="text-[var(--color-brand-accent)]" />
            Create Court Account
          </h2>
          
          {message && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message.text}
              {message.type === 'error' && message.text.includes('Email link') && (
                <span className="block mt-2 text-xs font-normal">
                  (Note: You might need to turn off "Confirm email" in your Supabase Auth Settings &gt; Providers &gt; Email)
                </span>
              )}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Court Name</label>
                <input 
                  type="text" 
                  name="name"
                  className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
                  placeholder="e.g. Downtown Arena"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
                  placeholder="court@scorlyn.pk"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Temporary Password</label>
                <input 
                  type="text" 
                  name="password"
                  className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors font-mono"
                  placeholder="Generate or type password"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button 
                type="submit"
                disabled={isPending}
                className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-800 disabled:opacity-50 transition-colors shadow-md"
              >
                {isPending ? 'Saving...' : 'Save Court'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-visible">
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search courts..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:border-black/10 focus:bg-white outline-none transition-colors"
            />
          </div>
        </div>
        
        <div className="overflow-visible min-h-[200px]">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-xs uppercase font-bold tracking-widest text-gray-500">
              <tr>
                <th className="px-6 py-4">Court Name</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Added</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 relative">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <Loader2 size={24} className="animate-spin mx-auto mb-2 opacity-50" />
                    <p className="font-medium text-xs uppercase tracking-widest">Loading courts...</p>
                  </td>
                </tr>
              ) : courts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <Shield size={24} className="mx-auto mb-2 opacity-20" />
                    <p className="font-medium text-xs uppercase tracking-widest">No courts found</p>
                  </td>
                </tr>
              ) : (
                courts.map((court) => (
                  <tr key={court.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-black">{court.name}</td>
                    <td className="px-6 py-4 text-gray-500">{court.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${court.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {court.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{court.added}</td>
                    <td className="px-6 py-4 text-right relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(openDropdownId === court.id ? null : court.id);
                        }}
                        className="text-gray-400 hover:text-black transition-colors p-2 rounded-lg hover:bg-gray-200 focus:outline-none"
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {openDropdownId === court.id && (
                        <div 
                          ref={dropdownRef}
                          className="absolute right-6 top-10 w-48 bg-white rounded-xl shadow-xl border border-black/10 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                        >
                          <div className="p-1">
                            <button 
                              onClick={() => {
                                window.location.href = `mailto:${court.email}`;
                                setOpenDropdownId(null);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black rounded-lg transition-colors flex items-center gap-2 font-medium"
                            >
                              <Mail size={14} /> Email Court
                            </button>
                            <div className="h-px bg-gray-100 my-1 mx-2"></div>
                            <button 
                              onClick={() => handleDelete(court.id)}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 font-bold"
                            >
                              <Trash2 size={14} /> Delete Court
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
