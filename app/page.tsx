'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { IntroView } from '@/components/IntroView';
import { DetailsView } from '@/components/DetailsView';
import { AudioController } from '@/components/AudioPlayer';

export default function WeddingInvitationPage() {
  const [currentPage, setCurrentPage] = useState<'intro' | 'details'>('intro');
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleOpenInvitation = () => {
    // 1. Trigger wedding music starting from 01:03
    setShouldPlayMusic(true);
    // 2. Open details page with modern transition animation
    setCurrentPage('details');
  };

  const handleBackToIntro = () => {
    setCurrentPage('intro');
  };

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <main
      id="wedding-invitation-container"
      className="relative min-h-screen w-full bg-gradient-to-br from-[#eaf3fa] via-[#f2f7fc] to-[#e4eef7] text-[#0f2742] overflow-x-hidden"
    >
      {/* Subtle Islamic Arabesque Geometric Watermark Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#c59a3f_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* Ambient Soft Gold Glow Orbs in Corners */}
      <div
        className="fixed -top-24 -right-24 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed -bottom-24 -left-24 w-96 h-96 bg-[#60a5fa]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Audio Controller (No visible buttons on Intro) */}
      <AudioController
        shouldPlay={shouldPlayMusic}
        isMuted={isMuted}
      />

      {/* Pages Container with Smooth Motion Transitions */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentPage === 'intro' ? (
            <IntroView key="intro-view" onOpen={handleOpenInvitation} />
          ) : (
            <DetailsView
              key="details-view"
              onBackToIntro={handleBackToIntro}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
