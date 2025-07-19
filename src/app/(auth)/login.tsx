import { Button } from '@/ui/button/button';
import { Icon } from '@/ui/icon/icon';
import { Input } from '@/ui/input/input';
import { useThemeStore } from '@/ui/theme/theme.store';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, PixelRatio, Text, View } from 'react-native';

export default function Login() {
  const { gradients } = useThemeStore();
  const { control } = useForm();
  const [viewPassword, setViewPassword] = useState(false);

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <Input.ElevateOnKeyboard>
      <View className="flex flex-1 items-center justify-end bg-background">
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
          className="-mt-32 flex h-3/4 w-full flex-col items-center justify-evenly gap-4 rounded-t-el-lg bg-surface"
          style={{
            borderTopLeftRadius: PixelRatio.getPixelSizeForLayoutSize(28),
            borderTopRightRadius: PixelRatio.getPixelSizeForLayoutSize(28),
          }}
        >
          <Text className="text-xl font-bold text-foreground">
            Bienvenido de Vuelta
          </Text>
          <View className="flex w-3/4 flex-col items-center justify-center gap-4">
            <Input.Base>
              <Input.Icon>
                {({ fill, size }) => <Icon.Mail fill={fill} size={size} />}
              </Input.Icon>
              <Input.TextField
                name="mail"
                placeholder="Correo Electrónico"
                control={control}
              />
            </Input.Base>
            <Input.Base>
              <Input.Icon>
                {({ fill, size }) => <Icon.Key fill={fill} size={size} />}
              </Input.Icon>
              <Input.TextField
                name="password"
                placeholder="Contraseña"
                control={control}
                secureTextEntry={!viewPassword}
              />
              <Input.Icon onPress={() => setViewPassword(!viewPassword)}>
                {({ fill, size }) =>
                  viewPassword ? (
                    <Icon.EyeOff fill={fill} size={size} />
                  ) : (
                    <Icon.Eye fill={fill} size={size} />
                  )
                }
              </Input.Icon>
            </Input.Base>
          </View>
          <Button.Base width={50}>
            <Button.Label center>Iniciar</Button.Label>
          </Button.Base>
        </LinearGradient>
      </View>
    </Input.ElevateOnKeyboard>
  );
}
