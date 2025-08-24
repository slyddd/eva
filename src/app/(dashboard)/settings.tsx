import { Avatar } from '@ui/avatar';
import { ButtonBase, ButtonLabel } from '@ui/button';
import { Icon } from '@ui/icon';
import { InputBase, InputField, InputIcon } from '@ui/input';
import { PillBase, PillLabel } from '@ui/pill';
import { useThemeStore } from '@ui/theme/theme.store';
import { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { PixelRatio, ScrollView, Text, View } from 'react-native';

interface ShowPasswordState {
  oldPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
}
function togglePasswordVisibility(
  state: ShowPasswordState,
  field: keyof ShowPasswordState,
): ShowPasswordState {
  return {
    ...state,
    [field]: !state[field],
  };
}

export default function Settings() {
  const { mode, setMode } = useThemeStore();
  const { control, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useReducer(togglePasswordVisibility, {
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  return (
    <View className="flex-1 items-center justify-center">
      <ScrollView contentContainerClassName="gap-10 py-5">
        <View className="flex flex-col items-center gap-4">
          <Avatar
            size={PixelRatio.getPixelSizeForLayoutSize(60)}
            shape="rounded"
          />
          <Text className="text-2xl font-bold text-foreground">User</Text>
        </View>
        <View className="flex-1 items-center gap-10">
          <View className="items-center gap-4">
            <Text className="font-bold text-foreground">Tema</Text>
            <View className="flex-row gap-4">
              <PillBase
                selected={mode === 'system'}
                onPress={() => setMode('system')}
              >
                <PillLabel>Sistema</PillLabel>
              </PillBase>
              <PillBase
                selected={mode === 'light'}
                onPress={() => setMode('light')}
              >
                <PillLabel>Claro</PillLabel>
              </PillBase>
              <PillBase
                selected={mode === 'dark'}
                onPress={() => setMode('dark')}
              >
                <PillLabel>Oscuro</PillLabel>
              </PillBase>
            </View>
          </View>
          <View className="my-auto flex w-3/4 flex-col items-center gap-4">
            <Text className="font-bold text-foreground">
              Informacion de Cuenta
            </Text>
            <InputBase
              control={control}
              name="old-password"
              label="Contraseña Actual"
            >
              <InputField secureTextEntry={!showPassword.oldPassword} />
              <InputIcon onPress={() => setShowPassword('oldPassword')}>
                {(props) =>
                  showPassword.oldPassword ? (
                    <Icon.EyeOff {...props} />
                  ) : (
                    <Icon.Eye {...props} />
                  )
                }
              </InputIcon>
            </InputBase>
            <InputBase
              control={control}
              name="new-password"
              label="Nueva Contraseña"
            >
              <InputField secureTextEntry={!showPassword.newPassword} />
              <InputIcon onPress={() => setShowPassword('newPassword')}>
                {(props) =>
                  showPassword.newPassword ? (
                    <Icon.EyeOff {...props} />
                  ) : (
                    <Icon.Eye {...props} />
                  )
                }
              </InputIcon>
            </InputBase>
            <InputBase
              control={control}
              name="confirm-password"
              label="Confirmar Nueva Contraseña"
            >
              <InputField secureTextEntry={!showPassword.confirmPassword} />
              <InputIcon onPress={() => setShowPassword('confirmPassword')}>
                {(props) =>
                  showPassword.confirmPassword ? (
                    <Icon.EyeOff {...props} />
                  ) : (
                    <Icon.Eye {...props} />
                  )
                }
              </InputIcon>
            </InputBase>
            <View className="flex w-full flex-row flex-wrap items-center justify-between">
              <ButtonBase
                width={45}
                size="sm"
                color="primary"
                onPress={() => handleSubmit}
              >
                <ButtonLabel>Actualizar</ButtonLabel>
              </ButtonBase>
              <ButtonBase
                width={45}
                size="sm"
                color="error"
                onPress={() => console.log('Logout')}
              >
                <ButtonLabel>Cerrar Sesion</ButtonLabel>
              </ButtonBase>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
