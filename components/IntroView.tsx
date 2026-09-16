'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, MailOpen, Heart } from 'lucide-react';
import { GoldenCorner, LuxuryDivider } from './Ornaments';

interface IntroViewProps {
  onOpen: () => void;
}

export function IntroView({ onOpen }: IntroViewProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Celebratory gold & sky-blue sparkles burst
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#d4af37', '#e8c977', '#93c5fd', '#ffffff', '#b8860b'],
        disableForReducedMotion: true,
      });
    } catch {
      // safe ignore
    }

    // Allow the opening animation to play out elegantly, then transition to details
    setTimeout(() => {
      onOpen();
    }, 850);
  };

  return (
    <motion.div
      initial={false}
      animate={
        isOpening
          ? {
              scale: 1.04,
              opacity: 0,
              filter: 'blur(6px)',
              transition: { duration: 0.85, ease: [0.32, 0, 0.67, 0] },
            }
          : {
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)',
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            }
      }
      className="relative min-h-[92vh] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Luxury Royal Envelope Card Container */}
      <div className="relative w-full max-w-xl mx-auto">
        {/* Soft Background Radial Light */}
        <div className="absolute -inset-2 bg-gradient-to-r from-[#d4af37]/20 via-[#93c5fd]/25 to-[#d4af37]/20 rounded-[2.5rem] blur-xl opacity-70 pointer-events-none" />

        <div className="relative bg-gradient-to-b from-[#ffffff]/98 via-[#f5f9fd]/95 to-[#ebf4fb]/98 border-2 border-[#d4af37]/45 rounded-3xl p-6 sm:p-12 shadow-[0_20px_50px_rgba(15,39,66,0.12)] text-center overflow-hidden backdrop-blur-md">
          {/* Inner Golden Hairline Frame */}
          <div className="absolute inset-3 border border-[#d4af37]/30 rounded-[1.25rem] pointer-events-none" />

          {/* Corner Flourishes */}
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

          {/* Royal Wedding Emblem (No monogram letters) */}
          <div className="flex justify-center mb-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#fdf9ee] via-white to-[#eef6fc] border-2 border-[#d4af37] shadow-[0_6px_20px_rgba(212,175,55,0.22)]">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#c59a3f] fill-[#c59a3f]/15" />
              {/* Surrounding Gold Ring */}
              <div className="absolute -inset-1.5 rounded-full border border-dashed border-[#c59a3f]/40 animate-[spin_40s_linear_infinite]" />
            </div>
          </div>

          {/* Basmala */}
          <div className="text-xs sm:text-sm font-semibold tracking-widest text-[#8c6b24] mb-2 font-['Cairo']">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>

          {/* Quranic Verse */}
          <div className="my-4 px-3 sm:px-6 py-4 rounded-2xl bg-[#eaf3fa]/70 border border-[#c59a3f]/25 shadow-inner">
            <p className="font-['Amiri',serif] text-base sm:text-lg md:text-xl text-[#0f2742] leading-relaxed">
              ﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ﴾
            </p>
            <span className="block mt-2 text-xs font-semibold text-[#8c6b24]">
              [سورة الروم: 21]
            </span>
          </div>

          <LuxuryDivider />

          {/* Bride & Groom Full Names */}
          <div className="space-y-2 mb-6">
            <span className="inline-block text-xs sm:text-sm font-semibold text-[#2c4c68] uppercase tracking-wider font-['Cairo']">
              دعوة زفاف وعقد قران
            </span>
            <h1 className="font-['Aref_Ruqaa',serif] text-3xl sm:text-4xl md:text-5xl font-bold text-[#0b2545] tracking-wide">
              رانيا السلامي <span className="text-[#c59a3f]">&</span> يوسف بن سالم
            </h1>
            <p className="text-xs sm:text-sm text-[#486581] font-['Cairo'] pt-1">
              الأحد 11 أكتوبر 2026 • تونس العاصمة
            </p>
          </div>

          {/* Main Invitation Opening Button (Starts animation and music on click) */}
          <div className="pt-2">
            <button
              id="open-invitation-btn"
              onClick={handleOpenInvitation}
              disabled={isOpening}
              className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-4.5 rounded-full bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#c59a3f] text-white font-['Cairo'] font-bold text-base sm:text-lg shadow-[0_8px_30px_rgba(184,134,11,0.35)] hover:shadow-[0_12px_40px_rgba(184,134,11,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden cursor-pointer ${
                isOpening ? 'scale-105 opacity-90 cursor-wait' : ''
              }`}
            >
              {/* Shimmer light effect */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />

              <MailOpen className="w-5 h-5 text-white/95 transition-transform group-hover:scale-110" />
              <span className="tracking-wide">
                {isOpening ? 'جاري فتح الدعوة...' : 'فتح بطاقة الدعوة'}
              </span>
              <Sparkles className="w-5 h-5 text-yellow-100 transition-transform group-hover:rotate-12" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
