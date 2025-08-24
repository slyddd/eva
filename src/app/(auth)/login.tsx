import { ButtonBase, ButtonLabel } from '@ui/button';
import { Icon } from '@ui/icon';
import { ElevateOnKeyboard, InputBase, InputField, InputIcon } from '@ui/input';
import { useThemeStore } from '@ui/theme/theme.store';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PixelRatio, Text, View } from 'react-native';

export default function Login() {
  const { gradients } = useThemeStore();
  const { control } = useForm();
  const [viewPassword, setViewPassword] = useState(false);

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

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
          colors={gradients?.surface ?? ['#000', '#000']}
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
            <InputBase label="Correo" control={control} name="mail">
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
          <ButtonBase width={100}>
            <ButtonLabel>Iniciar</ButtonLabel>
          </ButtonBase>
        </LinearGradient>
      </View>
    </ElevateOnKeyboard>
  );
}
