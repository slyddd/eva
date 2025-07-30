import { animations } from '@ui/animations';
import { shadows } from '@ui/shadows';
import { useThemeStore } from '@ui/theme/theme.store';
import { MotiPressable, MotiPressableInteractionProp } from 'moti/interactions';
import { ComponentProps, useCallback } from 'react';
import { DimensionValue, PixelRatio } from 'react-native';
import { ButonContext, ButtonContextProps } from '../button.context';

/**
 * Interface for the base button component props.
 * This interface extends the MotiPressable component props
 * and includes additional properties specific to the button.
 * @interface BaseProps
 */

interface BaseProps
  extends ComponentProps<typeof MotiPressable>,
    ButtonContextProps {
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: 'sm' | 'md' | 'lg' | 'full';
  hasShadow?: boolean;
  animate?: MotiPressableInteractionProp;
  hasAnimation?: boolean;
}

/**
 * * This values are passed to PixelRatio.getPixelSizeForLayoutSize
 * * to get a pixel size based on the mobile layout size.
 */
const baseSizes = {
  sm: { width: 40, height: 16 },
  md: { width: 48, height: 20 },
  lg: { width: 56, height: 24 },
};

// Base border radius values for the button component
const baseRadius = {
  sm: { borderRadius: 4 },
  md: { borderRadius: 8 },
  lg: { borderRadius: 12 },
  full: { borderRadius: 9999 },
};

function pressAnimation({
  hasAnimation,
  disabled,
}: {
  hasAnimation?: boolean;
  disabled?: boolean;
}) {
  return ({ hovered, pressed }: { hovered: boolean; pressed: boolean }) => {
    'worklet';
    const isPressed = pressed || hovered;
    return {
      opacity: disabled ? 0.5 : isPressed && hasAnimation ? 0.8 : 1,
      scale: isPressed && hasAnimation ? 0.85 : 1,
    };
  };
}

export function ButtonBase({
  size = 'md',
  radius = 'md',
  color = 'primary',
  width = baseSizes[size].width,
  height = baseSizes[size].height,
  hasShadow = true,
  hasAnimation = true,
  disabled = false,
  animate = pressAnimation({ hasAnimation, disabled }),
  ...props
}: BaseProps) {
  const { colors } = useThemeStore();

  if (typeof width === 'number') {
    width = PixelRatio.getPixelSizeForLayoutSize(width);
  }
  if (typeof height === 'number') {
    height = PixelRatio.getPixelSizeForLayoutSize(height);
  }

  props.style = [
    {
      backgroundColor: color === 'none' ? 'transparent' : colors[color],
      padding: 8,
      borderRadius: baseRadius[radius].borderRadius,
      width,
      height,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 8,
    },
    hasShadow && shadows.normal,
    props.style,
  ];

  return (
    <ButonContext.Provider value={{ size }}>
      <MotiPressable animate={animate} disabled={disabled} {...props}>
        {props.children}
      </MotiPressable>
    </ButonContext.Provider>
  );
}
