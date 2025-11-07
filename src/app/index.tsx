import '@/global.css';
import { loadExercises, useDrizzle } from '@db/drizzle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeStore } from '@ui/theme/theme.store';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function Index() {
  const router = useRouter();
  const [status, setStatus] = useState('Iniciando aplicación...');
  const { colors } = useThemeStore();
  const { success, error } = useDrizzle();

  useEffect(() => {
    const getUserData = async () => {
      try {
        setStatus('Obteniendo datos del usuario...');
        const data = await AsyncStorage.getItem('userData');
        const { state: userData } = JSON.parse(data || '{}');

        setStatus('Datos del usuario obtenidos');
        console.log('User Data:', userData);

        if (userData && userData.id) {
          setStatus('Redirigiendo a la página de inicio...');
          return router.replace('/(dashboard)');
        }

        setStatus('Redirigiendo a la página de bienvenida...');
        return router.replace('/introduction');
      } catch (error) {
        setStatus('Error obteniendo datos del usuario');
        console.error('Error fetching user data:', error);
      }
    };

    const timer = setTimeout(async () => {
      if (!success) {
        setStatus('Inicializando base de datos...');
        return;
      }

      if (error) {
        setStatus('Error inicializando base de datos');
        console.error('Database initialization error:', error);
        return;
      }

      setStatus('Cargando ejercicios...');
      await loadExercises();

      return await getUserData();
    }, 2000);
    return () => clearTimeout(timer);
  }, [router, success, error]);

  return (
    <View className="flex flex-1 flex-col items-center justify-center gap-10">
      <View className="flex flex-col items-center gap-8">
        <Text className="text-4xl font-bold text-foreground">Bienvenido</Text>
        <Image
          alt="logo-eva"
          source={require('@/assets/logo.png')}
          contentFit="cover"
          style={{ width: 150, height: 150, borderRadius: 75 }}
          placeholder={{
            blurhash: 'L5H?@-?b00%M~qj[ayj[ayj[ayj[',
          }}
        />
        <Text className="text-center text-sm text-foreground/70">{status}</Text>
        <ActivityIndicator size="small" color={colors.foreground} />
      </View>
    </View>
  );
}
