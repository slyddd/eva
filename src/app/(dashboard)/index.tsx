import { useUserStore } from '@components/auth/stores/user.store';
import { PatientsCard } from '@components/dashboard/patientsCard';
import { RecentCard } from '@components/dashboard/recentCard';
import { db } from '@db/drizzle';
import { Participant } from '@db/schema';
import { Avatar } from '@ui/avatar';
import { ButtonBase, ButtonIcon, ButtonLabel } from '@ui/button';
import { Icon } from '@ui/icon';
import { InputBase, InputField, InputIcon } from '@ui/input';
import { useThemeStore } from '@ui/theme/theme.store';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { FadeWrapper } from 'rn-fade-wrapper';

export default function Dashboard() {
  const { control } = useForm();
  const { colors } = useThemeStore();
  const { userName, avatar } = useUserStore();
  const { data: patients } = useLiveQuery(db.select().from(Participant));
  const router = useRouter();

  const recentPatients = patients?.slice(0, 5) || [];

  return (
    <View className="flex-1 items-center gap-4 p-4">
      <View className="flex w-full flex-row items-center justify-start">
        <Avatar size={40} {...avatar} />
        <View className="ml-2 flex flex-col items-start justify-center">
          <Text className="text-lg font-bold text-foreground">{userName}</Text>
          <Text className="text-sm text-foreground/60">
            {patients.length} pacientes registrados
          </Text>
        </View>
      </View>
      <View className="flex w-3/4 flex-row items-center justify-center gap-5">
        <InputBase width={'90%'} control={control} name="search">
          <InputIcon>
            {({ fill, size }) => <Icon.Search fill={fill} size={size} />}
          </InputIcon>
          <InputField placeholder="Buscar" />
        </InputBase>
        <ButtonBase width={20}>
          <ButtonIcon>
            {({ fill, size }) => <Icon.Filter fill={fill} size={size} />}
          </ButtonIcon>
        </ButtonBase>
      </View>
      <View className="w-full gap-3">
        <Text className="text-md font-bold text-foreground">Recientes</Text>
        <FadeWrapper
          size={20}
          style={{
            width: '100%',
            height: 'auto',
          }}
          orientation="horizontal"
          inward
          color={colors.background}
        >
          <ScrollView
            className="flex-0"
            contentContainerStyle={{
              flexDirection: 'row',
              gap: 10,
              flex: 0,
              paddingHorizontal: 10,
            }}
            horizontal
          >
            {recentPatients.length > 0 ? (
              recentPatients.map((patient, index) => (
                <RecentCard
                  key={patient.id}
                  sex={patient.genre}
                  name={`${patient.firstName} ${patient.lastName}`}
                />
              ))
            ) : (
              <Text className="text-sm text-foreground/60">
                No hay pacientes recientes
              </Text>
            )}
          </ScrollView>
        </FadeWrapper>
      </View>
      <View className="w-full flex-1 gap-3">
        <Text className="text-md font-bold text-foreground">Pacientes</Text>
        <ScrollView
          contentContainerStyle={{
            gap: 10,
            paddingBottom: 10,
            paddingHorizontal: 10,
          }}
        >
          {patients.length > 0 ? (
            patients.map(({ id, ...patient }) => {
              // combine the 4 name fields into one
              const fullName =
                `${patient.firstName} ${patient.middleName} ${patient.lastName} ${patient.secondLastName}`.trim();
              const age =
                new Date().getFullYear() -
                new Date(patient.bornDate).getFullYear();
              return (
                <PatientsCard
                  key={id}
                  age={age}
                  name={fullName}
                  sex={patient.genre}
                />
              );
            })
          ) : (
            <Text className="text-sm text-foreground/60">
              No hay pacientes registrados
            </Text>
          )}
        </ScrollView>
        <View className="absolute -bottom-5 -right-5 z-30">
          <ButtonBase
            width={60}
            size="sm"
            style={{ margin: 20 }}
            onPress={() => router.push('/patients/addPatient')}
          >
            <ButtonLabel>Añadir Paciente</ButtonLabel>
            <ButtonIcon>
              {({ fill, size }) => <Icon.Info fill={fill} size={size} />}
            </ButtonIcon>
          </ButtonBase>
        </View>
      </View>
    </View>
  );
}
