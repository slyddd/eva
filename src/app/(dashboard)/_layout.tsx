import { Button } from '@ui/button';
import { Icon } from '@ui/icon';
import { shadows } from '@ui/shadows';
import { Href, useRouter } from 'expo-router';
import {
  TabList,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from 'expo-router/ui';
import { forwardRef, PropsWithChildren, ReactNode } from 'react';
import { PixelRatio, SafeAreaView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1"
      style={{ paddingBottom: insets.bottom, paddingTop: insets.top }}
    >
      <Tabs>
        <TabSlot />
        <TabList
          style={{
            borderRadius: PixelRatio.getPixelSizeForLayoutSize(5),
            padding: PixelRatio.getPixelSizeForLayoutSize(5),
            ...shadows.normal,
          }}
          className="mx-5 mb-5 bg-surface"
        >
          <TabTrigger name="home" href="/dashboard" asChild>
            <CustomTabButton icon={(props) => <Icon.Home {...props} />}>
              Inicio
            </CustomTabButton>
          </TabTrigger>
          <TabTrigger name="search" href="/stats" asChild>
            <CustomTabButton icon={(props) => <Icon.Stats {...props} />}>
              Informe
            </CustomTabButton>
          </TabTrigger>
          <TabTrigger name="settings" href="/settings" asChild>
            <CustomTabButton icon={(props) => <Icon.Settings {...props} />}>
              Ajustes
            </CustomTabButton>
          </TabTrigger>
        </TabList>
      </Tabs>
    </View>
  );
}

interface CustomTabButtonProps extends PropsWithChildren, TabTriggerSlotProps {
  icon: (props: { size?: number; fill?: string }) => ReactNode;
}

export const CustomTabButton = forwardRef<View, CustomTabButtonProps>(
  (props, ref) => {
    const router = useRouter();
    return (
      <Button.Base
        ref={ref}
        shadow={false}
        color={props.isFocused ? 'primary' : 'none'}
        radius="none"
        size="sm"
        onPress={() => {
          if (props.href) {
            router.push(props.href as Href);
          }
        }}
        style={{
          borderRadius: PixelRatio.getPixelSizeForLayoutSize(6),
          overflow: 'hidden',
          transitionProperty: 'transform, opacity',
        }}
        animation={({ hovered, pressed }) => {
          'worklet';
          return {
            opacity: hovered || pressed ? 0.8 : 1,
            scale: hovered || pressed ? 0.85 : 1,
            scaleX: props.isFocused ? 1.1 : 1,
          };
        }}
      >
        <Button.Icon>{props.icon}</Button.Icon>
        {props.isFocused && <Button.Label>{props.children}</Button.Label>}
      </Button.Base>
    );
  },
);
