import { ScrollView, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { InputBase, InputField } from '@ui/input';
import { SwitchBase, SwitchIcon } from '@ui/switch';
import { Icon } from '@ui/icon';
import { ButtonBase, ButtonLabel } from '@ui/button';
import { db } from '@db/drizzle';
import { Genres, Participant, User } from '@db/schema';
import { useUserStore } from '@components/auth/stores/user.store';
import { useRouter } from 'expo-router';
import { eq } from 'drizzle-orm';

type FormValues = {
  firstName: string;
  middleName: string;
  lastName: string;
  secondLastName: string;
  birthDate: string;
  gender: 'man' | 'woman';
};

export default function AddPatient() {
  const { control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      secondLastName: '',
      birthDate: '',
      gender: 'man',
    },
  });
  const { id } = useUserStore();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    if (!id) {
      console.error('No user ID found. Cannot add patient.');
      return;
    }

    if (!data.firstName || !data.lastName || !data.birthDate) {
      console.error(
        'Missing required fields: firstName, lastName, or birthDate.',
      );
      return;
    }

    await db.insert(Participant).values({
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      secondLastName: data.secondLastName,
      bornDate: data.birthDate,
      genre: data.gender as Genres,

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

      userId: id,
    });

    router.back();
    // Aquí podrías agregar navegación o un mensaje de éxito
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        justifyContent: 'center',
        flexGrow: 1,
        gap: 20,
      }}
      className="flex-1 gap-10"
    >
      <Text className="w-full py-10 text-center text-lg font-bold text-foreground">
        Agregar paciente
      </Text>

      <InputBase control={control} name="firstName" label="Primer nombre">
        <InputField />
      </InputBase>

      <InputBase control={control} name="middleName" label="Segundo nombre">
        <InputField />
      </InputBase>

      <InputBase control={control} name="lastName" label="Primer apellido">
        <InputField />
      </InputBase>

      <InputBase
        control={control}
        name="secondLastName"
        label="Segundo apellido"
      >
        <InputField />
      </InputBase>

      <InputBase control={control} name="birthDate" label="Fecha de nacimiento">
        <InputField placeholder="YYYY-MM-DD" />
      </InputBase>

      <View className="flex gap-4">
        <Text className="text-sm font-semibold text-foreground">Género</Text>
        <SwitchBase
          label={['Femenino', 'Masculino']}
          onPress={(selected) => {
            setValue('gender', selected ? 'man' : 'woman');
          }}
        >
          <SwitchIcon>
            {({ fill, size, state }) =>
              state ? (
                <Icon.Male fill={fill} size={size} />
              ) : (
                <Icon.Female fill={fill} size={size} />
              )
            }
          </SwitchIcon>
        </SwitchBase>
      </View>

      <View className="mt-10 w-full items-center">
        <ButtonBase size="lg" onPress={handleSubmit(onSubmit)}>
          <ButtonLabel>Guardar</ButtonLabel>
        </ButtonBase>
      </View>
    </ScrollView>
  );
}
