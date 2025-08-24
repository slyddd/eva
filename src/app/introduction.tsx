import { ButtonBase, ButtonLabel } from '@ui/button';
import { useThemeStore } from '@ui/theme/theme.store';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { MotiPressable } from 'moti/interactions';
import { useEffect, useRef, useState } from 'react';
import { PixelRatio, Text, View } from 'react-native';

export default function Introduction() {
  const [position, setPosition] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | number | null>(null);
  const { colors } = useThemeStore();
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  const router = useRouter();

  // Helper to start the interval
  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setPosition((prev) => (prev + 1) % 5);
    }, 5000);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // When pressing a dot, set position and reset interval
  const handleDotPress = (index: number) => {
    setPosition(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startInterval();
  };

  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex flex-col items-center justify-center gap-10">
        <Text className="text-foreground">
          Adentrate a las funciones de EVA+
        </Text>
        <Image
          source="https://placehold.co/400"
          placeholder={{
            blurhash,
          }}
          contentFit="cover"
          style={{
            width: PixelRatio.getPixelSizeForLayoutSize(100),
            height: PixelRatio.getPixelSizeForLayoutSize(100),
            borderRadius: 9999,
          }}
          transition={1000}
        />
        <View className="flex flex-row items-center justify-center gap-3">
          {[...Array(5)].map((_, index) => (
            <MotiPressable
              key={index}
              onPress={() => handleDotPress(index)}
              animate={{
                scale: position === index ? 2 : 1,
                opacity: position === index ? 1 : 0.5,
              }}
              transition={{ type: 'timing', duration: 300 }}
              style={{
                width: PixelRatio.getPixelSizeForLayoutSize(5),
                height: PixelRatio.getPixelSizeForLayoutSize(5),
                borderRadius: 9999,
                backgroundColor: colors?.primary ?? '#fff',
              }}
            />
          ))}
        </View>
        <ButtonBase width={100} onPress={() => router.push('/register/1')}>
          <ButtonLabel>Continuar</ButtonLabel>
        </ButtonBase>
        <ButtonBase
          hasShadow={false}
          color="none"
          width={100}
          onPress={() => router.push('/login')}
        >
          <ButtonLabel className="text-primary">
            Ya tengo una cuenta
          </ButtonLabel>
        </ButtonBase>
      </View>
    </View>
  );
}
