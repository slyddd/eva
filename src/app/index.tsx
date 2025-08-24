import '@/global.css';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(dashboard)');
    }, 2000);
    return () => clearTimeout(timer);
  });

  return (
    <View className="flex flex-1 flex-col items-center justify-center gap-10">
      <View className="flex flex-col items-center gap-8">
        <Text className="text-4xl font-bold text-foreground">Bienvenido</Text>
        <Image
          alt="logo-eva"
          source={require('../../assets/images/icon.png')}
          className="h-48 w-48 rounded-xl"
          contentFit="cover"
          placeholder={{
            blurhash: 'L5H?@-?b00%M~qj[ayj[ayj[ayj[',
          }}
        />
      </View>
    </View>
  );
}
