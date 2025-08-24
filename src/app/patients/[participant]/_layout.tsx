import { useAvatarBySex } from '@/hooks/useAvatarConfig';
import { Avatar } from '@ui/avatar';
import { useThemeStore } from '@ui/theme/theme.store';
import { Stack, useLocalSearchParams } from 'expo-router';
import { PixelRatio } from 'react-native';

export default function PatientLayout() {
  const { participant } = useLocalSearchParams();
  const { colors } = useThemeStore();
  const avatarConfig = useAvatarBySex('m');

  const data = {
    name: 'Paciente 1',
  };

  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <Avatar
            size={PixelRatio.getPixelSizeForLayoutSize(20)}
            style={{
              marginRight: 10,
            }}
            shape="rounded"
            {...avatarConfig}
          />
        ),
        headerTitle: data.name,
        contentStyle: {
          backgroundColor: 'transparent',
        },
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTitleStyle: {
          color: colors.foreground,
          fontSize: Math.round(PixelRatio.getFontScale() * 16),
        },
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="battery"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[battery]/[exercise]"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[battery]/index"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
