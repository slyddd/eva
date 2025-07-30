import { useContext } from 'react';
import { SwitchContext } from '../switch.context';
import { PixelRatio } from 'react-native';
import { useThemeStore } from '@ui/theme/theme.store';

// interface for the SwitchIcon component props
interface SwitchIconProps {
  children: (props: { fill: string; size: number }) => React.ReactNode;
}

// This values will be passed to PixelRatio, so can change depending on the personal
// user configuration
// These sizes are used to scale the icon size based on the device's font scale.
const iconSizes = {
  sm: 10,
  md: 12,
  lg: 14,
};

export function SwitchIcon(props: SwitchIconProps) {
  const context = useContext(SwitchContext);
  const { colors } = useThemeStore();

  // Ensure the SwitchIcon is used like a child of SwitchBase
  if (!context) {
    console.warn('SwitchIcon must be used within SwitchBase');
    return null;
  }

  const { size = 'md', selected } = context;
  const iconSize = PixelRatio.getFontScale() * (iconSizes[size] || 16);
  const fill = selected ? colors.primary : colors.background;

  return <>{props.children({ fill, size: iconSize })}</>;
}
