import { batteries } from '@data/batteries';
import { ButtonBase, ButtonIcon, ButtonLabel } from '@ui/button';
import { Icon } from '@ui/icon';
import { ElevateOnKeyboard, InputBase, InputField, InputIcon } from '@ui/input';
import { SwitchBase, SwitchIcon } from '@ui/switch';
import { Timer } from '@ui/timer';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

export default function Exercise() {
  const { battery, participant, exercise } = useLocalSearchParams();
  const { control, setValue, getValues } = useForm();
  const [showInfo, setShowInfo] = useState(false);
  const router = useRouter();
  const batt = batteries.find((b) => b.id === battery);

  if (!batt) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl text-foreground">Batería no encontrada</Text>
      </View>
    );
  }

  const data = batt.excercises.find((e) => e.id === exercise);
  const currentIndex = batt.excercises.findIndex((e) => e.id === exercise);

  if (!data) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl text-foreground">
          Ejercicio no encontrado
        </Text>
      </View>
    );
  }

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
          {typeof data.timer === 'number' && (
            <View className="w-full items-center justify-center">
              <Timer time={data.timer}>
                {({ time, isPlaying }) => {
                  if (isPlaying || time === 0) {
                    return;
                  }

                  if (data.timer === 0) {
                    setValue('result', `${time / 1000}`, {
                      shouldValidate: true,
                    });
                  }
                }}
              </Timer>
            </View>
          )}
          <View className="w-2/3 flex-row items-center justify-center gap-2">
            {typeof data.timer === 'number' && data.timer !== 0 && (
              <ButtonBase
                width="auto"
                onPress={() =>
                  setValue(
                    'result',
                    `${Math.max(0, Number(getValues('result') || 0) - 1)}`,
                    {},
                  )
                }
              >
                <ButtonIcon>{(props) => <Icon.Minus {...props} />}</ButtonIcon>
              </ButtonBase>
            )}
            <InputBase control={control} name="result" defaultValue="0">
              <InputField readOnly={data.timer === 0} keyboardType="numeric" />
              <InputIcon>
                {({ fill, size }) => (
                  <Text style={{ color: fill, fontSize: size }}>
                    {data.units || 'units'}
                  </Text>
                )}
              </InputIcon>
            </InputBase>
            {typeof data.timer === 'number' && data.timer !== 0 && (
              <ButtonBase
                width="auto"
                onPress={() =>
                  setValue(
                    'result',
                    `${Number(getValues('result') || 0) + 1}`,
                    {},
                  )
                }
              >
                <ButtonIcon>{(props) => <Icon.Plus {...props} />}</ButtonIcon>
              </ButtonBase>
            )}
          </View>
          <View className="mt-auto w-full flex-row items-center justify-between gap-5 px-5 py-4">
            <ButtonBase
              width="auto"
              onPress={() => {
                router.back();
              }}
            >
              <ButtonIcon>{(props) => <Icon.Left {...props} />}</ButtonIcon>
              <ButtonLabel>Regresar</ButtonLabel>
            </ButtonBase>
            <ButtonBase
              width="auto"
              onPress={() => {
                router.push(
                  `/patients/${participant}/${battery}/${
                    currentIndex + 1 < batt.excercises.length
                      ? batt.excercises[currentIndex + 1].id
                      : 'results'
                  }`,
                );
              }}
            >
              <ButtonLabel>
                {currentIndex + 1 < batt.excercises.length
                  ? 'Continuar'
                  : 'Resultados'}
              </ButtonLabel>
              <ButtonIcon>{(props) => <Icon.Right {...props} />}</ButtonIcon>
            </ButtonBase>
          </View>
        </View>
      </View>
    </ElevateOnKeyboard>
  );
}
