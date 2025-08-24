import { ButtonBase, ButtonIcon, ButtonLabel } from '@ui/button';
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
import { PixelRatio, View } from 'react-native';

export default function TabsLayout() {
  return (
    <View className="flex-1">
      <Tabs>
        <TabSlot />
        <TabList
          style={{
            borderRadius: 17,
            padding: 15,
            paddingVertical: 10,
            ...shadows.normal,
          }}
          className="mx-5 mb-5 bg-surface"
        >
          <TabTrigger name="home" href="/" asChild>
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
      <ButtonBase
        ref={ref}
        hasShadow={false}
        color={props.isFocused ? 'primary' : 'none'}
        size="sm"
        onPress={() => {
          if (props.href) {
            router.push(props.href as Href);
          }
        }}
        animate={({ hovered, pressed }) => {
          'worklet';
          return {
            opacity: hovered || pressed ? 0.8 : 1,
            scale: hovered || pressed ? 0.85 : 1,
            scaleX: props.isFocused ? 1.1 : 1,
          };
        }}
      >
        <ButtonIcon>{props.icon}</ButtonIcon>
        {props.isFocused && <ButtonLabel>{props.children}</ButtonLabel>}
      </ButtonBase>
    );
  },
);
