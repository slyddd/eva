import { useAvatarBySex } from '@/hooks/useAvatarConfig';
import { batteries } from '@data/batteries';
import { db } from '@db/drizzle';
import { Exercise, ExerciseLog, Participant } from '@db/schema';
import { Avatar } from '@ui/avatar';
import { ButtonBase, ButtonIcon, ButtonLabel } from '@ui/button';
import {
  CardBase,
  CardBody,
  CardContent,
  CardHeader,
  CardTitle,
} from '@ui/card';
import { Icon } from '@ui/icon';
import { PillBase, PillLabel } from '@ui/pill';
import { eq } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PixelRatio, ScrollView, Text, View } from 'react-native';
import { exportAndShareExcel } from '@/utils/reports/excel';
import { useThemeStore } from '@ui/theme/theme.store';

export default function ParticipantInfo() {
  const { participant } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useThemeStore();

  const { data: patient } = useLiveQuery(
    db
      .select()
      .from(Participant)
      .where(eq(Participant.id, participant as string)),
  );

  const { data: history } = useLiveQuery(
    db
      .select()
      .from(ExerciseLog)
      .where(eq(ExerciseLog.participantId, participant as string)),
  );

  const avatarConfig = useAvatarBySex(patient[0]?.genre ?? 'man');

  if (!patient[0]) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-lg font-bold text-foreground">
          Paciente no encontrado
        </Text>
      </View>
    );
  }

  const age =
    new Date().getFullYear() - new Date(patient[0].bornDate).getFullYear();

  const handleExport = async () => {
    if (!history || history.length === 0) {
      return;
    }

    const rows = history.map((log) => {
      const ex = batteries
        .flatMap((batt) => batt.excercises)
        .find((ex) => ex.id === log.exerciseId);

      return {
        Fecha: new Date(log.date).toLocaleString(),
        Ejercicio: ex?.name ?? 'Ejercicio Desconocido',
        Resultado: log.result,
        Unidades: ex?.units ?? '',
        Funcional: log.isFunctional ? 'Sí' : 'No',
      };
    });

    const fileName = `${patient[0].firstName}-${patient[0].lastName}`;

    try {
      await exportAndShareExcel(rows, {
        fileName,
        sheetName: 'Historial',
        dateSuffix: true,
      });
    } catch (e) {
      console.error('Error exporting Excel file:', e);
    }
  };

  return (
    <View className="flex-1 items-center gap-10 p-10">
      <View className="items-center">
        <Avatar
          size={PixelRatio.getPixelSizeForLayoutSize(60)}
          {...avatarConfig}
          shape="rounded"
        />
        <Text className="text-xl font-bold text-foreground">{`${patient[0].firstName} ${patient[0].lastName}`}</Text>
      </View>
      <View className="flex-1">
        <View className="w-full flex-row items-center justify-between gap-4 p-4">
          <Text className="text-lg font-bold text-foreground">Información</Text>
          <ButtonBase size="sm">
            <ButtonIcon>{(props) => <Icon.Edit {...props} />}</ButtonIcon>
            <ButtonLabel>Editar</ButtonLabel>
          </ButtonBase>
        </View>
        <View className="gap-2">
          <View className="flex w-full flex-row items-center justify-between p-4">
            <Text className="text-sm text-foreground">Edad</Text>
            <Text className="text-sm text-foreground">{age}</Text>
          </View>
          <View className="flex w-full flex-row items-center justify-between p-4">
            <Text className="text-sm text-foreground">Genero</Text>
            <Text className="text-sm text-foreground">
              {patient[0].genre === 'man' ? 'Hombre' : 'Mujer'}
            </Text>
          </View>
          <View className="flex w-full justify-between gap-4 p-4">
            <Text className="text-lg font-bold text-foreground">
              Historial de Ejercicios
            </Text>
            <ScrollView
              className="h-3/4 w-full"
              contentContainerClassName="gap-4"
            >
              {history && history.length > 0 ? (
                history.map((log) => (
                  <CardBase key={log.id} width="auto">
                    <CardContent>
                      <CardHeader>
                        <View className="flex-1">
                          <CardTitle className="text-sm">
                            {batteries
                              .flatMap((batt) => batt.excercises)
                              .find((ex) => ex.id === log.exerciseId)?.name ||
                              'Ejercicio Desconocido'}
                          </CardTitle>
                          <Text
                            className="text-xs"
                            style={{
                              color: log.isFunctional
                                ? colors.success
                                : colors.error,
                            }}
                          >
                            {log.isFunctional ? 'Funcional' : 'No funcional'}
                          </Text>
                        </View>
                      </CardHeader>
                    </CardContent>
                    <CardBody className="h-auto w-auto">
                      {(props) => (
                        <View className="gap-2">
                          <Text
                            className="text-sm"
                            style={{ color: props.fill }}
                          >
                            Resultado: {log.result}{' '}
                            {batteries
                              .flatMap((batt) => batt.excercises)
                              .find((ex) => ex.id === log.exerciseId)?.units ||
                              ''}
                          </Text>
                          <Text
                            className="text-sm"
                            style={{ color: props.fill }}
                          >
                            Fecha: {new Date(log.date).toLocaleDateString()}
                          </Text>
                        </View>
                      )}
                    </CardBody>
                  </CardBase>
                ))
              ) : (
                <Text className="text-sm text-foreground">
                  No hay historial de ejercicios.
                </Text>
              )}
            </ScrollView>
          </View>
          {/*<View className="flex w-full flex-row items-center justify-between p-4">
            <Text className="text-sm text-foreground">Enfermedades</Text>
            <Text className="text-sm text-foreground">
              {patient[0].diseases.length > 0 ? data.diseases.join(', ') : 'Ninguna'}
            </Text>
          </View>
          <View className="flex w-full flex-row items-center justify-between p-4">
            <Text className="text-sm text-foreground">Tags</Text>
            <Text className="text-sm text-foreground">
              {data.tags.length > 0
                ? data.tags.map((tag) => tag.name).join(', ')
                : 'Ninguno'}
            </Text>
          </View>*/}
        </View>
      </View>
      <View className="w-full flex-row items-center justify-between p-4">
        <ButtonBase onPress={handleExport}>
          <ButtonLabel>Informe</ButtonLabel>
          <ButtonIcon>{(props) => <Icon.Download {...props} />}</ButtonIcon>
        </ButtonBase>
        <ButtonBase
          onPress={() => router.push(`/patients/${participant}/battery`)}
        >
          <ButtonLabel>Evaluar</ButtonLabel>
          <ButtonIcon>{(props) => <Icon.Exercise {...props} />}</ButtonIcon>
        </ButtonBase>
      </View>
    </View>
  );
}
