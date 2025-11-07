import { useUserStore } from '@components/auth/stores/user.store';
import { batteries } from '@data/batteries';
import { db } from '@db/drizzle';
import { ExerciseLog, Participant } from '@db/schema';
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
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { Alert, PixelRatio, ScrollView, Text, View } from 'react-native';
import { exportAndShareExcel } from '@/utils/reports/excel';

export default function Stats() {
  const { userName, avatar } = useUserStore();
  const { data: exerciseLog } = useLiveQuery(db.select().from(ExerciseLog));
  const { data: participants } = useLiveQuery(db.select().from(Participant));

  const handleExportGeneral = async () => {
    if (!exerciseLog || exerciseLog.length === 0) {
      Alert.alert('Sin datos', 'No hay ejercicios para exportar.');
      return;
    }

    const rows = exerciseLog.map((log) => {
      const participant = participants.find((p) => p.id === log.participantId);
      const ex = batteries
        .flatMap((batt) => batt.excercises)
        .find((ex) => ex.id === log.exerciseId);

      return {
        Fecha: new Date(log.date).toLocaleString(),
        Paciente: participant
          ? `${participant.firstName} ${participant.lastName}`
          : 'Desconocido',
        Ejercicio: ex?.name ?? 'Ejercicio Desconocido',
        Resultado: log.result,
        Unidades: ex?.units ?? '',
        Funcional: log.isFunctional ? 'Sí' : 'No',
      };
    });

    try {
      await exportAndShareExcel(rows, {
        fileName: 'informe-general',
        sheetName: 'General',
        dateSuffix: true,
      });
    } catch (e) {
      Alert.alert('Error', 'No se pudo exportar el informe general.');
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-full flex-row items-center gap-4 p-4">
        <Avatar size={PixelRatio.getPixelSizeForLayoutSize(30)} {...avatar} />
        <Text className="text-lg font-bold text-foreground">{userName}</Text>
      </View>
      <ScrollView contentContainerClassName="pb-20">
        <View className="flex-1 items-center gap-4 py-4">
          <Text className="font-bold text-foreground">Información General</Text>
          <CardBase width={150} style={{ margin: 10 }}>
            <CardContent>
              <CardBody>
                {({ fill, size }) => (
                  <>
                    <View className="w-full flex-row justify-between">
                      <Text
                        style={{
                          fontSize: size,
                          color: fill,
                          fontWeight: 'bold',
                        }}
                      >
                        Pacientes Registrados
                      </Text>
                      <Text
                        style={{
                          fontSize: size,
                          color: fill,
                        }}
                      >
                        {participants.length}
                      </Text>
                    </View>
                    <View className="w-full flex-row justify-between">
                      <Text
                        style={{
                          fontSize: size,
                          color: fill,
                          fontWeight: 'bold',
                        }}
                      >
                        Ejercicios Realizados
                      </Text>
                      <Text
                        style={{
                          fontSize: size,
                          color: fill,
                        }}
                      >
                        {exerciseLog.length}
                      </Text>
                    </View>
                  </>
                )}
              </CardBody>
            </CardContent>
          </CardBase>
          <Text className="font-bold text-foreground">Informe por Bateria</Text>
          {batteries.map((batt, index) => (
            <CardBase hasShadow={false} key={index} width={150}>
              <CardHeader>
                <CardTitle>{batt.name}</CardTitle>
                <ButtonBase hasShadow={false} width="auto">
                  <ButtonIcon>
                    {(props) => <Icon.Download {...props} />}
                  </ButtonIcon>
                </ButtonBase>
              </CardHeader>
            </CardBase>
          ))}
        </View>
      </ScrollView>
      <View className="absolute bottom-0 right-0 z-30">
        <ButtonBase
          width={60}
          size="sm"
          style={{ margin: 20 }}
          onPress={handleExportGeneral}
        >
          <ButtonLabel>Informe</ButtonLabel>
          <ButtonIcon>
            {({ fill, size }) => <Icon.Download fill={fill} size={size} />}
          </ButtonIcon>
        </ButtonBase>
      </View>
    </View>
  );
}
