import { useEffect } from "react";
import { View } from "react-native";
import { useColorScheme, vars } from "nativewind";
import { colors, colorsVars } from "./colors";
import { useThemeStore } from "./theme.store";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { setColors, mode } = useThemeStore();
  const { colorScheme } = useColorScheme();

  const currentMode = mode === "system" ? (colorScheme ?? "light") : mode;
  const themeColors = vars(colorsVars[currentMode]);

  useEffect(() => {
    setColors(colors[currentMode]);
  }, [mode, colorScheme, setColors, currentMode]);

  return (
    <View className="w-full h-full" style={themeColors}>
      {children}
    </View>
  );
}
