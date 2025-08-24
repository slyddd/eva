import { useAvatarBySex } from '@/hooks/useAvatarConfig';
import { Avatar } from '@ui/avatar';
import { ButtonBase, ButtonIcon, ButtonLabel } from '@ui/button';
import { Icon } from '@ui/icon';
import { useThemeStore } from '@ui/theme/theme.store';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { PixelRatio, Text, View } from 'react-native';

export default function ParticipantInfo() {
  const { participant } = useLocalSearchParams();
  const router = useRouter();

  const data = {
    name: 'John Doe',
    age: 30,
    sex: 'm',
    diseases: ['Diabetes', 'Hypertension'],
    tags: [
      { name: 'Diabetes', color: 'primary' },
      { name: 'Hypertension', color: 'error' },
    ],
  };
  const avatarConfig = useAvatarBySex(data.sex as 'h' | 'm');

  return (
    <View className="flex-1 items-center gap-10 p-4">
      <View className="items-center">
        <Avatar
          size={PixelRatio.getPixelSizeForLayoutSize(60)}
          {...avatarConfig}
          shape="rounded"
        />
        <Text className="text-xl font-bold text-foreground">{data.name}</Text>
      </View>
      <View className="flex-1">
        <View className="w-full flex-row items-center justify-between gap-4 p-4">
          <Text className="text-lg font-bold text-foreground">Información</Text>
          <ButtonBase size="sm">
            <ButtonIcon>{(props) => <Icon.Edit {...props} />}</ButtonIcon>
            <ButtonLabel>Editar</ButtonLabel>
          </ButtonBase>
        </View>
        <View className="gap-2">
          <View className="flex w-full flex-row items-center justify-between p-4">
            <Text className="text-sm text-foreground">Edad</Text>
            <Text className="text-sm text-foreground">{data.age}</Text>
          </View>
          <View className="flex w-full flex-row items-center justify-between p-4">
            <Text className="text-sm text-foreground">Genero</Text>
            <Text className="text-sm text-foreground">
              {data.sex === 'h' ? 'Hombre' : 'Mujer'}
            </Text>
          </View>
          <View className="flex w-full flex-row items-center justify-between p-4">
            <Text className="text-sm text-foreground">Enfermedades</Text>
            <Text className="text-sm text-foreground">
              {data.diseases.length > 0 ? data.diseases.join(', ') : 'Ninguna'}
            </Text>
          </View>
          <View className="flex w-full flex-row items-center justify-between p-4">
            <Text className="text-sm text-foreground">Tags</Text>
            <Text className="text-sm text-foreground">
              {data.tags.length > 0
                ? data.tags.map((tag) => tag.name).join(', ')
                : 'Ninguno'}
            </Text>
          </View>
        </View>
      </View>
      <View className="w-full flex-row items-center justify-between p-4">
        <ButtonBase>
          <ButtonLabel>Informe</ButtonLabel>
          <ButtonIcon>{(props) => <Icon.Download {...props} />}</ButtonIcon>
        </ButtonBase>
        <ButtonBase
          onPress={() => router.push(`/patients/${participant}/battery`)}
        >
          <ButtonLabel>Evaluar</ButtonLabel>
          <ButtonIcon>{(props) => <Icon.Exercise {...props} />}</ButtonIcon>
        </ButtonBase>
      </View>
    </View>
  );
}
