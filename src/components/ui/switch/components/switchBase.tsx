import { useThemeStore } from '@ui/theme/theme.store';
import clsx from 'clsx';
import { MotiPressable } from 'moti/interactions';
import { ComponentProps, useState } from 'react';
import { PixelRatio, Text, View } from 'react-native';
import { SwitchContext } from '../switch.context';
import { SwitchPill } from './switchPill';

/**
 * /**
 * Interface for the base switch component props.
 * This interface extends the MotiPressable component props
 * and includes additional properties specific to the switch.
 * @interface SwitchBaseProps
 */
interface SwitchBaseProps
  extends Omit<ComponentProps<typeof MotiPressable>, 'onPress'> {
  size?: 'sm' | 'md' | 'lg';
  radius?: 'sm' | 'md' | 'lg' | 'full';
  disabled?: boolean;
  onPress: (isSelected: boolean) => void;
  children?: React.ReactNode;
  label?: [string, string];
}

/**
 * * This values will be passed to PixelRatio, so can changes depending the personal
 * user configuration
 */
const switchSizes = {
  sm: { width: 30, height: 18 },
  md: { width: 34, height: 20 },
  lg: { width: 38, height: 24 },
};

// Base border radius values for the pill component
const switchRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  full: 9999,
};

// Base label sizes for the switch component
const labelSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function SwitchBase({
  size = 'md',
  radius = 'md',
  onPress,
  ...props
}: SwitchBaseProps) {
  const { colors } = useThemeStore();
  const [state, setState] = useState(false);

  return (
    <SwitchContext.Provider value={{ size, radius, selected: state }}>
      <View className="flex h-fit w-fit flex-row items-center justify-center gap-2">
        {props.label && (
          <Text
            className={clsx(
              'font-semibold',
              labelSizes[size],
              !state ? 'text-primary' : 'text-foreground',
            )}
          >
            {props.label?.[0]}
          </Text>
        )}
        <MotiPressable
          style={{
            height: PixelRatio.getPixelSizeForLayoutSize(
              switchSizes[size].height,
            ),
            width: PixelRatio.getPixelSizeForLayoutSize(
              switchSizes[size].width,
            ),
            borderColor: colors.primary,
            borderWidth: 1,
            borderRadius: switchRadius[radius],
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 6,
            display: 'flex',
            flexDirection: 'row',
            gap: 6,
          }}
          animate={({ hovered, pressed }) => {
            'worklet';
            const isPressed = pressed || hovered;

            return {
              opacity: props.disabled ? 0.5 : isPressed ? 0.8 : 1,
              scale: isPressed && !props.disabled ? 0.95 : 1,
              backgroundColor: state ? colors.primary : 'transparent',
            };
          }}
          onPress={() => {
            if (!props.disabled) {
              setState(!state);
              onPress(!state);
            }
          }}
          {...props}
        >
          <SwitchPill>{props.children}</SwitchPill>
        </MotiPressable>
        {props.label && (
          <Text
            className={clsx(
              'font-semibold',
              labelSizes[size],
              state ? 'text-primary' : 'text-foreground',
            )}
          >
            {props.label?.[1]}
          </Text>
        )}
      </View>
    </SwitchContext.Provider>
  );
}
