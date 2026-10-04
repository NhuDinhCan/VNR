'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Music2, Volume2, VolumeX } from 'lucide-react';
import { useMuseum } from '@/context/MuseumContext';

// Nhạc nền về Chủ tịch Hồ Chí Minh cho Phòng 01–04. Phòng 05 (phòng họp) cố ý không có nhạc.
// Đặt file mp3 đúng tên vào public/audio/ để phát.
const ROOM_TRACKS: Record<string, { src: string; title: string }> = {
  'gallery-subsidy': { src: '/audio/tuoi-tre-the-he-ho-chi-minh.mp3', title: 'Tuổi trẻ thế hệ Hồ Chí Minh' },
  'gallery-three': { src: '/audio/nguoi-la-niem-tin-tat-thang.mp3', title: 'Người là niềm tin tất thắng' },
  'gallery-ceramics': { src: '/audio/bac-dang-cung-chung-chau-hanh-quan.mp3', title: 'Bác đang cùng chúng cháu hành quân' },
  'gallery-market-economy': { src: '/audio/ca-ngoi-ho-chu-tich.mp3', title: 'Ca ngợi Hồ Chủ tịch' },
};

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
  
  const [missingSrcs, setMissingSrcs] = useState<string[]>([]);
  const currentTrack = ROOM_TRACKS[activeRoomId] ?? null;
  const isMissing = !!currentTrack && missingSrcs.includes(currentTrack.src);
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
      const missingSrc = currentTrack.src;
      // Chưa chép file mp3 vào public/audio → báo trên nút thay vì im lặng.
      audio.addEventListener('error', () => {
        setMissingSrcs((prev) => (prev.includes(missingSrc) ? prev : [...prev, missingSrc]));
      });
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
      title={isMissing
        ? `Thiếu file nhạc: hãy chép ${currentTrack?.src.replace('/audio/', '')} vào thư mục public/audio`
        : enabled ? `Tắt nhạc: ${currentTrack?.title}` : `Bật nhạc: ${currentTrack?.title}`}
    >
      <Music2 size={14} className={enabled && !isMissing ? 'text-amber-400' : 'text-slate-500'} />
      <span className="hidden sm:inline">{isMissing ? `Thiếu file nhạc: ${currentTrack?.title}` : currentTrack?.title}</span>
      {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
    </button>
  );
};

export default RoomOneSoundtrack;
