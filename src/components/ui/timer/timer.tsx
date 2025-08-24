import { useThemeStore } from '@ui/theme/theme.store';
import { ComponentProps, useEffect, useState } from 'react';
import StopwatchTimer from 'react-native-animated-stopwatch-timer';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useTimer } from './hooks/useTimer';
import { PixelRatio, View } from 'react-native';
import { ButtonBase, ButtonIcon } from '@ui/button';
import { Icon } from '@ui/icon';
import { shadows } from '@ui/shadows';
import { MotiView } from 'moti';
import { animations } from '@ui/animations';

interface TimerProps {
  time?: number;
}

export function Timer({ time }: TimerProps) {
  const { timerRef, pause, play, reset } = useTimer();
  const [isPlaying, setIsPlaying] = useState(false);
  const { colors } = useThemeStore();

  return (
    <MotiView
      className="w-full flex-row items-center justify-center"
      animate={{
        gap: isPlaying ? 10 : 0,
      }}
    >
      <ButtonBase
        width={20}
        color={isPlaying ? 'primary' : 'none'}
        hasShadow={isPlaying}
        onPress={() => {
          reset();
          setIsPlaying(false);
        }}
      >
        <ButtonIcon animate={animations.reload}>
          {(props) => <Icon.Refresh {...props} />}
        </ButtonIcon>
      </ButtonBase>

      <StopwatchTimer
        initialTimeInMs={time ?? 0}
        ref={timerRef}
        mode={time ? 'timer' : 'stopwatch'}
        trailingZeros={0}
        leadingZeros={2}
        containerStyle={{
          backgroundColor: colors.primary,
          borderRadius: 10,
          padding: 10,
          ...shadows.normal,
        }}
        separatorStyle={{
          color: colors.background,
          fontSize: PixelRatio.getFontScale() * 14,
        }}
        digitStyle={{
          color: colors.background,
          fontSize: PixelRatio.getFontScale() * 14,
          fontWeight: 'bold',
        }}
      />

      <ButtonBase
        width={20}
        color={isPlaying ? 'primary' : 'none'}
        hasShadow={isPlaying}
        onPress={() => {
          if (isPlaying) {
            pause();
          } else {
            play();
          }
          setIsPlaying(!isPlaying);
        }}
      >
        <ButtonIcon>
          {(props) =>
            isPlaying ? <Icon.Pause {...props} /> : <Icon.Play {...props} />
          }
        </ButtonIcon>
      </ButtonBase>
    </MotiView>
  );
}
