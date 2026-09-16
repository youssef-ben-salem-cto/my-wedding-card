import React from 'react';

/**
 * Royal gold ornamental borders, corner cartouches and dividers
 * Designed specifically for a luxury Tunisian wedding aesthetic with light blue backdrop.
 */

export function GoldenCorner({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-14 h-14 md:w-20 md:h-20 text-[#c59a3f] pointer-events-none ${className}`}
    >
      <path
        d="M2 2H38C48 2 56 10 56 20C56 30 64 38 74 38H98V42H74C61.8 42 52 32.2 52 20C52 12.3 45.7 6 38 6H6V38C6 45.7 12.3 52 20 52C32.2 52 42 61.8 42 74V98H38V74C38 64 30 56 20 56C10 56 2 48 2 38V2Z"
        fill="currentColor"
        opacity="0.85"
      />
      <circle cx="14" cy="14" r="4" fill="currentColor" />
      <circle cx="82" cy="14" r="2.5" fill="currentColor" opacity="0.7" />
      <circle cx="14" cy="82" r="2.5" fill="currentColor" opacity="0.7" />
      <path
        d="M20 2C20 18 32 30 48 30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="2 2"
        opacity="0.6"
      />
    </svg>
  );
}

export function LuxuryDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 text-[#c59a3f] ${className}`}>
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-[#c59a3f] to-transparent opacity-60" />
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rotate-45 bg-[#c59a3f]/70" />
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-[#d4af37]"
        >
          <path d="M12 2L14.4 8.6L21.5 9.1L16 13.7L17.8 20.6L12 16.8L6.2 20.6L8 13.7L2.5 9.1L9.6 8.6L12 2Z" />
        </svg>
        <span className="w-1.5 h-1.5 rotate-45 bg-[#c59a3f]/70" />
      </div>
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-[#c59a3f] to-transparent opacity-60" />
    </div>
  );
}

export function RoyalArchFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative border border-[#d4af37]/40 rounded-3xl p-6 sm:p-10 shadow-[0_12px_40px_rgba(23,63,95,0.08)] bg-gradient-to-b from-white/95 via-[#f8fbfe]/90 to-white/95 backdrop-blur-sm ${className}`}>
      {/* Decorative Gold Inset Border */}
      <div className="absolute inset-2 sm:inset-3 border border-[#d4af37]/25 rounded-[1.25rem] pointer-events-none" />
      
      {/* 4 Corners */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
        <GoldenCorner className="scale-x-[-1]" />
      </div>
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
        <GoldenCorner />
      </div>
      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
        <GoldenCorner className="scale-x-[-1] scale-y-[-1]" />
      </div>
      <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
        <GoldenCorner className="scale-y-[-1]" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export function QuranVerseBadge({ text, surah }: { text: string; surah: string }) {
  return (
    <div className="relative max-w-2xl mx-auto my-6 px-5 py-6 rounded-2xl bg-gradient-to-b from-[#ebf5fc] to-[#e1eef8] border border-[#c59a3f]/30 text-center shadow-sm">
      <div className="text-xs sm:text-sm font-semibold text-[#8c6b24] tracking-wider mb-2">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>
      <blockquote className="font-['Amiri',serif] text-base sm:text-lg md:text-xl leading-relaxed text-[#102a43] px-2 sm:px-6">
        {text}
      </blockquote>
      <div className="mt-3 text-xs sm:text-sm font-medium text-[#8c6b24]">
        {surah}
      </div>
    </div>
  );
}
