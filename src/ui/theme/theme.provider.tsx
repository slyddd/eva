import { useEffect, useState } from "react";
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
  const [themeColors, setThemeColors] = useState<Record<string, string>>(
    vars({}),
  );

  useEffect(() => {
    const currentMode = mode === "system" ? (colorScheme ?? "light") : mode;
    setColors(colors[currentMode]);
    setThemeColors(vars(colorsVars[currentMode]));
  }, [mode, colorScheme, setColors]);

  return (
    <View className="w-full h-full" style={themeColors}>
      {children}
    </View>
  );
}
