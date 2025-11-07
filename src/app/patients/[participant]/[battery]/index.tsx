import { batteries } from '@data/batteries';
import { useBatteryStore } from '@data/stores/excercise.store';
import { ButtonBase, ButtonLabel } from '@ui/button';
import { PillBase, PillLabel } from '@ui/pill';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function BatteryInfo() {
  const { battery, participant } = useLocalSearchParams();
  const { resetValues } = useBatteryStore();
  const router = useRouter();
  const batt = batteries.find((b) => b.id === battery);

  useEffect(() => {
    resetValues();
  }, [resetValues]);

  if (!batt) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl text-foreground">Batería no encontrada</Text>
      </View>
    );
  }

  const battMaterials = batt.excercises
    .map((exercise) => exercise.materials)
    .flat();

  const materials = Array.from(new Set(battMaterials));

  return (
    <View className="w-full flex-1 items-center justify-center gap-5 p-5">
      <Text className="text-xl text-foreground">{batt.name}</Text>
      <ScrollView contentContainerClassName="gap-5 flex-1 w-3/4 justify-center">
        <Text className="text-foreground">{batt.description}</Text>
        <View className="flex-row gap-4">
          {materials.map((material, index) => (
            <PillBase size="sm" selected key={index}>
              <PillLabel>{material}</PillLabel>
            </PillBase>
          ))}
        </View>
      </ScrollView>
      <View className="w-full flex-row justify-end">
        <ButtonBase
          onPress={() =>
            router.push(
              `/patients/${participant}/${battery}/${batt.excercises[0].id}`,
            )
          }
        >
          <ButtonLabel>Empezar</ButtonLabel>
        </ButtonBase>
      </View>
    </View>
  );
}
