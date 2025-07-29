import { Button } from '@ui/button';
import { Icon } from '@/ui/icon';
import { Image } from 'expo-image';
import { PixelRatio, Text, View } from 'react-native';
import { StepType } from './step.type';

export function RegisterStep1({ nextHandler }: StepType) {
  const blurhash = 'L5H?@-?b00%M~qj[ayj[ayj[ayj['; // Example blurhash, replace with your own

  return (
    <View className="w-full flex-1 items-center justify-center">
      <View className="flex w-1/2 flex-1 flex-col items-end justify-end gap-8">
        <Text className="text-2xl text-foreground">
          Nos gustaria saber mas de ti, para poder registrarte en la aplicación.
        </Text>
        <Button.Base className="" onPress={nextHandler}>
          <Button.Icon>
            {({ fill, size }) => <Icon.Right fill={fill} size={size} />}
          </Button.Icon>
        </Button.Base>
      </View>
      <View className="w-full flex-1 flex-col items-end justify-end">
        <Image
          source="https://placehold.co/400"
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
