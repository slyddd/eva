import { db } from '@db/drizzle';
import { User } from '@db/schema';
import { ButtonBase, ButtonLabel } from '@ui/button';
import { Icon } from '@ui/icon';
import { ElevateOnKeyboard, InputBase, InputField, InputIcon } from '@ui/input';
import { useThemeStore } from '@ui/theme/theme.store';
import { eq } from 'drizzle-orm';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PixelRatio, Text, View } from 'react-native';
import bcrypt from 'bcrypt-react-native';
import { useUserStore } from '@components/auth/stores/user.store';
import { useRouter } from 'expo-router';

export default function Login() {
  const { gradients } = useThemeStore();
  const { control, handleSubmit, setError: setErrors } = useForm();
  const [viewPassword, setViewPassword] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { setUser } = useUserStore();
  const router = useRouter();

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const onSubmit = async (data: any) => {
    setError(false);
    const { username, password } = data;
    const user = await db
      .select()
      .from(User)
      .where(eq(User.username, username));

    if (user.length === 0) {
      setError(true);
      setErrors('username', {
        type: 'manual',
        message: 'Usuario no encontrado',
      });
      return;
    }
    const isPasswordValid = await bcrypt.compareSync(
      password,
      user[0].password,
    );
    if (!isPasswordValid) {
      setError(true);
      setErrors('password', {
        type: 'manual',
        message: 'Contraseña incorrecta',
      });
      return;
    }

    console.log('Usuario autenticado:', user[0]);

    setUser({
      userName: user[0].username,
      avatar: JSON.parse(user[0].avatar),
      id: user[0].id,
      genre: user[0].genre,
    });

    router.replace('/(dashboard)');
  };

  return (
    <ElevateOnKeyboard>
      <View className="flex flex-1 items-center justify-end">
        <Image
          source="https://placehold.co/400"
          placeholder={{
            blurhash,
          }}
          contentFit="cover"
          style={{
            width: PixelRatio.roundToNearestPixel(250),
            height: PixelRatio.roundToNearestPixel(250),
            borderRadius: 9999,
          }}
          transition={1000}
        />
        <LinearGradient
          colors={
            (!error ? gradients.surface : gradients.surfaceError) ?? [
              '#FFFFFF',
              '#FFFFFF',
            ]
          }
          className="rounded-t-el-lg -mt-32 flex h-3/4 w-full flex-col items-center justify-evenly gap-4 bg-surface"
          style={{
            borderTopLeftRadius: PixelRatio.getPixelSizeForLayoutSize(28),
            borderTopRightRadius: PixelRatio.getPixelSizeForLayoutSize(28),
          }}
        >
          <Text className="text-xl font-bold text-foreground">
            Bienvenido de Vuelta
          </Text>
          <View className="flex w-3/4 flex-col items-center justify-center gap-4">
            <InputBase
              label="Nombre de Usuario"
              control={control}
              name="username"
            >
              <InputIcon>
                {({ fill, size }) => <Icon.Mail fill={fill} size={size} />}
              </InputIcon>
              <InputField />
            </InputBase>
            <InputBase label="Contraseña" control={control} name="password">
              <InputIcon>
                {({ fill, size }) => <Icon.Key fill={fill} size={size} />}
              </InputIcon>
              <InputField secureTextEntry={!viewPassword} />
              <InputIcon onPress={() => setViewPassword(!viewPassword)}>
                {({ fill, size }) =>
                  viewPassword ? (
                    <Icon.EyeOff fill={fill} size={size} />
                  ) : (
                    <Icon.Eye fill={fill} size={size} />
                  )
                }
              </InputIcon>
            </InputBase>
          </View>
          <ButtonBase width={100} onPress={handleSubmit(onSubmit)}>
            <ButtonLabel>Iniciar</ButtonLabel>
          </ButtonBase>
        </LinearGradient>
      </View>
    </ElevateOnKeyboard>
  );
}
