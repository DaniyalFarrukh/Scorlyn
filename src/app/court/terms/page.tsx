"use client";
import React, { useState } from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export default function CourtTermsPage() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-brand-accent/10 rounded-full mb-4">
          <ShieldCheck size={32} className="text-[var(--color-brand-accent)]" />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tight mb-4">Court Terms & Conditions</h1>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto">
          Please review the rules and guidelines for operating your court on the Scorlyn platform. 
          Acceptance is required to maintain an active listing.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden">
        <div className="h-96 overflow-y-auto p-8 md:p-12 prose prose-sm md:prose-base max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-[var(--color-brand-accent)]">
          <h3>1. Platform Responsibilities</h3>
          <p>
            As a registered court on the Scorlyn platform, you agree to maintain accurate availability, pricing, and court conditions. Any false advertising or repeated cancellations may result in suspension from the platform.
          </p>

          <h3>2. Player Safety & Liability</h3>
          <p>
            You are entirely responsible for the physical safety of players while they are on your premises. Scorlyn acts solely as a booking facilitator and software provider. 
            <ul>
              <li>First aid kits must be readily available on-site.</li>
              <li>Court surfaces must be maintained to prevent injury.</li>
              <li>Adequate lighting must be provided for evening bookings.</li>
            </ul>
          </p>

          <h3>3. Payment & Cancellations</h3>
          <p>
            Scorlyn processes payments on your behalf. Standard payouts occur on a bi-weekly basis minus the agreed platform fee.
            Players are entitled to a full refund if they cancel 24 hours prior to their booking. Cancellations by the court must be communicated immediately and will trigger an automatic full refund to the player.
          </p>

          <h3>4. Code of Conduct</h3>
          <p>
            We expect all courts to treat players with respect. Discrimination, harassment, or unprofessional behavior will not be tolerated and is grounds for immediate termination of this agreement.
          </p>

          <h3>5. Data Privacy</h3>
          <p>
            You will have access to player names and contact information for booking purposes only. You agree not to use this information for external marketing, sell it to third parties, or use it for any purpose other than facilitating the booked game.
          </p>

          <h3>6. Equipment Maintenance</h3>
          <p>
            If your court listing includes equipment rentals (balls, rackets, bibs), you must ensure all equipment is in playable, safe condition prior to the start of the booking.
          </p>
        </div>

        <div className="bg-gray-50 p-6 md:p-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <label className="flex items-start gap-4 cursor-pointer group flex-1">
              <div className="relative flex items-center justify-center mt-1">
                <input 
                  type="checkbox" 
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="peer sr-only" 
                />
                <div className="w-6 h-6 border-2 border-gray-300 rounded-md peer-checked:bg-black peer-checked:border-black transition-colors flex items-center justify-center group-hover:border-black">
                  <svg className={`w-4 h-4 text-white transition-opacity ${accepted ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-700">
                I have read, understood, and agree to be bound by the Scorlyn Court Terms & Conditions. I acknowledge that failure to comply may result in account termination.
              </div>
            </label>

            <button 
              disabled={!accepted}
              className="w-full md:w-auto bg-black text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:transform-none disabled:shadow-none whitespace-nowrap"
            >
              Accept Terms
            </button>
          </div>
          
          {!accepted && (
            <div className="flex items-center gap-2 mt-4 text-xs font-bold uppercase tracking-widest text-red-500 md:justify-end">
              <AlertCircle size={14} />
              You must accept the terms to continue
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
