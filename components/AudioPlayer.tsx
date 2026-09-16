'use client';

import React, { useEffect, useRef, useCallback } from 'react';

interface AudioControllerProps {
  shouldPlay: boolean;
  isMuted: boolean;
  onMuteChange?: (muted: boolean) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export function AudioController({
  shouldPlay,
  isMuted,
  onPlayStateChange,
}: AudioControllerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedFirstTimeRef = useRef(false);

  // Start audio precisely at 01m03s (63 seconds)
  const startAudioAtTarget = useCallback((targetTime = 63) => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    try {
      if (audio.readyState >= 1) {
        audio.currentTime = Math.min(
          targetTime,
          audio.duration ? Math.max(0, audio.duration - 1) : targetTime
        );
      } else {
        const handleLoaded = () => {
          audio.currentTime = Math.min(
            targetTime,
            audio.duration ? Math.max(0, audio.duration - 1) : targetTime
          );
          audio.removeEventListener('loadedmetadata', handleLoaded);
        };
        audio.addEventListener('loadedmetadata', handleLoaded);
      }
    } catch {
      // safe fallback
    }

    audio.loop = true;
    audio.muted = isMuted;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          onPlayStateChange?.(true);
        })
        .catch(() => {
          onPlayStateChange?.(false);
        });
    }
  }, [isMuted, onPlayStateChange]);

  // When shouldPlay becomes true for the first time (when user clicks open invitation)
  useEffect(() => {
    if (shouldPlay && !hasStartedFirstTimeRef.current) {
      hasStartedFirstTimeRef.current = true;
      startAudioAtTarget(63);
    }
  }, [shouldPlay, startAudioAtTarget]);

  // Synchronize muted state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <audio
      ref={audioRef}
      src="/background-music.mp3"
      preload="auto"
      loop
      onEnded={() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
      }}
      className="hidden"
    />
  );
}
