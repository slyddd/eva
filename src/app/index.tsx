import '@/global.css';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, Text, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/introduction');
    }, 2000);

    return () => clearTimeout(timer);
  });

  return (
    <View className="flex flex-1 flex-col items-center justify-center gap-10 bg-background">
      <View className="flex flex-col items-center gap-8">
        <Text className="text-4xl font-bold text-foreground">Bienvenido</Text>
        <Image
          alt="logo-eva"
          source={require('../../assets/images/icon.png')}
          className="h-48 w-48 rounded-xl"
        />
      </View>
    </View>
  );
}
