import { useCallback, useEffect, useMemo, useRef } from 'react';

export function useEngineAudio({ src }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const playFromStart = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.currentTime = 0;
      await audio.play();
    } catch {
      // ignore (autoplay policy / user gesture issues)
    }
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }, []);

  const setTime = useCallback((tSeconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!Number.isFinite(tSeconds)) return;
    const clamped = Math.max(0, Math.min(audio.duration || 9999, tSeconds));
    // small tolerance to avoid constant seeking jitter
    if (Math.abs((audio.currentTime ?? 0) - clamped) > 0.08) {
      audio.currentTime = clamped;
    }
  }, []);

  return useMemo(
    () => ({
      playFromStart,
      stop,
      setTime,
      audioRef,
    }),
    [playFromStart, setTime, stop]
  );
}

