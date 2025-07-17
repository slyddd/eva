import { useThemeStore } from '@/ui/theme/theme.store';
import { Text, View } from 'react-native';
import '@/global.css';
import { Button } from '@/ui/button/button';
import { InfoIcon } from '@/ui/icons/info';
import { Pill } from '@/ui/pill/pill';
import { useState } from 'react';
import { Input } from '@/ui/input/input';
import { useForm } from 'react-hook-form';

export default function Index() {
  const { setMode, mode } = useThemeStore();
  const [test, setTest] = useState('test');
  const { control } = useForm();
  const [password, setPassword] = useState(false);

  return (
    <View className="flex flex-1 flex-col items-center justify-center gap-10">
      <Text className="rounded-lg bg-background p-4 text-foreground">
        {mode}
        Edit app/index.tsx to edit this screen.
      </Text>
      <View className="flex flex-row gap-4">
        <Button.Base onClick={() => setMode('dark')} color="primary" size="md">
          <Button.Label>Dark</Button.Label>
          <Button.Icon>
            {(props) => {
              return <InfoIcon {...props} />;
            }}
          </Button.Icon>
        </Button.Base>
        <Button.Base onClick={() => setMode('light')}>
          <Button.Icon>
            {(props) => {
              return <InfoIcon {...props} />;
            }}
          </Button.Icon>
          <Button.Label>Light</Button.Label>
        </Button.Base>
        <Button.Base onClick={() => setMode('system')} size="sm">
          <Button.Icon>
            {(props) => {
              return <InfoIcon {...props} />;
            }}
          </Button.Icon>
          <Button.Label>System</Button.Label>
        </Button.Base>
      </View>
      <View className="flex flex-row gap-4">
        <Pill.Base selectable size="sm">
          <Pill.Icon>
            {(props) => {
              return <InfoIcon {...props} />;
            }}
          </Pill.Icon>
          <Pill.Label>No Selectable Pill</Pill.Label>
        </Pill.Base>
        <Pill.Base
          selectable
          onChange={(selected) => setTest(`Selected: ${selected}`)}
          size="sm"
        >
          <Pill.Icon>
            {(props) => {
              return <InfoIcon {...props} />;
            }}
          </Pill.Icon>
          <Pill.Label>Selectable Pill</Pill.Label>
        </Pill.Base>
      </View>
      <Text>
        prueba: {test} {password ? 'true' : 'false'}
      </Text>
      <Input.Base>
        <Input.TextField
          name="test"
          control={control}
          placeholder="Test Input"
          className="w-64"
          secureTextEntry={!password}
        />
        <Input.Icon onPress={() => setPassword(!password)}>
          {(props) => <InfoIcon {...props} />}
        </Input.Icon>
      </Input.Base>
    </View>
  );
}
