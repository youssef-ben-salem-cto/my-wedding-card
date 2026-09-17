'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, MailOpen, Heart } from 'lucide-react';
import { AnimatedGoldenCorner, LuxuryDivider, SmallFlower } from './Ornaments';

interface IntroViewProps {
  onOpen: () => void;
}

const LUXURY_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: LUXURY_EASE },
  },
};

/**
 * Small background flowers: mobile (12) + desktop extras (8).
 * Percentage positioning keeps them responsive across all screen sizes.
 */
const flowers = [
  { top: '8%', left: '5%', size: 'w-6 h-6 sm:w-7 sm:h-7', color: 'text-[#d4af37]', delay: '0.1s', peakOpacity: 0.55, pulseDuration: 3.2 },
  { top: '12%', right: '8%', size: 'w-5 h-5 sm:w-6 sm:h-6', color: 'text-[#c59a3f]', delay: '0.3s', peakOpacity: 0.42, pulseDuration: 4.1 },
  { top: '22%', left: '12%', size: 'w-4 h-4 sm:w-5 sm:h-5', color: 'text-[#d4af37]', delay: '0.5s', peakOpacity: 0.48, pulseDuration: 2.9 },
  { top: '18%', right: '15%', size: 'w-6 h-6 sm:w-7 sm:h-7', color: 'text-[#d4af37]', delay: '0.7s', peakOpacity: 0.5, pulseDuration: 5.3 },
  { top: '35%', left: '3%', size: 'w-5 h-5 sm:w-6 sm:h-6', color: 'text-[#c59a3f]', delay: '0.9s', peakOpacity: 0.38, pulseDuration: 3.7 },
  { top: '38%', right: '4%', size: 'w-4 h-4 sm:w-5 sm:h-5', color: 'text-[#d4af37]', delay: '1.1s', peakOpacity: 0.45, pulseDuration: 4.6 },
  { top: '55%', left: '8%', size: 'w-6 h-6 sm:w-7 sm:h-7', color: 'text-[#d4af37]', delay: '1.3s', peakOpacity: 0.52, pulseDuration: 2.7 },
  { top: '58%', right: '10%', size: 'w-5 h-5 sm:w-6 sm:h-6', color: 'text-[#c59a3f]', delay: '1.5s', peakOpacity: 0.4, pulseDuration: 3.9 },
  { top: '72%', left: '4%', size: 'w-4 h-4 sm:w-5 sm:h-5', color: 'text-[#d4af37]', delay: '1.7s', peakOpacity: 0.46, pulseDuration: 4.4 },
  { top: '75%', right: '6%', size: 'w-6 h-6 sm:w-7 sm:h-7', color: 'text-[#d4af37]', delay: '1.9s', peakOpacity: 0.58, pulseDuration: 3.1 },
  { top: '88%', left: '14%', size: 'w-5 h-5 sm:w-6 sm:h-6', color: 'text-[#c59a3f]', delay: '2.1s', peakOpacity: 0.44, pulseDuration: 5.0 },
  { top: '85%', right: '14%', size: 'w-4 h-4 sm:w-5 sm:h-5', color: 'text-[#d4af37]', delay: '2.3s', peakOpacity: 0.5, pulseDuration: 3.5 },
  // Desktop-only extras
  { top: '5%', left: '22%', size: 'w-5 h-5', color: 'text-[#c59a3f]', delay: '0.4s', peakOpacity: 0.36, pulseDuration: 4.2, desktop: true },
  { top: '9%', right: '25%', size: 'w-4 h-4', color: 'text-[#d4af37]', delay: '0.6s', peakOpacity: 0.4, pulseDuration: 3.3, desktop: true },
  { top: '30%', left: '20%', size: 'w-5 h-5', color: 'text-[#d4af37]', delay: '1.0s', peakOpacity: 0.48, pulseDuration: 4.8, desktop: true },
  { top: '33%', right: '22%', size: 'w-4 h-4', color: 'text-[#c59a3f]', delay: '1.2s', peakOpacity: 0.34, pulseDuration: 2.8, desktop: true },
  { top: '65%', left: '18%', size: 'w-5 h-5', color: 'text-[#d4af37]', delay: '1.6s', peakOpacity: 0.42, pulseDuration: 3.6, desktop: true },
  { top: '68%', right: '20%', size: 'w-4 h-4', color: 'text-[#c59a3f]', delay: '1.8s', peakOpacity: 0.38, pulseDuration: 4.5, desktop: true },
  { top: '90%', left: '28%', size: 'w-5 h-5', color: 'text-[#d4af37]', delay: '2.2s', peakOpacity: 0.46, pulseDuration: 3.0, desktop: true },
  { top: '92%', right: '28%', size: 'w-4 h-4', color: 'text-[#c59a3f]', delay: '2.4s', peakOpacity: 0.32, pulseDuration: 5.2, desktop: true },
];

export function IntroView({ onOpen }: IntroViewProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);

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

    setTimeout(() => onOpen(), 850);
  };

  return (
    <motion.div
      initial={false}
      animate={
        isOpening
          ? { scale: 1.04, opacity: 0, filter: 'blur(6px)', transition: { duration: 0.85, ease: [0.32, 0, 0.67, 0] } }
          : { scale: 1, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
      }
      className="relative min-h-[92vh] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Background flowers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {flowers.map((flower, index) => {
          const positionStyle: React.CSSProperties = {
            top: flower.top,
            ...(flower.left ? { left: flower.left } : { right: flower.right }),
          };
          return (
            <motion.div
              key={index}
              className={`absolute ${flower.size} ${flower.color} ${flower.desktop ? 'hidden md:block' : ''}`}
              style={{
                ...positionStyle,
                filter: 'drop-shadow(0 0 4px rgba(212,175,55,0.35))',
              }}
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: parseFloat(flower.delay), duration: 0.8, ease: LUXURY_EASE }}
            >
              <motion.div
                className="w-full h-full"
                initial={{ opacity: flower.peakOpacity * 0.25 }}
                animate={{ opacity: [flower.peakOpacity * 0.25, flower.peakOpacity] }}
                transition={{
                  delay: parseFloat(flower.delay) + 0.6,
                  duration: flower.pulseDuration,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                }}
              >
                <SmallFlower className="w-full h-full" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Luxury Royal Envelope Card Container */}
      <div className="relative w-full max-w-xl mx-auto">
        {/* Soft Background Radial Light */}
        <div className="absolute -inset-2 bg-gradient-to-r from-[#d4af37]/20 via-[#93c5fd]/25 to-[#d4af37]/20 rounded-[2.5rem] blur-xl opacity-70 pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative bg-gradient-to-b from-[#ffffff]/98 via-[#f5f9fd]/95 to-[#ebf4fb]/98 border-2 border-[#d4af37]/45 rounded-3xl p-6 sm:p-12 shadow-[0_20px_50px_rgba(15,39,66,0.12)] text-center overflow-hidden backdrop-blur-md"
        >
          {/* Inner Golden Hairline Frame */}
          <div className="absolute inset-3 border border-[#d4af37]/30 rounded-[1.25rem] pointer-events-none" />

          {/* Animated Corner Flourishes — exact same shape, drawn on load */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
            <AnimatedGoldenCorner className="scale-x-[-1]" delay={0.2} />
          </div>
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
            <AnimatedGoldenCorner delay={0.35} />
          </div>
          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
            <AnimatedGoldenCorner className="scale-x-[-1] scale-y-[-1]" delay={0.5} />
          </div>
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
            <AnimatedGoldenCorner className="scale-y-[-1]" delay={0.65} />
          </div>

          {/* Royal Wedding Emblem */}
          <motion.div variants={itemVariants} className="flex justify-center mb-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#fdf9ee] via-white to-[#eef6fc] border-2 border-[#d4af37] shadow-[0_6px_20px_rgba(212,175,55,0.22)]">
              <motion.div
                className="inline-flex"
                animate={{ scale: [1, 1.14, 1] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              >
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#c59a3f] fill-[#c59a3f]/15" />
              </motion.div>
              {/* Surrounding Gold Ring */}
              <div className="absolute -inset-1.5 rounded-full border border-dashed border-[#c59a3f]/40 animate-[spin_40s_linear_infinite]" />
            </div>
          </motion.div>

          {/* Basmala */}
          <motion.div
            variants={itemVariants}
            className="text-xs sm:text-sm font-semibold tracking-widest text-[#8c6b24] mb-2 font-['Cairo']"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </motion.div>

          {/* Quranic Verse */}
          <motion.div
            variants={itemVariants}
            className="my-4 px-3 sm:px-6 py-4 rounded-2xl bg-[#eaf3fa]/70 border border-[#c59a3f]/25 shadow-inner"
          >
            <p className="font-['Amiri',serif] text-base sm:text-lg md:text-xl text-[#0f2742] leading-relaxed">
              ﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ﴾
            </p>
            <span className="block mt-2 text-xs font-semibold text-[#8c6b24]">
              [سورة الروم: 21]
            </span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <LuxuryDivider />
          </motion.div>

          {/* Bride & Groom Full Names */}
          <motion.div variants={itemVariants} className="space-y-2 mb-6">
            <span className="inline-block text-xs sm:text-sm font-semibold text-[#2c4c68] uppercase tracking-wider font-['Cairo']">
              دعوة زفاف وعقد قران
            </span>
            <h1 className="font-['Aref_Ruqaa',serif] text-3xl sm:text-4xl md:text-5xl font-bold text-[#0b2545] tracking-wide">
              رانيا السلامي <span className="text-[#c59a3f]">&</span> يوسف بن سالم
            </h1>
            <p className="text-xs sm:text-sm text-[#486581] font-['Cairo'] pt-1">
              الأحد 11 أكتوبر 2026 • تونس العاصمة
            </p>
          </motion.div>

          {/* Main Invitation Opening Button */}
          <motion.div variants={itemVariants} className="pt-2">
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
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
