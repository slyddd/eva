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
          {[...Array(5)].map((_, index) => (
            <CardBase
              width={150}
              onPress={() => router.push(`/patients/${participant}/${index}`)}
              key={index}
            >
              <CardContent>
                <CardHeader>
                  <CardTitle>Batería {index + 1}</CardTitle>
                  <CardInfo>Aprox 10 minutos</CardInfo>
                </CardHeader>
              </CardContent>
            </CardBase>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
