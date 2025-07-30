import { useThemeStore } from '@ui/theme/theme.store';
import { useContext } from 'react';
import { ActivityIndicator, PixelRatio } from 'react-native';
import { ButonContext, ButtonColor } from '../button.context';

interface ButtonSpinnerProps {
  isLoading?: boolean;
}

/**
 * This helps me to obtain easily the spinner color from the global theme based on the global button color.
 * because the Activity indicator color cannot be set directly with the className prop.
 * @param color
 * @returns string - The color from the actual theme to be used for the icon fill.
 */
function getLoadingColor(color: ButtonColor) {
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
 * * This values will be used with PixelRatio to scale the loading size
 * * based on the device's font scale. Using PixelRatio.getFontScale() * iconSizes[size]
 * * allows the spinner to adapt to different screen sizes and resolutions.
 */
const loadingSizes = {
  sm: 14,
  md: 16,
  lg: 20,
};

export function ButtonSpinner({ isLoading = true }: ButtonSpinnerProps) {
  const context = useContext(ButonContext);

  // Ensure that the ButtonSpinner is used like a child of Button component
  if (!context) {
    console.warn('ButtonSpinner must be used within a Button context');
    return null;
  }

  const { size = 'md', color = 'primary' } = context;
  const spinnerSize = PixelRatio.getFontScale() * (loadingSizes[size] || 16);
  const spinerColor = getLoadingColor(color);

  return (
    <>
      {isLoading && (
        <ActivityIndicator size={spinnerSize} color={spinerColor} />
      )}
    </>
  );
}
