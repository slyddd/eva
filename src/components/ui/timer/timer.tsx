import { animations } from '@ui/animations';
import { ButtonBase, ButtonIcon } from '@ui/button';
import { Icon } from '@ui/icon';
import { shadows } from '@ui/shadows';
import { MotiView } from 'moti';
import { useState } from 'react';
import { Text } from 'react-native';
import { useTimer } from './hooks/useTimer';

interface TimerProps {
  time?: number;
  children?: ({
    time,
    isPlaying,
  }: {
    time: number;
    isPlaying: boolean;
  }) => void;
}

export function Timer({ time = 0, children }: TimerProps) {
  const {
    pause,
    play,
    reset,
    time: timerTime,
  } = useTimer({ startTime: time * 1000 });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
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

        <MotiView
          animate={{
            scale: isPlaying ? [1.03, 1] : 0.9,
            paddingHorizontal: isPlaying ? 20 : 10,
          }}
          style={isPlaying ? shadows.normal : undefined}
          className="items-center justify-center rounded-lg bg-primary py-3"
        >
          <Text className="font-mono text-xl text-background">
            {new Date(timerTime).toISOString().substring(11, 19)}
          </Text>
        </MotiView>

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
              isPlaying ? (
                time === 0 ? (
                  <Icon.Stop {...props} />
                ) : (
                  <Icon.Pause {...props} />
                )
              ) : (
                <Icon.Play {...props} />
              )
            }
          </ButtonIcon>
        </ButtonBase>
      </MotiView>
      {typeof children === 'function' &&
        children({ time: timerTime, isPlaying })}
    </>
  );
}
