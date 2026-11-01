import React from 'react';
import { Practical } from '../data/practicalsData';
import { Check, ArrowRight } from 'lucide-react';

interface PracticalCardProps {
  practical: Practical;
  isCopied: boolean;
  onCopy: (practical: Practical) => void;
}

export const PracticalCard: React.FC<PracticalCardProps> = ({
  practical,
  isCopied,
  onCopy
}) => {
  const handleClick = () => {
    onCopy(practical);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onCopy(practical);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Copy code for ${practical.practical_code} ${practical.title}`}
      className={`group relative text-left w-full p-6 sm:p-7 rounded-2xl transition-all duration-200 cursor-pointer select-none outline-none ${
        isCopied
          ? 'bg-[#1b3654] border-2 border-[#39BDF2] shadow-[0_0_20px_rgba(57,189,242,0.25)] scale-[1.01]'
          : 'bg-[#172F49] hover:bg-[#1D3A5C] border border-[#23456C]/60 hover:border-[#39BDF2]/60 hover:shadow-xl shadow-md'
      }`}
    >
      {/* Practical Code Number (P01, P02...) */}
      <div className="flex items-start justify-between">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#39BDF2] font-mono">
          {practical.practical_code}
        </span>

        {isCopied && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-[#39BDF2]/15 text-[#39BDF2] border border-[#39BDF2]/30 animate-in fade-in zoom-in-95 duration-150">
            <Check className="w-3.5 h-3.5 text-[#39BDF2]" />
            Copied!
          </span>
        )}
      </div>

      {/* Practical Title */}
      <h3 className="mt-3 text-lg sm:text-xl font-bold text-white tracking-normal leading-snug line-clamp-2">
        {practical.title}
      </h3>

      {/* Copy Prompt Link / State */}
      <div className="mt-4 flex items-center text-sm font-medium transition-colors">
        {isCopied ? (
          <span className="inline-flex items-center gap-1.5 text-[#39BDF2] font-semibold">
            <span>✓ {practical.practical_code} Code Copied!</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[#A9C9E8] group-hover:text-white transition-colors">
            <span>Click to Copy</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        )}
      </div>
    </div>
  );
};
