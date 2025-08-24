import { PatientsCard } from '@components/dashboard/patientsCard';
import { RecentCard } from '@components/dashboard/recentCard';
import { Avatar } from '@ui/avatar';
import { ButtonBase, ButtonIcon, ButtonLabel } from '@ui/button';
import { Icon } from '@ui/icon';
import { InputBase, InputField, InputIcon } from '@ui/input';
import { PillColor } from '@ui/pill/pill.context';
import { useThemeStore } from '@ui/theme/theme.store';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { FadeWrapper } from 'rn-fade-wrapper';

interface Patient {
  id: number;
  name: string;
  sex: 'h' | 'm';
  age: number;
  tags?: { name: string; color: PillColor }[];
}

const patientsPlaceholder: Patient[] = [
  { id: 1, name: 'Paciente 1', sex: 'h', age: 60 },
  {
    id: 2,
    name: 'Paciente 2',
    sex: 'm',
    age: 45,
    tags: [
      {
        name: 'Diabetes',
        color: 'primary',
      },
    ],
  },
  { id: 3, name: 'Paciente 3', sex: 'h', age: 30 },
  { id: 4, name: 'Paciente 4', sex: 'm', age: 50 },
  {
    id: 5,
    name: 'Paciente 5',
    sex: 'h',
    age: 40,
    tags: [
      {
        name: 'Hipertensión',
        color: 'error',
      },
    ],
  },
  { id: 6, name: 'Paciente 1', sex: 'h', age: 60 },
  {
    id: 7,
    name: 'Paciente 2',
    sex: 'm',
    age: 45,
    tags: [
      {
        name: 'Diabetes',
        color: 'primary',
      },
    ],
  },
  { id: 8, name: 'Paciente 3', sex: 'h', age: 30 },
  { id: 9, name: 'Paciente 4', sex: 'm', age: 50 },
  {
    id: 10,
    name: 'Paciente 5',
    sex: 'h',
    age: 40,
    tags: [
      {
        name: 'Hipertensión',
        color: 'error',
      },
    ],
  },
];

export default function Dashboard() {
  const { control } = useForm();
  const { colors } = useThemeStore();

  return (
    <View className="flex-1 items-center gap-4 p-4">
      <View className="flex w-full flex-row items-center justify-start">
        <Avatar size={40} />
        <View className="ml-2 flex flex-col items-start justify-center">
          <Text className="text-lg font-bold text-foreground">User</Text>
          <Text className="text-sm text-foreground/60">
            0 pacientes registrados
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
        <Text className="text-sm font-bold text-foreground">Recientes</Text>
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
            {[...Array(5)].map((_, index) => (
              <RecentCard
                key={index}
                sex={index % 2 === 0 ? 'h' : 'm'}
                name="juan"
              />
            ))}
          </ScrollView>
        </FadeWrapper>
      </View>
      <View className="w-full flex-1 gap-3">
        <Text className="text-sm font-bold text-foreground">Pacientes</Text>
        <ScrollView
          contentContainerStyle={{
            gap: 10,
            paddingBottom: 10,
            paddingHorizontal: 10,
          }}
        >
          {patientsPlaceholder.map(({ id, ...patient }) => (
            <PatientsCard key={id} {...patient} />
          ))}
        </ScrollView>
        <View className="absolute -bottom-5 -right-5 z-30">
          <ButtonBase width={60} size="sm" style={{ margin: 20 }}>
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
