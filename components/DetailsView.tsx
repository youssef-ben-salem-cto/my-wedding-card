'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Calendar,
  Clock,
  Navigation,
  Compass,
  Share2,
  Copy,
  Check,
  Heart,
  CalendarPlus,
  ArrowRight,
  ExternalLink,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { GoldenCorner, LuxuryDivider, QuranVerseBadge } from './Ornaments';

interface DetailsViewProps {
  onBackToIntro: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export function DetailsView({
  onBackToIntro,
  isMuted = false,
  onToggleMute,
}: DetailsViewProps) {
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Target wedding ceremony: 11 October 2026 at 20:30 (Tunis time GMT+1)
  const targetDate = new Date('2026-10-11T20:30:00+01:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const hotelLat = '36.85535824007228';
  const hotelLng = '10.162285682805923';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${hotelLat},${hotelLng}`;
  const wazeUrl = `https://waze.com/ul?ll=${hotelLat},${hotelLng}&navigate=yes`;
  const appleMapsUrl = `https://maps.apple.com/?ll=${hotelLat},${hotelLng}&q=Tunis+Grand+Hotel`;

  const copyCoordinates = () => {
    navigator.clipboard.writeText(`${hotelLat}, ${hotelLng}`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  const copyInvitationLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const shareOnWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const text = `💍 دعوة زفاف وعقد قران رانيا السلامي ويوسف بن سالم\n📅 الأحد 11 أكتوبر 2026 - الساعة 20:30\n📍 نزل تونس الكبير - Tunis Grand Hôtel\nيشرفنا حضوركم ومشاركتنا فرحتنا:\n${window.location.href}`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const downloadIcsCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invitation//Rania and Youssef//AR',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'SUMMARY:عقد قران وزفاف رانيا السلامي & يوسف بن سالم',
      'DESCRIPTION:دعوة زفاف وعقد قران رانيا السلامي ويوسف بن سالم بنزل تونس الكبير',
      'LOCATION:Tunis Grand Hôtel\\, Avenue du 10 Décembre 1948\\, Tunis',
      'GEO:36.855358;10.162286',
      'DTSTART:20261011T193000Z',
      'DTEND:20261011T233000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'mariage-rania-et-youssef.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'عقد قران وزفاف رانيا السلامي & يوسف بن سالم'
  )}&dates=20261011T193000Z/20261011T233000Z&details=${encodeURIComponent(
    'يتشرف جميل رضوان السلامي وعائلة المرحوم فضيل بن سالم بدعوتكم لحضور عقد قران وزفاف رانيا ويوسف'
  )}&location=${encodeURIComponent('Tunis Grand Hôtel, Avenue du 10 Décembre 1948, Tunis')}`;

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen py-8 sm:py-12 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto"
    >
      {/* Back to cover button */}
      <div className="flex items-center justify-between mb-6">
        <button
          id="back-to-cover-btn"
          onClick={onBackToIntro}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-xs sm:text-sm font-semibold text-[#1a365d] border border-[#c59a3f]/40 shadow-sm transition-all hover:shadow-md cursor-pointer"
        >
          <ArrowRight className="w-4 h-4 text-[#c59a3f]" />
          <span>الغلاف الافتتاحي</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Mute/Unmute Music Button */}
          {onToggleMute && (
            <button
              id="details-mute-toggle-btn"
              onClick={onToggleMute}
              title={isMuted ? 'تشغيل صوت الموسيقى' : 'كتم صوت الموسيقى'}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                isMuted
                  ? 'bg-white/80 hover:bg-white text-gray-500 border-gray-300'
                  : 'bg-white/90 hover:bg-white text-[#b8860b] border-[#c59a3f]/40 shadow-xs'
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-red-500" />
                  <span className="hidden sm:inline">تشغيل الصوت</span>
                </>
              ) : (
                <>
                  <div className="flex items-end gap-[2px] h-3 w-3 justify-center">
                    <span className="w-[1.5px] bg-[#c59a3f] h-2 animate-pulse rounded-full" />
                    <span className="w-[1.5px] bg-[#c59a3f] h-3 animate-pulse delay-75 rounded-full" />
                    <span className="w-[1.5px] bg-[#c59a3f] h-1.5 animate-pulse delay-150 rounded-full" />
                  </div>
                  <Volume2 className="w-3.5 h-3.5 text-[#b8860b]" />
                  <span className="hidden sm:inline">كتم الموسيقى</span>
                </>
              )}
            </button>
          )}

          <button
            id="share-whatsapp-btn"
            onClick={shareOnWhatsApp}
            title="مشاركة الدعوة عبر واتساب"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-semibold border border-[#25D366]/30 transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">واتساب</span>
          </button>

          <button
            id="copy-link-btn"
            onClick={copyInvitationLink}
            title="نسخ رابط الدعوة"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/80 hover:bg-white text-[#1a365d] text-xs font-semibold border border-[#c59a3f]/40 transition-all cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#c59a3f]" />}
            <span>{copiedLink ? 'تم النسخ' : 'نسخ الرابط'}</span>
          </button>
        </div>
      </div>

      {/* Main Royal Card */}
      <div className="relative border-2 border-[#d4af37]/40 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-12 md:p-14 shadow-[0_20px_60px_rgba(15,39,66,0.09)] bg-gradient-to-b from-white/95 via-[#f8fbfe]/95 to-white/95 backdrop-blur-md text-center overflow-hidden">
        {/* Subtle Decorative Golden Border */}
        <div className="absolute inset-3 border border-[#d4af37]/25 rounded-[1.5rem] pointer-events-none" />

        {/* 4 Golden Corners */}
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

        {/* Top Blessing Emblem */}
        <div className="mb-2">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#ebf5fc] border border-[#d4af37]/30 text-[#8c6b24] text-xs sm:text-sm font-semibold font-['Cairo']">
            <Heart className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
            <span>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            <Heart className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
          </div>
        </div>

        {/* Quranic Verse */}
        <QuranVerseBadge
          text="﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ﴾"
          surah="[سورة الروم: 21]"
        />

        <LuxuryDivider />

        {/* Traditional Invitation Honorifics (Parents) */}
        <div className="my-8 space-y-4">
          <p className="text-sm sm:text-base font-semibold text-[#627d98] font-['Cairo']">
            يتشرف كلّ من:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-center">
            {/* Bride's Parents */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-[#f2f8fd] to-[#e8f2fa] border border-[#d4af37]/30 shadow-sm">
              <span className="text-xs font-bold text-[#b8860b] block mb-1">أولياء العروس</span>
              <h3 className="font-['Amiri',serif] text-lg sm:text-xl font-bold text-[#0b2545] leading-relaxed">
                السيد جميل رضوان السلامي
              </h3>
              <p className="font-['Amiri',serif] text-base sm:text-lg text-[#102a43] mt-0.5">
                وحرمه السيدة هدى الجماعي
              </p>
            </div>

            {/* Groom's Parents */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-[#f2f8fd] to-[#e8f2fa] border border-[#d4af37]/30 shadow-sm">
              <span className="text-xs font-bold text-[#b8860b] block mb-1">أولياء العريس</span>
              <h3 className="font-['Amiri',serif] text-lg sm:text-xl font-bold text-[#0b2545] leading-relaxed">
                عائلة المرحوم فضيل بن سالم
              </h3>
              <p className="font-['Amiri',serif] text-base sm:text-lg text-[#102a43] mt-0.5">
                وحرمه السيدة زينة النڨاطي
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base font-medium text-[#334e68] pt-2 font-['Cairo']">
            بدعوتكم الكريمة لمشاركتهم أسعد اللحظات بمناسبة عقد قران وزفاف نجليهما:
          </p>
        </div>

        {/* Couple's Names Showcase */}
        <div className="my-8 py-6 px-4 rounded-3xl bg-gradient-to-r from-[#eef6fc] via-[#f7fbfe] to-[#eef6fc] border border-[#c59a3f]/40 max-w-2xl mx-auto shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#8c6b24] uppercase tracking-wider font-['Cairo']">العروس</span>
              <h2 className="font-['Aref_Ruqaa',serif] text-3xl sm:text-4xl md:text-5xl font-bold text-[#0b2545]">
                رانيا السلامي
              </h2>
            </div>

            <div className="my-1 sm:my-0 flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[#d4af37] shadow-sm text-[#b8860b] font-['Aref_Ruqaa'] text-2xl font-bold">
              &
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#8c6b24] uppercase tracking-wider font-['Cairo']">العريس</span>
              <h2 className="font-['Aref_Ruqaa',serif] text-3xl sm:text-4xl md:text-5xl font-bold text-[#0b2545]">
                يوسف بن سالم
              </h2>
            </div>
          </div>

          <div className="mt-5 text-xs sm:text-sm font-semibold text-[#8c6b24] font-['Amiri',serif] text-center">
            « بَارَكَ اللَّهُ لَهُمَا وَبَارَكَ عَلَيْهِمَا وَجَمَعَ بَيْنَهُمَا فِي خَيْرٍ »
          </div>
        </div>

        {/* Event Key Highlights: Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto my-8">
          {/* Date Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#c59a3f]/30 shadow-sm flex items-center gap-4 text-right">
            <div className="w-12 h-12 rounded-2xl bg-[#ebf5fc] text-[#b8860b] flex items-center justify-center shrink-0 border border-[#d4af37]/30">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#8c6b24] block font-['Cairo']">تاريخ الحفل</span>
              <p className="font-['Cairo'] font-bold text-base sm:text-lg text-[#0b2545]">
                الأحد 11 أكتوبر 2026
              </p>
              <span className="text-xs text-[#627d98] font-['Cairo']">11 Octobre 2026</span>
            </div>
          </div>

          {/* Time Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#c59a3f]/30 shadow-sm flex items-center gap-4 text-right">
            <div className="w-12 h-12 rounded-2xl bg-[#ebf5fc] text-[#b8860b] flex items-center justify-center shrink-0 border border-[#d4af37]/30">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#8c6b24] block font-['Cairo']">توقيت عقد القران</span>
              <p className="font-['Cairo'] font-bold text-base sm:text-lg text-[#0b2545]">
                الساعة 20:30 مساءً
              </p>
              <span className="text-xs text-[#627d98] font-['Cairo']">الثامنة والنصف ليلاً</span>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="my-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#f4f9fd] to-[#ebf4fa] border border-[#d4af37]/35 max-w-2xl mx-auto shadow-sm">
          <span className="text-xs sm:text-sm font-bold text-[#8c6b24] block mb-3 font-['Cairo']">
            ⏳ العدّ التنازلي لليوم الموعود
          </span>
          <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
            <div className="bg-white py-3 px-2 rounded-xl border border-[#d4af37]/20 shadow-xs">
              <span className="block font-['Cairo'] text-xl sm:text-2xl font-bold text-[#0b2545]">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs text-[#627d98] font-medium">يوم</span>
            </div>
            <div className="bg-white py-3 px-2 rounded-xl border border-[#d4af37]/20 shadow-xs">
              <span className="block font-['Cairo'] text-xl sm:text-2xl font-bold text-[#0b2545]">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] sm:text-xs text-[#627d98] font-medium">ساعة</span>
            </div>
            <div className="bg-white py-3 px-2 rounded-xl border border-[#d4af37]/20 shadow-xs">
              <span className="block font-['Cairo'] text-xl sm:text-2xl font-bold text-[#0b2545]">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] sm:text-xs text-[#627d98] font-medium">دقيقة</span>
            </div>
            <div className="bg-white py-3 px-2 rounded-xl border border-[#d4af37]/20 shadow-xs">
              <span className="block font-['Cairo'] text-xl sm:text-2xl font-bold text-[#0b2545]">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] sm:text-xs text-[#627d98] font-medium">ثانية</span>
            </div>
          </div>

          {/* Add to Calendar Button */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <a
              id="google-cal-btn"
              href={googleCalendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#102a43] hover:text-[#b8860b] border border-[#c59a3f]/30 text-xs font-semibold shadow-xs hover:shadow-sm transition-all"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-[#b8860b]" />
              <span>إضافة لتقويم Google</span>
            </a>
            <button
              id="download-ics-btn"
              onClick={downloadIcsCalendar}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#102a43] hover:text-[#b8860b] border border-[#c59a3f]/30 text-xs font-semibold shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-[#b8860b]" />
              <span>تحميل التقويم (Apple / Outlook)</span>
            </button>
          </div>
        </div>

        <LuxuryDivider />

        {/* Location Section */}
        <div className="my-8 max-w-2xl mx-auto text-right">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#ebf5fc] text-[#b8860b] flex items-center justify-center border border-[#d4af37]/30">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-['Cairo'] font-bold text-lg sm:text-xl text-[#0b2545]">
                  مكان الحفل: نزل تونس الكبير
                </h3>
                <p className="text-xs text-[#627d98] font-['Cairo']">
                  Tunis Grand Hôtel • Avenue du 10 Décembre 1948, Tunis
                </p>
              </div>
            </div>

            <button
              id="copy-coords-btn"
              onClick={copyCoordinates}
              className="inline-flex items-center gap-1 text-xs text-[#8c6b24] hover:text-[#0b2545] font-semibold transition-colors cursor-pointer"
            >
              {copiedCoords ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCoords ? 'تم النسخ!' : 'نسخ الإحداثيات'}</span>
            </button>
          </div>

          {/* Interactive Map Embed */}
          <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-[#d4af37]/35 shadow-md mb-4 bg-[#e5eff8]">
            <iframe
              title="موقع نزل تونس الكبير - Tunis Grand Hôtel"
              src={`https://maps.google.com/maps?q=${hotelLat},${hotelLng}&hl=ar&z=16&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer"
              allowFullScreen
            />
            {/* Map Overlay Badge */}
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-[#d4af37]/40 shadow-sm text-xs font-bold text-[#0b2545] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>نزل تونس الكبير</span>
            </div>
          </div>

          {/* Luxury Call-To-Action Navigation Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              id="cta-google-maps"
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#b8860b] to-[#d4af37] text-white font-['Cairo'] font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Navigation className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>خرائط Google</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <a
              id="cta-waze"
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-[#f3f8fd] text-[#0b2545] font-['Cairo'] font-bold text-xs sm:text-sm border border-[#c59a3f]/40 shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Compass className="w-4 h-4 text-[#c59a3f] transition-transform group-hover:rotate-45" />
              <span>تطبيق Waze</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              id="cta-apple-maps"
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-[#f3f8fd] text-[#0b2545] font-['Cairo'] font-bold text-xs sm:text-sm border border-[#c59a3f]/40 shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <MapPin className="w-4 h-4 text-[#c59a3f] transition-transform group-hover:scale-110" />
              <span>خرائط Apple</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Welcoming Closing Words */}
        <div className="mt-12 pt-6 border-t border-[#d4af37]/25 max-w-xl mx-auto">
          <p className="font-['Amiri',serif] text-base sm:text-lg text-[#243b53] leading-relaxed">
            « تزدان ليلتنا بالبهجة والسرور بحضوركم الكريم، ففرحتنا لا تكتمل إلا بمشاركتكم أسعد لحظات العمر »
          </p>
          <div className="mt-4 font-['Aref_Ruqaa',serif] text-xl sm:text-2xl font-bold text-[#b8860b]">
            رانيا & يوسف
          </div>
        </div>
      </div>
    </motion.div>
  );
}
