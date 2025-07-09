import { ThemeProvider } from "@/ui/theme/theme.provider";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  return (
    <ThemeProvider>
      <View className="flex-1 bg-black">
        <Stack />
      </View>
    </ThemeProvider>
  );
}
