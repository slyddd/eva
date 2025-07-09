import { useThemeStore } from "@/ui/theme/theme.store";
import { Pressable, Text, View } from "react-native";
import "@/global.css";

export default function Index() {
  const { setMode, mode } = useThemeStore();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="bg-background text-foreground p-4 rounded-lg">
        {mode}
        Edit app/index.tsx to edit this screen.
      </Text>
      <Pressable onPress={() => setMode("dark")}>
        <Text className="text-blue-500">Dark</Text>
      </Pressable>
      <Pressable onPress={() => setMode("light")}>
        <Text className="text-blue-500">Light</Text>
      </Pressable>
      <Pressable onPress={() => setMode("system")}>
        <Text className="text-blue-500">System</Text>
      </Pressable>
    </View>
  );
}
