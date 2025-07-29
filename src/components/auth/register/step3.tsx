import { Button } from '@ui/button';
import { Icon } from '@ui/icon';
import { PixelRatio, Text, View } from 'react-native';
import { StepType } from './step.type';
import { useForm } from 'react-hook-form';
import { Input } from '@ui/input/input';
import Avatar, { genConfig } from '@ui/avatar';
import { useState } from 'react';
import { Switch } from '@ui/switch';
import { animations } from '@ui/animations';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function RegisterStep3({ nextHandler }: StepType) {
  const insets = useSafeAreaInsets();
  const { control } = useForm();
  const [sex, setSex] = useState<'man' | 'woman'>('man');
  const [avatar, setAvatar] = useState(
    genConfig({
      hatStyle: 'none',
      sex,
    }),
  );

  // Toggle sex and update avatar
  const handleSexToggle = () => {
    const newSex = sex === 'man' ? 'woman' : 'man';
    setSex(newSex);
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
        sex,
      }),
    );
  };

  return (
    <View
      className="w-full flex-1 items-center justify-center"
      style={{
        paddingBottom: insets.bottom + 20,
        paddingTop: insets.top,
      }}
    >
      <View className="flex w-3/4 flex-1 flex-col items-center justify-center gap-6">
        <Text className="text-center text-lg text-foreground">
          ¿Como quieres que te llamemos?
        </Text>
        <Input.Base size="sm">
          <Input.TextField
            name="username"
            control={control}
            placeholder="Nombre de Usuario"
          />
        </Input.Base>
        <Text className="text-center text-lg text-foreground">
          Escoje tu genero
        </Text>
        <View className="flex flex-row items-center justify-center gap-2">
          <Text
            className={`text-sm ${sex === 'man' ? 'text-primary' : 'text-foreground'}`}
          >
            Masculino
          </Text>
          <Switch.Base onPress={handleSexToggle}>
            <Switch.Icon>
              {({ fill, size }) =>
                sex === 'woman' ? (
                  <Icon.Female fill={fill} size={size} />
                ) : (
                  <Icon.Male fill={fill} size={size} />
                )
              }
            </Switch.Icon>
          </Switch.Base>
          <Text
            className={`text-sm ${sex === 'woman' ? 'text-primary' : 'text-foreground'}`}
          >
            Femenino
          </Text>
        </View>
        <Text className="text-center text-lg text-foreground">
          Escoje tu avatar
        </Text>
        <View className="flex w-fit items-center justify-center">
          <Avatar size={PixelRatio.getPixelSizeForLayoutSize(60)} {...avatar} />
          <View className="-mt-10 ml-auto flex flex-row items-center justify-end gap-4">
            <Button.Base size="sm" onPress={handleAvatarRefresh}>
              <Button.Icon animation={animations.reload}>
                {({ fill, size }) => <Icon.Refresh fill={fill} size={size} />}
              </Button.Icon>
            </Button.Base>
          </View>
        </View>
      </View>
      <Button.Base onPress={nextHandler}>
        <Button.Label>Siguiente</Button.Label>
        <Button.Icon>
          {({ fill, size }) => <Icon.Right fill={fill} size={size} />}
        </Button.Icon>
      </Button.Base>
    </View>
  );
}
