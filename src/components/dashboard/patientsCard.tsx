import { useAvatarBySex } from '@/hooks/useAvatarConfig';
import { Avatar } from '@ui/avatar';
import {
  CardBase,
  CardContent,
  CardHeader,
  CardInfo,
  CardTitle,
} from '@ui/card';
import { Icon } from '@ui/icon';
import { PillColor } from '@ui/pill/pill.context';
import { useRouter } from 'expo-router';
import { PixelRatio, Text } from 'react-native';

interface RecentCardProps {
  id: string;
  name: string;
  sex: 'man' | 'woman';
  age: number;
  tags?: { name: string; color: PillColor }[];
}

export function PatientsCard({ id, name, sex, age, tags }: RecentCardProps) {
  const avatarConfig = useAvatarBySex(sex);
  const router = useRouter();

  return (
    <CardBase
      style={{ width: '100%' }}
      hasShadow={false}
      onPress={() => router.push(`/patients/${id}`)}
    >
      <Avatar
        size={PixelRatio.getPixelSizeForLayoutSize(30)}
        shape="rounded"
        {...avatarConfig}
        hairColorRandom
      />
      <CardContent>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardInfo>
            {({ fill, size }) => (
              <>
                <Text style={{ color: fill, fontSize: size }}>
                  {age} años -
                </Text>
                {sex === 'man' ? (
                  <Icon.Male fill={fill} size={size} />
                ) : (
                  <Icon.Female fill={fill} size={size} />
                )}
              </>
            )}
          </CardInfo>
        </CardHeader>
        {/* TODO: Add the tags of participants with Pill   */}
      </CardContent>
    </CardBase>
  );
}
