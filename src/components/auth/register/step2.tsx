import { Button } from '@ui/button';
import { Icon } from '@/ui/icon';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { PixelRatio, Text, View } from 'react-native';
import { StepType } from './step.type';

export function RegisterStep2({ nextHandler }: StepType) {
  const blurhash = 'L5H?@-?b00%M~qj[ayj[ayj[ayj['; //TODO: Replace with img blur hash
  const router = useRouter();

  return (
    <View className="w-full flex-1 items-center justify-center">
      <View className="flex w-1/2 flex-1 flex-col items-end justify-end gap-8">
        <Text className="text-center text-2xl text-foreground">
          ¿Eres un profesional de la salud o estas relacionado con algun area de
          la misma?
        </Text>
        <View className="flex w-full flex-row items-center justify-between gap-4">
          <Button.Base
            color="error"
            onPress={() => router.push('/register/error')}
          >
            <Button.Icon>
              {({ fill, size }) => <Icon.Error fill={fill} size={size} />}
            </Button.Icon>
          </Button.Base>
          <Button.Base color="success" onPress={nextHandler}>
            <Button.Icon>
              {({ fill, size }) => <Icon.Success fill={fill} size={size} />}
            </Button.Icon>
          </Button.Base>
        </View>
      </View>
      <View className="w-full flex-1 flex-col items-center justify-center gap-5">
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
