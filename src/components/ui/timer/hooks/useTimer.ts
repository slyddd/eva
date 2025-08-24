import { useRef } from 'react';
import { StopwatchTimerMethods } from 'react-native-animated-stopwatch-timer';

export function useTimer() {
  const timerRef = useRef<StopwatchTimerMethods>(null);

  // Methods to control the timer
  function play() {
    timerRef.current?.play();
  }

  function pause() {
    timerRef.current?.pause();
  }

  function reset() {
    timerRef.current?.reset();
  }

  return {
    timerRef,
    play,
    pause,
    reset,
  };
}
