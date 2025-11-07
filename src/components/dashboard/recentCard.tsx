import { useAvatarBySex } from '@/hooks/useAvatarConfig';
import { Avatar } from '@ui/avatar';
import { CardBase, CardContent, CardHeader, CardTitle } from '@ui/card';
import { useRouter } from 'expo-router';
import { PixelRatio } from 'react-native';

interface RecentCardProps {
  id: string;
  name: string;
  sex: 'man' | 'woman';
}

export function RecentCard({ id, name, sex }: RecentCardProps) {
  const router = useRouter();
  const avatarConfig = useAvatarBySex(sex);

  return (
    <CardBase onPress={() => router.push(`/patients/${id}`)}>
      <Avatar
        size={PixelRatio.getPixelSizeForLayoutSize(20)}
        shape="rounded"
        {...avatarConfig}
        hairColorRandom
        isGradient
      />
      <CardContent>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
      </CardContent>
    </CardBase>
  );
}
