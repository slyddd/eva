import { Button } from '@/ui/button/button';
import { Icon } from '@/ui/icon/icon';
import { ThemeProvider } from '@/ui/theme/theme.provider';
import { useThemeStore } from '@/ui/theme/theme.store';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';

export default function Layout() {
  const { gradients, colors } = useThemeStore();
  const router = useRouter();

  return (
    <ThemeProvider>
      <LinearGradient
        colors={gradients?.background ?? ['#000', '#000']}
        className="flex-1"
      >
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: 'transparent' },
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: 'transparent',
            },
            title: '',
            headerTintColor: colors?.foreground ?? '#fff',
            headerLeft: ({ tintColor }) => (
              <Button.Base
                className="w-fit bg-transparent px-0 py-0"
                shadow={false}
                onClick={() => router.dismiss()}
              >
                <Button.Icon>
                  {({ size }) => <Icon.Left fill={tintColor} size={size} />}
                </Button.Icon>
              </Button.Base>
            ),
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
              animation: 'fade',
              headerShown: false,
            }}
          />
          <Stack.Screen name="(auth)/login" />
        </Stack>
      </LinearGradient>
    </ThemeProvider>
  );
}
