import {
  MotiPressableInteractionProp,
  useMotiPressable,
} from 'moti/interactions';
import { useContext } from 'react';
import { ButonContext, ButtonColor } from '../button.context';
import { useThemeStore } from '../../theme/theme.store';
import { PixelRatio } from 'react-native';
import { MotiView } from 'moti';

/**
 * ButtonIcon component for rendering icons within a button.
 * It uses Moti for animations and supports different sizes and colors.
 */
interface IconProps {
  children: (props: { fill?: string; size?: number }) => React.ReactNode;
  animate?: MotiPressableInteractionProp;
}

/**
 * This helps me to obtain easily the icon color from the global theme based on the global button color.
 * because the icon fill color cannot be set directly with the className prop.
 * @param color
 * @returns string - The color from the actual theme to be used for the icon fill.
 */
function getIconColor(color: ButtonColor) {
  const { colors } = useThemeStore();
  const iconColors = {
    primary: colors.background,
    none: colors.foreground,
    error: colors.errorText,
    success: colors.successText,
  };

  return iconColors[color] || colors.foreground;
}

/**
 * * This values will be used with PixelRatio to scale the icon size
 * * based on the device's font scale. Using PixelRatio.getFontScale() * iconSizes[size]
 * * allows the icon to adapt to different screen sizes and resolutions.
 */
const iconSizes = {
  sm: 14,
  md: 16,
  lg: 20,
};

export function ButtonIcon({
  animate = () => {
    'worklet';
    return {};
  },
  ...props
}: IconProps) {
  const state = useMotiPressable(animate);
  const context = useContext(ButonContext);

  // Ensure the ButtonIcon is used like a child of ButtonBase
  if (!context) {
    console.warn('ButtonIcon must be used inside a ButtonBase');
    return null;
  }

  const { size = 'md', color = 'primary' } = context;
  const iconSize = PixelRatio.getFontScale() * (iconSizes[size] || 16);
  const fill = getIconColor(color);

  return (
    <MotiView state={state} className="items-center justify-center">
      {props.children({ fill, size: iconSize })}
    </MotiView>
  );
}
