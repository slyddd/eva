import { useAvatarBySex } from '@/hooks/useAvatarConfig';
import { db } from '@db/drizzle';
import { Participant } from '@db/schema';
import { Avatar } from '@ui/avatar';
import { useThemeStore } from '@ui/theme/theme.store';
import { eq } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { Stack, useLocalSearchParams } from 'expo-router';
import { PixelRatio } from 'react-native';

export default function PatientLayout() {
  const { participant } = useLocalSearchParams();
  const { colors } = useThemeStore();
  const avatarConfig = useAvatarBySex('man');

  const { data: patient } = useLiveQuery(
    db
      .select()
      .from(Participant)
      .where(eq(Participant.id, participant as string)),
  );

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
        headerTitle: `${patient[0]?.firstName ?? 'jhon'} ${patient[0]?.lastName ?? 'Doe'}`,
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
      <Stack.Screen
        name="[battery]/results"
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => <></>,
        }}
      />
    </Stack>
  );
}
