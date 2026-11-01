/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Practical, PRACTICALS_DATA } from './data/practicalsData';
import { fetchPracticals, copyToClipboard } from './lib/supabase';
import { PracticalCard } from './components/PracticalCard';
import { Check } from 'lucide-react';

export default function App() {
  const [practicals, setPracticals] = useState<Practical[]>(PRACTICALS_DATA);
  const [copiedIdentifier, setCopiedIdentifier] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Attempt dynamic fetch from Supabase database
    let isMounted = true;
    fetchPracticals().then((result) => {
      if (isMounted && result.data && result.data.length > 0) {
        setPracticals(result.data);
      }
    });

    return () => {
      isMounted = false;
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const handleCopyText = async (text: string, identifier: string, label: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedIdentifier(identifier);
      setToastMessage(label);

      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }

      toastTimeoutRef.current = window.setTimeout(() => {
        setCopiedIdentifier(null);
        setToastMessage(null);
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#071827] text-white flex flex-col justify-between selection:bg-[#39BDF2]/30 selection:text-white">
      {/* Main Container */}
      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Block */}
        <header className="mb-8 sm:mb-10 text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            INS Compiler
          </h1>
          <h2 className="mt-1 sm:mt-1.5 text-xl sm:text-2xl font-semibold text-[#A9C9E8]">
            INS Practical Programs
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#A9C9E8]/70">
            One-click practical code and configuration copying for Information and Network Security practicals.
          </p>
        </header>

        {/* 2-Column Practical Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-start">
          {practicals.map((practical) => (
            <PracticalCard
              key={practical.id || practical.practical_code}
              practical={practical}
              copiedIdentifier={copiedIdentifier}
              onCopyText={handleCopyText}
            />
          ))}
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-6 text-center text-xs sm:text-sm text-[#A9C9E8]/70 border-t border-[#172F49]">
        <p>INS Compiler · Practical Code Collection</p>
      </footer>

      {/* Subtle Floating Confirmation Toast */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-[#172F49] text-white border border-[#39BDF2]/70 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="w-5 h-5 rounded-full bg-[#39BDF2]/20 flex items-center justify-center text-[#39BDF2]">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span className="text-sm font-semibold text-[#39BDF2]">
            {toastMessage}
          </span>
        </aside>
      )}
    </div>
  );
}
