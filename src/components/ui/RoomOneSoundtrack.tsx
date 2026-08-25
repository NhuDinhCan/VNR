'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Music2, Volume2, VolumeX } from 'lucide-react';
import { useMuseum } from '@/context/MuseumContext';

const NORMAL_VOLUME = 0.18;
const DUCKED_VOLUME = 0.055;
const FADE_STEP = 0.018;

export const RoomOneSoundtrack: React.FC = () => {
  const {
    currentRoom,
    activeGallery,
    selectedExhibit,
    audioPlaying,
  } = useMuseum();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackSrcRef = useRef<string | null>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [enabled, setEnabled] = useState(true);

  const activeRoomId = currentRoom || activeGallery?.id || 'gallery-subsidy';
  
  const getTrackForRoom = (roomId: string) => {
    if (roomId === 'gallery-subsidy') {
      return { src: '/audio/room-one-soundtrack.mp3', title: 'Nhạc nền Phòng 01' };
    }
    if (['gallery-three', 'gallery-ceramics', 'gallery-market-economy'].includes(roomId)) {
      return { src: '/audio/dang-da-cho-ta-mot-mua-xuan.mp3', title: 'Đảng đã cho ta một mùa xuân' };
    }
    return null;
  };

  const currentTrack = getTrackForRoom(activeRoomId);
  const isInSupportedRoom = Boolean(currentTrack);
  const shouldDuck = Boolean(selectedExhibit) || audioPlaying;
  const targetVolume = !enabled || !isInSupportedRoom
    ? 0
    : shouldDuck
      ? DUCKED_VOLUME
      : NORMAL_VOLUME;

  useEffect(() => {
    const storedPreference = window.localStorage.getItem('roomOneSoundtrackEnabled');
    if (storedPreference === 'false') setEnabled(false);
  }, []);

  useEffect(() => {
    if (!currentTrack) return;

    if (currentTrackSrcRef.current !== currentTrack.src) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      const audio = new Audio(currentTrack.src);
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0;
      audioRef.current = audio;
      currentTrackSrcRef.current = currentTrack.src;
    }

    return () => {
      // Keep track ref alive during sub-renders unless room/track actually changes
    };
  }, [currentTrack?.src]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
        currentTrackSrcRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const unlockAudio = () => setHasUserInteracted(true);
    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (targetVolume > 0 && hasUserInteracted) {
      void audio.play().catch(() => {
        // Browser autoplay policy allows playback after user interaction
      });
    }

    const fadeTimer = window.setInterval(() => {
      const difference = targetVolume - audio.volume;
      if (Math.abs(difference) <= FADE_STEP) {
        audio.volume = targetVolume;
        if (targetVolume === 0) audio.pause();
        window.clearInterval(fadeTimer);
        return;
      }

      audio.volume = Math.min(1, Math.max(0, audio.volume + Math.sign(difference) * FADE_STEP));
    }, 70);

    return () => window.clearInterval(fadeTimer);
  }, [hasUserInteracted, targetVolume]);

  const toggleSoundtrack = () => {
    const nextEnabled = !enabled;
    setEnabled(nextEnabled);
    window.localStorage.setItem('roomOneSoundtrackEnabled', String(nextEnabled));
    if (nextEnabled) setHasUserInteracted(true);
  };

  if (!isInSupportedRoom) return null;

  return (
    <button
      type="button"
      onClick={toggleSoundtrack}
      className="absolute right-5 top-20 z-40 flex items-center gap-2 rounded-full border border-amber-500/30 bg-slate-950/90 px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-amber-200 shadow-xl backdrop-blur-md transition-all hover:border-amber-400/60 hover:bg-slate-900 pointer-events-auto"
      title={enabled ? `Tắt nhạc: ${currentTrack?.title}` : `Bật nhạc: ${currentTrack?.title}`}
    >
      <Music2 size={14} className={enabled ? 'text-amber-400' : 'text-slate-500'} />
      <span className="hidden sm:inline">{currentTrack?.title}</span>
      {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
    </button>
  );
};

export default RoomOneSoundtrack;
