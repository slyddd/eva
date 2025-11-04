import { useEffect, useRef, useState } from 'react';

export function useTimer({ startTime }: { startTime: number }) {
  const [time, setTime] = useState(startTime);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | number | null>(null);

  const play = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) =>
        startTime === 0 ? prev + 1000 : Math.max(prev - 1000, 0),
      );
    }, 1000);
  };

  const pause = () => {
    if (!isPlaying) return;
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    setTime(startTime);
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    time,
    play,
    pause,
    reset,
    isPlaying,
  };
}
