import { shadows } from '@ui/shadows';
import { useThemeStore } from '@ui/theme/theme.store';
import { MotiPressable } from 'moti/interactions';
import { ComponentProps } from 'react';
import { CardContext } from '../card.context';
import { DimensionValue, PixelRatio } from 'react-native';

interface CardBaseProps extends ComponentProps<typeof MotiPressable> {
  color?: 'surface' | 'error' | 'success';
  radius?: 'sm' | 'md' | 'lg' | 'full' | 'none';
  orientation?: 'horizontal' | 'vertical';
  width?: DimensionValue;
}

const cardRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  full: 9999,
  none: 0,
};

export function CardBase({
  color = 'surface',
  radius = 'md',
  orientation = 'horizontal',
  width = 100,
  ...props
}: CardBaseProps) {
  const { colors } = useThemeStore();

  if (typeof width === 'number') {
    width = PixelRatio.getPixelSizeForLayoutSize(width);
  }

  return (
    <CardContext.Provider value={{ radius, color }}>
      <MotiPressable
        style={{
          backgroundColor: colors[color],
          padding: 6,
          borderRadius: cardRadius[radius],
          flexDirection: orientation === 'horizontal' ? 'row' : 'column',
          width,
          ...shadows.normal,
        }}
        animate={({ pressed, hovered }) => {
          'worklet';
          const isPressed = pressed || hovered;

          return {
            opacity: props.onPress && isPressed ? 0.8 : 1,
            scale: props.onPress && isPressed ? 0.95 : 1,
          };
        }}
        {...props}
      >
        {props.children}
      </MotiPressable>
    </CardContext.Provider>
  );
}
