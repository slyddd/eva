import { ThemeProvider } from '@ui/theme/theme.provider';
import { useThemeStore } from '@ui/theme/theme.store';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { configureReanimatedLogger } from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

configureReanimatedLogger({
  strict: false,
});

export default function Layout() {
  const { gradients, colors } = useThemeStore();

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LinearGradient
          colors={gradients?.background ?? ['#000', '#000']}
          className="pb-safe flex-1"
          locations={[0.7, 1]}
        >
          <Stack
            screenOptions={{
              contentStyle: { backgroundColor: 'transparent' },
              headerShadowVisible: false,
              title: '',
              headerTintColor: colors?.foreground ?? '#fff',
              headerLeft: () => null,
              animation: 'fade',
              headerTransparent: true,
              headerShown: false,
              statusBarHidden: true,
            }}
          >
            <Stack.Screen
              name="(auth)/register/[step]"
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="(auth)/register/error"
              options={{
                headerShown: true,
              }}
            />
          </Stack>
        </LinearGradient>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
