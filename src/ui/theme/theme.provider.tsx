import { useEffect } from 'react';
import { View } from 'react-native';
import { useColorScheme, vars } from 'nativewind';
import { colors, colorsVars, gradients } from './colors';
import { useThemeStore } from './theme.store';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { setColors, mode, setGradients } = useThemeStore();
  const { colorScheme } = useColorScheme();

  const currentMode = mode === 'system' ? (colorScheme ?? 'light') : mode;
  const themeColors = vars(colorsVars[currentMode]);

  useEffect(() => {
    setColors(colors[currentMode]);
    setGradients(gradients[currentMode]);
  }, [mode, colorScheme, setColors, currentMode]);

  return (
    <View className="h-full w-full" style={themeColors}>
      {children}
    </View>
  );
}
