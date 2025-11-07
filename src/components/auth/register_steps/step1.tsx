import { ButtonBase, ButtonIcon } from '@ui/button';
import { Icon } from '@ui/icon';
import { Image } from 'expo-image';
import { PixelRatio, Text, View } from 'react-native';
import { StepType } from './step.type';

export function RegisterStep1({ nextHandler }: StepType) {
  const blurhash = 'L5H?@-?b00%M~qj[ayj[ayj[ayj['; // TODO: Replace with actual blurhash

  return (
    <View className="w-full flex-1 items-center justify-center">
      <View className="flex w-1/2 flex-1 flex-col items-end justify-end gap-8">
        <Text className="text-2xl text-foreground">
          Nos gustaria saber mas de ti, para poder registrarte en la aplicación.
        </Text>
        <ButtonBase onPress={nextHandler}>
          <ButtonIcon>
            {({ fill, size }) => <Icon.Right fill={fill} size={size} />}
          </ButtonIcon>
        </ButtonBase>
      </View>
      <View className="w-full flex-1 flex-col items-end justify-end">
        <Image
          source={require('@/assets/hi.png')}
          placeholder={{
            blurhash,
          }}
          contentFit="cover"
          style={{
            width: PixelRatio.getPixelSizeForLayoutSize(120),
            height: PixelRatio.getPixelSizeForLayoutSize(120),
            borderRadius: 9999,
          }}
          transition={1000}
        />
      </View>
    </View>
  );
}
