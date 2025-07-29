import Avatar from '@/ui/avatar';
import { Button } from '@/ui/button';
import { Icon } from '@/ui/icon';
import { Input } from '@/ui/input/input';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

export default function Dashboard() {
  const { control } = useForm();
  return (
    <View className="flex-1 items-center gap-4 p-4">
      <View className="flex w-full flex-row items-center justify-start">
        <Avatar size={40} />
        <View className="ml-2 flex flex-col items-start justify-center">
          <Text className="text-lg font-bold text-foreground">User</Text>
          <Text className="text-sm text-foreground/60">
            0 pacientes registrados
          </Text>
        </View>
      </View>
      <View className="flex flex-row gap-5">
        <Input.Base className="w-fit flex-1">
          <Input.TextField
            name="search"
            control={control}
            placeholder="Buscar pacientes"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Input.Base>
        <Button.Base
          style={{
            flex: 1,
          }}
        >
          <Button.Icon>
            {({ fill, size }) => <Icon.Info fill={fill} size={size} />}
          </Button.Icon>
        </Button.Base>
      </View>
      <Text>recent</Text>
      <Text>users</Text>
    </View>
  );
}
