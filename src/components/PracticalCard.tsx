import React, { useState } from 'react';
import { Practical, PracticalPart } from '../data/practicalsData';
import { Check, ArrowRight, Terminal, Copy, ChevronDown, ChevronUp } from 'lucide-react';

interface PracticalCardProps {
  practical: Practical;
  copiedIdentifier: string | null; // e.g. "P01", "P01-Part A", "P02-CMD"
  onCopyText: (text: string, identifier: string, label: string) => void;
}

export const PracticalCard: React.FC<PracticalCardProps> = ({
  practical,
  copiedIdentifier,
  onCopyText
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const isFullCopied = copiedIdentifier === practical.practical_code;
  const isCmdCopied = copiedIdentifier === `${practical.practical_code}-CMD`;

  const handleCopyFull = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onCopyText(
      practical.code_content,
      practical.practical_code,
      `✓ ${practical.practical_code} Code Copied!`
    );
  };

  const handleCopyPart = (e: React.MouseEvent, part: PracticalPart) => {
    e.stopPropagation();
    const id = `${practical.practical_code}-${part.part_code}`;
    onCopyText(
      part.code_content,
      id,
      `✓ ${practical.practical_code} ${part.part_code} Copied!`
    );
  };

  const handleCopyCmd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!practical.install_command) return;
    const id = `${practical.practical_code}-CMD`;
    onCopyText(
      practical.install_command,
      id,
      `✓ CMD Command Copied!`
    );
  };

  const hasMultipleParts = Boolean(practical.parts && practical.parts.length > 1);

  return (
    <div
      onClick={!hasMultipleParts ? () => handleCopyFull() : undefined}
      className={`group relative text-left w-full p-6 sm:p-7 rounded-2xl transition-all duration-200 bg-[#172F49] border shadow-lg flex flex-col justify-between ${
        !hasMultipleParts ? 'cursor-pointer select-none' : ''
      } ${
        isFullCopied
          ? 'border-2 border-[#39BDF2] shadow-[0_0_22px_rgba(57,189,242,0.3)] bg-[#1B3654]'
          : 'border-[#23456C]/60 hover:border-[#39BDF2]/60 hover:bg-[#1A3552]'
      }`}
    >
      <div>
        {/* Top Header: Practical ID + Copy Confirmation / Full Button */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#39BDF2] font-mono">
            {practical.practical_code}
          </span>

          <div className="flex items-center gap-2">
            {isFullCopied ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-[#39BDF2]/15 text-[#39BDF2] border border-[#39BDF2]/30 animate-in fade-in duration-150">
                <Check className="w-3.5 h-3.5 text-[#39BDF2]" />
                Copied!
              </span>
            ) : hasMultipleParts ? (
              <button
                type="button"
                onClick={handleCopyFull}
                title="Click to copy both parts together"
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg text-[#A9C9E8] hover:text-white bg-[#0D2238]/70 hover:bg-[#39BDF2]/20 border border-[#23456C] hover:border-[#39BDF2]/50 transition-all cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>Copy Both Parts</span>
              </button>
            ) : null}
          </div>
        </div>

        {/* Practical Title */}
        <h3 className="mt-3 text-lg sm:text-xl font-bold text-white tracking-normal leading-snug">
          {practical.title}
        </h3>

        {/* CMD Installation Strip if required */}
        {practical.install_command && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-3.5 p-2.5 rounded-xl bg-[#091B2E] border border-[#23456C]/80 flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Terminal className="w-4 h-4 text-[#39BDF2] shrink-0" />
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-[#A9C9E8]/70 uppercase tracking-wider block">
                  {practical.install_label || 'CMD Command'}
                </span>
                <code className="text-xs sm:text-[13px] font-mono text-[#39BDF2] truncate block">
                  {practical.install_command}
                </code>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyCmd}
              aria-label={`Copy command ${practical.install_command}`}
              className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                isCmdCopied
                  ? 'bg-[#39BDF2] text-[#071827] font-semibold'
                  : 'bg-[#172F49] text-[#A9C9E8] hover:text-white hover:bg-[#23456C] border border-[#23456C]'
              }`}
            >
              {isCmdCopied ? (
                <>
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy CMD</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Multi-parts (ONLY P01) or Single Direct Click Indicator */}
        {hasMultipleParts && practical.parts ? (
          <div className="mt-4 space-y-2" onClick={(e) => e.stopPropagation()}>
            <div className="text-[11px] font-semibold text-[#A9C9E8]/60 uppercase tracking-wider">
              Practical Parts (2 Separate Programs)
            </div>

            <div className="grid grid-cols-1 gap-2">
              {practical.parts.map((part) => {
                const partId = `${practical.practical_code}-${part.part_code}`;
                const isPartCopied = copiedIdentifier === partId;

                return (
                  <button
                    key={part.part_code}
                    type="button"
                    onClick={(e) => handleCopyPart(e, part)}
                    className={`w-full text-left p-3 rounded-xl transition-all border flex items-center justify-between gap-3 cursor-pointer ${
                      isPartCopied
                        ? 'bg-[#1C3E63] border-[#39BDF2] text-white shadow-md'
                        : 'bg-[#0E233B]/70 hover:bg-[#142F4D] border-[#23456C]/60 hover:border-[#39BDF2]/50 text-slate-200'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#39BDF2] font-mono">
                          {part.part_code}:
                        </span>
                        <span className="text-sm font-semibold text-white truncate">
                          {part.title}
                        </span>
                      </div>
                      {part.description && (
                        <p className="text-xs text-[#A9C9E8]/80 line-clamp-1 mt-0.5">
                          {part.description}
                        </p>
                      )}
                    </div>

                    <span className="shrink-0 text-xs font-semibold flex items-center gap-1 text-[#39BDF2]">
                      {isPartCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <span>Copy Part</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Single part: Direct clean click indication matching reference image */
          <div className="mt-4 flex items-center text-sm font-medium transition-colors">
            {isFullCopied ? (
              <span className="inline-flex items-center gap-1.5 text-[#39BDF2] font-semibold">
                <span>✓ {practical.practical_code} Code Copied!</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[#A9C9E8] group-hover:text-white transition-colors">
                <span>Click to Copy</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-[#39BDF2]" />
              </span>
            )}
          </div>
        )}

        {/* Optional Code Preview Accordion */}
        {showPreview && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-3.5 p-3 rounded-xl bg-[#091B2E] border border-[#23456C] overflow-hidden animate-in fade-in duration-150"
          >
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#23456C]">
              <span className="text-xs font-semibold text-[#A9C9E8] uppercase tracking-wider">
                Code Preview ({practical.language})
              </span>
              <button
                type="button"
                onClick={handleCopyFull}
                className="text-xs text-[#39BDF2] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </button>
            </div>
            <pre className="text-[11px] font-mono text-slate-300 max-h-56 overflow-y-auto overflow-x-auto whitespace-pre p-1 rounded select-text">
              {practical.code_content}
            </pre>
          </div>
        )}
      </div>

      {/* Card Footer toggle for preview */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-4 pt-2.5 border-t border-[#23456C]/40 flex items-center justify-between text-xs text-[#A9C9E8]/70"
      >
        <span>Language: <strong className="text-white font-mono">{practical.language}</strong></span>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-1 hover:text-[#39BDF2] transition-colors cursor-pointer"
        >
          <span>{showPreview ? 'Hide Code' : 'Preview Code'}</span>
          {showPreview ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
