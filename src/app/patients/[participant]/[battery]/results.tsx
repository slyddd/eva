import { batteries } from '@data/batteries';
import {
  CardBase,
  CardBody,
  CardContent,
  CardHeader,
  CardInfo,
  CardTitle,
} from '@ui/card';
import { useThemeStore } from '@ui/theme/theme.store';
import { useLocalSearchParams } from 'expo-router';
import { PixelRatio, ScrollView, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { FadeWrapper } from 'rn-fade-wrapper';

export default function Results() {
  const { battery, participant } = useLocalSearchParams();
  const { colors } = useThemeStore();
  const batt = batteries.find((b) => b.id === battery);

  if (!batt) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl text-foreground">Batería no encontrada</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center gap-5">
      <View className="items-center justify-center gap-4 px-10">
        <Text className="text-3xl font-bold text-foreground">
          {batt.name} - Resultados
        </Text>
        <View className="w-full flex-row justify-between">
          <Text className="text-2xl text-foreground">{participant}</Text>
          <Text className="text-2xl text-foreground">25 años</Text>
        </View>
      </View>
      <FadeWrapper
        size={20}
        style={{
          width: '100%',
          height: 'auto',
          flex: 1,
        }}
        orientation="vertical"
        inward
        color={colors.background}
      >
        <ScrollView
          className="px-10 py-5"
          contentContainerClassName="flex-row flex-wrap justify-center gap-5"
        >
          {batt.excercises.map((exercise, index) => (
            <CardBase
              key={exercise.id}
              color={'success'}
              orientation="vertical"
              width={90}
            >
              <CardContent>
                <CardBody>
                  {({ fill }) => (
                    <AnimatedCircularProgress
                      size={PixelRatio.getPixelSizeForLayoutSize(40)}
                      width={PixelRatio.getPixelSizeForLayoutSize(4)}
                      fill={100}
                      tintColor={fill}
                    >
                      {() => (
                        <Text style={{ color: fill }} className="text-sm">
                          {100}%
                        </Text>
                      )}
                    </AnimatedCircularProgress>
                  )}
                </CardBody>
                <CardTitle>{exercise.name}</CardTitle>
                <CardInfo>Funcional</CardInfo>
              </CardContent>
            </CardBase>
          ))}
        </ScrollView>
      </FadeWrapper>
    </View>
  );
}
