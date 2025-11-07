import { ButtonBase, ButtonIcon, ButtonLabel } from '@ui/button';
import { Icon } from '@ui/icon';
import { ElevateOnKeyboard, InputBase, InputField, InputIcon } from '@ui/input';
import { Image } from 'expo-image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PixelRatio, Text, View } from 'react-native';
import { StepType } from './step.type';
import { useRegisterStore } from '../stores/register.store';
import bcrypt from 'bcrypt-react-native';

export function RegisterStep4({ nextHandler }: StepType) {
  const blurhash = 'L5H?@-?b00%M~qj[ayj[ayj[ayj['; //TODO: Replace with img blur hash
  const { control, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setPassword } = useRegisterStore();

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const salt = await bcrypt.getSalt(10);
      const hash = await bcrypt.hash(salt, data.password);

      setPassword(hash);
      nextHandler();
    } catch (e) {
      console.log({ e });
    }
  };

  return (
    <View className="w-full flex-1">
      <ElevateOnKeyboard>
        <View className="w-full flex-1 items-center justify-center">
          <View className="flex w-1/2 flex-1 flex-col items-center justify-center gap-8">
            <Text className="text-center text-lg font-bold text-foreground">
              Crea una contraseña para ingresar a la aplicación
            </Text>
            <View className="flex w-full flex-col items-end justify-between gap-4">
              <InputBase
                label="Contraseña"
                size="sm"
                control={control}
                name="password"
              >
                <InputField secureTextEntry={!showPassword} />
                <InputIcon onPress={() => setShowPassword((prev) => !prev)}>
                  {({ fill, size }) =>
                    showPassword ? (
                      <Icon.EyeOff fill={fill} size={size} />
                    ) : (
                      <Icon.Eye fill={fill} size={size} />
                    )
                  }
                </InputIcon>
              </InputBase>
              <InputBase
                label="Confirmar Contraseña"
                size="sm"
                control={control}
                name="confirmPassword"
              >
                <InputField secureTextEntry={!showConfirmPassword} />
                <InputIcon
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {({ fill, size }) =>
                    showConfirmPassword ? (
                      <Icon.EyeOff fill={fill} size={size} />
                    ) : (
                      <Icon.Eye fill={fill} size={size} />
                    )
                  }
                </InputIcon>
              </InputBase>
              <ButtonBase color="success" onPress={handleSubmit(onSubmit)}>
                <ButtonLabel>Finalizar</ButtonLabel>
                <ButtonIcon>
                  {({ fill, size }) => <Icon.Success fill={fill} size={size} />}
                </ButtonIcon>
              </ButtonBase>
            </View>
          </View>
        </View>
      </ElevateOnKeyboard>
    </View>
  );
}
