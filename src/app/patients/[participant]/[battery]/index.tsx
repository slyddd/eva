import { ButtonBase, ButtonLabel } from '@ui/button';
import { PillBase, PillLabel } from '@ui/pill';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

export default function BatteryInfo() {
  const { battery, participant } = useLocalSearchParams();
  const router = useRouter();
  const batteryInfo = {
    name: battery,
    description: `lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    materials: ['silla', 'mesa'],
  };

  return (
    <View className="w-full flex-1 items-center justify-center gap-5 p-5">
      <Text className="text-xl text-foreground">{batteryInfo.name}</Text>
      <ScrollView contentContainerClassName="gap-5 flex-1 w-3/4 justify-center">
        <Text className="text-foreground">{batteryInfo.description}</Text>
        <View className="flex-row gap-4">
          {batteryInfo.materials.map((material, index) => (
            <PillBase size="sm" selected key={index}>
              <PillLabel>{material}</PillLabel>
            </PillBase>
          ))}
        </View>
      </ScrollView>
      <View className="w-full flex-row justify-end">
        <ButtonBase
          onPress={() => router.push(`/patients/${participant}/${battery}/0`)}
        >
          <ButtonLabel>Empezar</ButtonLabel>
        </ButtonBase>
      </View>
    </View>
  );
}
