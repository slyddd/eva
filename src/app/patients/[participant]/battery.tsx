import { batteries } from '@data/batteries';
import {
  CardBase,
  CardContent,
  CardHeader,
  CardInfo,
  CardTitle,
} from '@ui/card';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

export default function Batteries() {
  const router = useRouter();
  const { participant } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center gap-10 py-10">
      <Text className="text-3xl font-bold text-foreground">
        Baterías de Ejercicios
      </Text>
      <ScrollView contentContainerClassName="py-10">
        <View className="flex-1 items-center gap-5">
          {batteries.map((batt, index) => (
            <CardBase
              width={150}
              onPress={() => router.push(`/patients/${participant}/${batt.id}`)}
              key={index}
            >
              <CardContent>
                <CardHeader>
                  <CardTitle>{batt.name}</CardTitle>
                  <CardInfo>{`Aprox ${batt.duration} minutos`}</CardInfo>
                </CardHeader>
              </CardContent>
            </CardBase>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
