import { batteries } from '@data/batteries';
import { useBatteryStore } from '@data/stores/excercise.store';
import { Exercise } from '@data/types/exercise';
import { db } from '@db/drizzle';
import { ExerciseLog, Participant } from '@db/schema';
import { ButtonBase, ButtonIcon, ButtonLabel } from '@ui/button';
import { CardBase, CardBody, CardContent, CardInfo, CardTitle } from '@ui/card';
import { Icon } from '@ui/icon';
import { useThemeStore } from '@ui/theme/theme.store';
import { eq } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PixelRatio, ScrollView, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function Results() {
  const { battery, participant } = useLocalSearchParams();
  const batt = batteries.find((b) => b.id === battery);
  const { values } = useBatteryStore();
  const { data: participantData } = useLiveQuery(
    db
      .select()
      .from(Participant)
      .where(eq(Participant.id, participant as string)),
  );
  const router = useRouter();

  if (!batt) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl text-foreground">Batería no encontrada</Text>
      </View>
    );
  }

  if (!participantData || participantData.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl text-foreground">
          Participante no encontrado
        </Text>
      </View>
    );
  }

  const age =
    new Date().getFullYear() -
    new Date(participantData[0].bornDate).getFullYear();

  const getFuncionalInfo = (exercise: Exercise, result: number) => {
    const genre = participantData[0].genre ?? 'man';
    const scaleGenre = exercise.scales[genre === 'man' ? 'm' : 'w'];
    const scaleAge = scaleGenre.find((ageRange) => {
      return ageRange.age[0] <= age && age <= ageRange.age[1];
    });

    console.log('Participant age:', age);
    console.log('Scale Age:', scaleAge);

    if (!scaleAge || !result) {
      return null;
    }

    const isFuncional = scaleAge.score[1] <= result;

    const target = scaleAge.score[1] ?? 0;
    const rawValue = result ?? 0;

    // Normalización: evitar porcentajes > 100 cuando el valor es negativo.
    // Si el valor es negativo se toma como 0 (rendimiento mínimo).
    // Se usa el target como denominador (en valor absoluto) y se limita entre 0 y 100.
    const safeTarget = target === 0 ? 1 : Math.abs(target);
    const value = rawValue < 0 ? 0 : rawValue;

    let percentage = Math.round((value / safeTarget) * 100);
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    return { isFuncional, percentage, scaleAge };
  };

  const handleFinish = async () => {
    try {
      for (const value of values) {
        console.log('Saving result for exercise:', value.id, value.value);
        const saved = await db
          .insert(ExerciseLog)
          .values({
            exerciseId: value.id,
            participantId: participantData[0].id,
            date: new Date().toISOString(),
            result: String(value.value),
            isFunctional: getFuncionalInfo(
              batt.excercises.find((e) => e.id === value.id)!,
              value.value,
            )?.isFuncional,
          })
          .returning();
        console.log('Saved result:', saved);
        router.replace(`/(dashboard)`);
      }
    } catch (error) {
      console.error('Error saving results:', error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center gap-5 py-10">
      <View className="items-center justify-center gap-4 px-10">
        <Text className="text-3xl font-bold text-foreground">
          {batt.name} - Resultados
        </Text>
        <View className="w-full flex-row justify-between">
          <Text className="text-2xl text-foreground">{`${participantData[0].firstName} ${participantData[0].lastName}`}</Text>
          <Text className="text-2xl text-foreground">{age} años</Text>
        </View>
      </View>
      <ScrollView
        className="px-10 py-5"
        contentContainerClassName="flex-row flex-wrap justify-center gap-5"
      >
        {batt.excercises.map((exercise) => {
          const result = values.find((v) => v.id === exercise.id);
          if (!result) {
            return null;
          }

          const funcionalInfo = getFuncionalInfo(exercise, result.value);
          if (!funcionalInfo) {
            return null;
          }

          const { isFuncional, percentage, scaleAge } = funcionalInfo;
          return (
            <CardBase
              key={exercise.id}
              color={isFuncional ? 'success' : 'error'}
              orientation="vertical"
              width={90}
            >
              <CardContent>
                <CardBody>
                  {({ fill }) => (
                    <AnimatedCircularProgress
                      size={PixelRatio.getPixelSizeForLayoutSize(40)}
                      width={PixelRatio.getPixelSizeForLayoutSize(4)}
                      fill={percentage}
                      tintColor={fill}
                    >
                      {() => (
                        <Text style={{ color: fill }} className="text-sm">
                          {result.value} / {scaleAge.score[1]} {exercise.units}
                        </Text>
                      )}
                    </AnimatedCircularProgress>
                  )}
                </CardBody>
                <CardTitle>{exercise.name}</CardTitle>
                <CardInfo>
                  {isFuncional ? 'Funcional' : 'No funcional'}
                </CardInfo>
              </CardContent>
            </CardBase>
          );
        })}
      </ScrollView>
      <ButtonBase onPress={handleFinish}>
        <ButtonIcon>{(props) => <Icon.Success {...props} />}</ButtonIcon>
        <ButtonLabel>Finalizar</ButtonLabel>
      </ButtonBase>
    </View>
  );
}
