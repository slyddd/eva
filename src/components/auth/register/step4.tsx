import { Button } from '@ui/button';
import { Icon } from '@ui/icon';
import { PixelRatio, Text, View } from 'react-native';
import { StepType } from './step.type';
import { useForm } from 'react-hook-form';
import { Input } from '@ui/input/input';
import Avatar, { genConfig } from '@ui/avatar';
import { useReducer, useState } from 'react';
import { Switch } from '@ui/switch';
import { animations } from '@ui/animations';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function RegisterStep4({ nextHandler }: StepType) {
  const blurhash = 'L5H?@-?b00%M~qj[ayj[ayj[ayj['; //TODO: Replace with img blur hash
  const { control } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View
      className="w-full flex-1"
      style={{ paddingBottom: insets.bottom + 20, paddingTop: insets.top }}
    >
      <Input.ElevateOnKeyboard>
        <View className="w-full flex-1 items-center justify-center">
          <View className="flex w-1/2 flex-1 flex-col items-center justify-center gap-8">
            <Text className="text-center text-lg font-bold text-foreground">
              Crea una contraseña para ingresar a la aplicación
            </Text>
            <View className="flex w-full flex-col items-end justify-between gap-4">
              <Input.Base size="sm">
                <Input.TextField
                  name="password"
                  control={control}
                  placeholder="Contraseña"
                  secureTextEntry={!showPassword}
                />
                <Input.Icon onPress={() => setShowPassword((prev) => !prev)}>
                  {({ fill, size }) =>
                    showPassword ? (
                      <Icon.EyeOff fill={fill} size={size} />
                    ) : (
                      <Icon.Eye fill={fill} size={size} />
                    )
                  }
                </Input.Icon>
              </Input.Base>
              <Input.Base size="sm">
                <Input.TextField
                  name="confirmPassword"
                  control={control}
                  placeholder="Confirmar Contraseña"
                  secureTextEntry={!showConfirmPassword}
                />
                <Input.Icon
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {({ fill, size }) =>
                    showConfirmPassword ? (
                      <Icon.EyeOff fill={fill} size={size} />
                    ) : (
                      <Icon.Eye fill={fill} size={size} />
                    )
                  }
                </Input.Icon>
              </Input.Base>
              <Button.Base
                color="success"
                className="mt-5"
                onPress={nextHandler}
              >
                <Button.Label center>Finalizar</Button.Label>
                <Button.Icon>
                  {({ fill, size }) => <Icon.Success fill={fill} size={size} />}
                </Button.Icon>
              </Button.Base>
            </View>
            <Image
              source="https://placehold.co/400"
              placeholder={{
                blurhash,
              }}
              contentFit="cover"
              style={{
                width: PixelRatio.getPixelSizeForLayoutSize(80),
                height: PixelRatio.getPixelSizeForLayoutSize(80),
                borderRadius: 9999,
              }}
              transition={1000}
            />
          </View>
        </View>
      </Input.ElevateOnKeyboard>
    </View>
  );
}
