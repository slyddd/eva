import { PixelRatio, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Button } from '@/ui/button/button';
import { InfoIcon } from '@/ui/icon/icons/info';
import { useRouter } from 'expo-router';

export default function Introduction() {
  const [position, setPosition] = useState(0);
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
            <View
              className={`size-3 rounded-full bg-primary transition-transform duration-1000 ${position === index ? 'scale-[2]' : 'scale-100'}`}
              key={index}
              onTouchStart={() => setPosition(index)}
            />
          ))}
        </View>
        <Button.Base width={100}>
          <Button.Label center>Continuar</Button.Label>
        </Button.Base>
        <Button.Base
          className="bg-transparent px-0 py-0"
          shadow={false}
          onClick={() => router.push('/login')}
        >
          <Button.Label className="text-primary">
            Ya tengo una cuenta
          </Button.Label>
        </Button.Base>
      </View>
    </View>
  );
}
