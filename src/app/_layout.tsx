import { Icon } from '@/ui/icon';
import { Button } from '@ui/button';
import { ThemeProvider } from '@ui/theme/theme.provider';
import { useThemeStore } from '@ui/theme/theme.store';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { configureReanimatedLogger } from 'react-native-reanimated';

configureReanimatedLogger({
  strict: false,
});

export default function Layout() {
  const { gradients, colors } = useThemeStore();
  const router = useRouter();

  return (
    <ThemeProvider>
      <LinearGradient
        colors={gradients?.background ?? ['#000', '#000']}
        className="flex-1"
        locations={[0.7, 1]}
      >
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: 'transparent' },
            headerShadowVisible: false,
            title: '',
            headerTintColor: colors?.foreground ?? '#fff',
            headerLeft: ({ tintColor }) => (
              <Button.Base
                onPress={() => router.back()}
                shadow={false}
                className="bg-transparent"
              >
                <Button.Icon>
                  {({ size }) => <Icon.Left fill={tintColor} size={size} />}
                </Button.Icon>
              </Button.Base>
            ),
            animation: 'fade',
            headerTransparent: true,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="introduction"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen
            name="(dashboard)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </LinearGradient>
    </ThemeProvider>
  );
}
