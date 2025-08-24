import { ButtonBase, ButtonIcon, ButtonLabel } from '@ui/button';
import { Icon } from '@ui/icon';
import { Timer, useTimer } from '@ui/timer';
import { SwitchBase, SwitchIcon } from '@ui/switch';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import StopwatchTimer from 'react-native-animated-stopwatch-timer';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ElevateOnKeyboard, InputBase, InputField, InputIcon } from '@ui/input';
import { useForm } from 'react-hook-form';

export default function Exercise() {
  const { battery, participant, exercise } = useLocalSearchParams();
  const { timerRef, play } = useTimer();
  const { control } = useForm();
  const [showInfo, setShowInfo] = useState(false);

  const data = {
    name: 'exercise' + exercise,
    description: `This is a description for exercise ${exercise} of battery ${battery} for
participant ${participant}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    materials: ['silla', 'mesa'],
    timer: 60000,
    img: 'https://placehold.co/600x600',
    units: 'rep',
  };

  return (
    <ElevateOnKeyboard>
      <View className="flex-1 items-center justify-center gap-5">
        <View className="w-full flex-1 p-5">
          {showInfo ? (
            <Text className="text-wrap text-foreground">
              {data.description}
            </Text>
          ) : (
            <Image
              source={data.img}
              style={{ aspectRatio: 1, width: '100%', borderRadius: 15 }}
              contentFit="fill"
              placeholder={{
                blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj',
              }}
            />
          )}
        </View>
        <View className="w-full flex-1 items-center gap-10 rounded-t-3xl bg-surface py-5">
          <View className="w-full flex-row items-center justify-center gap-5">
            <Text className="text-2xl font-bold text-foreground">
              {data.name}
            </Text>
            <SwitchBase onPress={(state) => setShowInfo(state)}>
              <SwitchIcon>
                {(props) =>
                  showInfo ? (
                    <Icon.Info {...props} />
                  ) : (
                    <Icon.Image {...props} />
                  )
                }
              </SwitchIcon>
            </SwitchBase>
          </View>
          <View className="w-full items-center justify-center">
            <Timer time={data.timer} />
          </View>
          <View className="w-2/3 items-center justify-center">
            <InputBase control={control} name="result">
              <InputField />
              <InputIcon>
                {({ fill, size }) => (
                  <Text style={{ color: fill, fontSize: size }}>
                    {data.units || 'units'}
                  </Text>
                )}
              </InputIcon>
            </InputBase>
          </View>
          <View className="mt-auto w-full flex-row items-center justify-between gap-5 px-5 py-4">
            {/*{exercise !== '0' && (*/}
            <ButtonBase width="auto">
              <ButtonIcon>{(props) => <Icon.Left {...props} />}</ButtonIcon>
              <ButtonLabel>Regresar</ButtonLabel>
            </ButtonBase>
            {/*)}*/}
            <ButtonBase width="auto">
              <ButtonLabel>Continuar</ButtonLabel>
              <ButtonIcon>{(props) => <Icon.Right {...props} />}</ButtonIcon>
            </ButtonBase>
          </View>
        </View>
      </View>
    </ElevateOnKeyboard>
  );
}
