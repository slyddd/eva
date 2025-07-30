import { useThemeStore } from '@ui/theme/theme.store';
import { MotiPressable } from 'moti/interactions';
import { ComponentProps, useEffect, useState } from 'react';
import { PixelRatio } from 'react-native';
import { PillContext } from '../pill.context';

/**
 * the props of PillBase
 * I omit the onpress prop of MotiPressable because that generates conflict
 * with my own onPress function that pass 'isSelected' param
 */
interface PillBaseProps
  extends Omit<ComponentProps<typeof MotiPressable>, 'onPress'> {
  selected?: boolean;
  disabled?: boolean;
  onPress?: (isSelected: boolean) => void;
  color?: 'primary' | 'error' | 'success' | 'surface' | 'background';
  size?: 'sm' | 'md' | 'lg';
  radius?: 'md' | 'lg' | 'full';
}

/**
 * * This values will be passed to PixelRatio, so can changes depending the personal
 * user configuration
 */
const pillHeightSizes = {
  sm: 18,
  md: 20,
  lg: 24,
};

// Base border radius values for the pill component
const pillRadius = {
  md: 8,
  lg: 12,
  full: 9999,
};

export function PillBase({
  color = 'primary',
  size = 'md',
  radius = 'md',
  selected = false,
  onPress,
  ...props
}: PillBaseProps) {
  const [state, setState] = useState(selected);
  const { colors } = useThemeStore();

  useEffect(() => {
    // Update the state when the selected prop changes
    // This ensures that the component reflects the latest selected state
    setState(selected);
  }, [selected]);

  return (
    <PillContext.Provider value={{ color, size, selected: state }}>
      <MotiPressable
        style={{
          height: PixelRatio.getPixelSizeForLayoutSize(pillHeightSizes[size]),
          width: 'auto',
          borderColor: colors[color],
          borderWidth: 1,
          borderRadius: pillRadius[radius],
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 2,
          display: 'flex',
          flexDirection: 'row',
          gap: 6,
        }}
        animate={({ hovered, pressed }) => {
          'worklet';
          const isPressed = pressed || hovered;
          const isDisabled = props.disabled || !onPress;

          return {
            opacity: props.disabled ? 0.5 : isPressed ? 0.8 : 1,
            scale: isPressed && !isDisabled ? 0.95 : 1,
            backgroundColor: state ? colors[color] : 'transparent',
          };
        }}
        onPress={() => {
          if (onPress && !props.disabled) {
            setState(!state);
            onPress(!state);
          }
        }}
        {...props}
      >
        {props.children}
      </MotiPressable>
    </PillContext.Provider>
  );
}
