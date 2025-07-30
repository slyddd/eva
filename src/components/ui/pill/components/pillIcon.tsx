import { useThemeStore } from '@ui/theme/theme.store';
import { useContext } from 'react';
import { PixelRatio } from 'react-native';
import { PillColor, PillContext } from '../pill.context';

// PillIcon component for rendering icons within a pill.
interface IconProps {
  children: (props: { fill: string; size: number }) => React.ReactNode;
}

/**
 * * This values will be passed to PixelRatio so his values can change
 */
const iconSizes = {
  sm: 10,
  md: 12,
  lg: 14,
};

/**
 * This function helps to obtain the icon color from the global theme based on the global pill color,
 * because the icon fill color cannot be set directly with the className prop.
 * @param color - The color of the pill.
 * @param state - The selected state of the pill.
 * @returns string - The color from the actual theme to be used for the icon fill.
 */
function getIconColor({ color, state }: { color: PillColor; state: boolean }) {
  const { colors } = useThemeStore();
  const selectedColors = {
    primary: colors.background,
    error: colors.errorText,
    success: colors.successText,
    surface: colors.foreground,
    background: colors.foreground,
  };

  const unSelectedColor = colors[color];
  const selectedColor = selectedColors[color];

  return state ? selectedColor : unSelectedColor;
}

export function PillIcon({ ...props }: IconProps) {
  const context = useContext(PillContext);

  // Ensure the PillIcon is used like a child of PillBase
  if (!context) {
    console.warn('PillIcon must be used within PillBase');
    return null;
  }

  const { size = 'md', color = 'primary', selected } = context;
  const iconSize = PixelRatio.getFontScale() * (iconSizes[size] || 16);
  const fill = getIconColor({ color, state: selected });

  return <>{props.children({ fill, size: iconSize })}</>;
}
