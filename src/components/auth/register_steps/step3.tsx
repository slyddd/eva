import { animations } from '@ui/animations';
import { Avatar, genConfig } from '@ui/avatar';
import { ButtonBase, ButtonIcon, ButtonLabel } from '@ui/button';
import { Icon } from '@ui/icon';
import { InputBase, InputField } from '@ui/input';
import { SwitchBase, SwitchIcon } from '@ui/switch';
import { useForm } from 'react-hook-form';
import { PixelRatio, Text, View } from 'react-native';
import { StepType } from './step.type';
import { useRegisterStore } from '../stores/register.store';

export function RegisterStep3({ nextHandler }: StepType) {
  const { control, handleSubmit } = useForm();
  const { genre, setGenre, avatar, setAvatar, setUserName } =
    useRegisterStore();

  // Toggle sex and update avatar
  const handleSexToggle = () => {
    const newSex = genre === 'man' ? 'woman' : 'man';
    setGenre(newSex);
    setAvatar(
      genConfig({
        hatStyle: 'none',
        sex: newSex,
      }),
    );
  };

  // Refresh avatar
  const handleAvatarRefresh = () => {
    setAvatar(
      genConfig({
        hatStyle: 'none',
        sex: genre,
      }),
    );
  };

  const onSubmit = (data: any) => {
    setUserName(data.username);
    nextHandler();
  };

  return (
    <View className="w-full flex-1 items-center justify-center pb-5">
      <View className="flex w-3/4 flex-1 flex-col items-center justify-center gap-6">
        <Text className="text-center text-lg text-foreground">
          ¿Como quieres que te llamemos?
        </Text>
        <InputBase
          label="Nombre de usuario"
          size="sm"
          control={control}
          name="username"
        >
          <InputField />
        </InputBase>
        <Text className="text-center text-lg text-foreground">
          Escoje tu genero
        </Text>
        <View className="flex flex-row items-center justify-center gap-2">
          <SwitchBase
            label={['Masculino', 'Femenino']}
            onPress={handleSexToggle}
          >
            <SwitchIcon>
              {({ fill, size, state }) =>
                state ? (
                  <Icon.Female fill={fill} size={size} />
                ) : (
                  <Icon.Male fill={fill} size={size} />
                )
              }
            </SwitchIcon>
          </SwitchBase>
        </View>
        <Text className="text-center text-lg text-foreground">
          Escoje tu avatar
        </Text>
        <View className="flex w-fit items-center justify-center">
          <Avatar size={PixelRatio.getPixelSizeForLayoutSize(60)} {...avatar} />
          <View className="-mt-10 ml-auto flex flex-row items-center justify-end gap-4">
            <ButtonBase width="auto" size="sm" onPress={handleAvatarRefresh}>
              <ButtonIcon animate={animations.reload}>
                {({ fill, size }) => <Icon.Refresh fill={fill} size={size} />}
              </ButtonIcon>
            </ButtonBase>
          </View>
        </View>
      </View>
      <ButtonBase onPress={handleSubmit(onSubmit)}>
        <ButtonLabel>Siguiente</ButtonLabel>
        <ButtonIcon>
          {({ fill, size }) => <Icon.Right fill={fill} size={size} />}
        </ButtonIcon>
      </ButtonBase>
    </View>
  );
}
