/*
  This component is used only in the SwitchBase component.
  I not recoment to use it outside of the SwitchBase component, and it is not exported in the index file.
  It is used to render the pill that moves when the switch is toggled.
*/

import { useThemeStore } from '@ui/theme/theme.store';
import { MotiView } from 'moti';
import { useContext } from 'react';
import { PixelRatio } from 'react-native';
import { SwitchContext } from '../switch.context';

// This values will be passed to PixelRatio, so can change depending on the personal
// user configuration
const switchPillSizes = {
  sm: 10,
  md: 12,
  lg: 14,
};

// Base border radius values for the switch pill component
// Uses the formula 'Base radius - padding/2' to adjust the radius
const switchPillRadius = {
  sm: 4 - 6 / 2,
  md: 8 - 6 / 2,
  lg: 12 - 6 / 2,
  full: 9999,
};

export function SwitchPill(props: { children: React.ReactNode }) {
  const context = useContext(SwitchContext);
  const { colors } = useThemeStore();

  // Ensure the SwitchPill is used like a child of SwitchBase
  if (!context) {
    console.warn('SwitchPill must be used within SwitchBase');
    return null;
  }

  const { selected, size, radius } = context;

  return (
    <MotiView
      animate={{
        transform: [
          {
            translateX: selected
              ? PixelRatio.getPixelSizeForLayoutSize(switchPillSizes[size]) + 7
              : 0,
          },
        ],
      }}
      style={{
        width: PixelRatio.getPixelSizeForLayoutSize(switchPillSizes[size]),
        height: PixelRatio.getPixelSizeForLayoutSize(switchPillSizes[size]),
        borderRadius: switchPillRadius[radius],
        backgroundColor: selected ? colors.background : colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {props.children}
    </MotiView>
  );
}
