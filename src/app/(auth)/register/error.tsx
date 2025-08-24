import { ButtonBase, ButtonIcon, ButtonLabel } from '@ui/button';
import { Icon } from '@ui/icon';
import { useThemeStore } from '@ui/theme/theme.store';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler, PixelRatio, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function Register() {
  const { gradients, colors } = useThemeStore();
  const navigation = useNavigation();
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  useEffect(() => {
    navigation.setOptions({
      headerTintColor: colors?.error ?? '#ff0000',
      headerRight: ({ tintColor }: { tintColor: string }) => (
        <AnimatedCircularProgress
          size={PixelRatio.getPixelSizeForLayoutSize(20)}
          width={PixelRatio.getPixelSizeForLayoutSize(2)}
          fill={100}
          tintColor={tintColor}
        />
      ),
    });
  }, [navigation]);

  return (
    <LinearGradient
      colors={gradients?.backgroundError ?? ['#000', '#000']}
      className="w-full flex-1 items-center justify-center"
      locations={[0.7, 1]}
    >
      <View className="flex w-3/4 flex-1 flex-col items-center justify-end gap-8">
        <Text className="text-center text-xl text-foreground">
          Lo sentimos, el uso de esta aplicacion es exclusivo para profesionales
          de la salud, debido a que el adulto mayor puede lastimarse si no se
          realizan los ejercicios adecuadamente
        </Text>
        <ButtonBase
          color="error"
          size="lg"
          onPress={() => BackHandler.exitApp()}
        >
          <ButtonIcon>
            {({ fill, size }) => <Icon.Error fill={fill} size={size} />}
          </ButtonIcon>
          <ButtonLabel>Cerrar App</ButtonLabel>
        </ButtonBase>
      </View>
      <View className="w-full flex-1 flex-col items-center justify-center">
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
    </LinearGradient>
  );
}
