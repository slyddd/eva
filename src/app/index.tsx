import { useThemeStore } from "@/ui/theme/theme.store";
import { Text, View } from "react-native";
import "@/global.css";
import { Button } from "@/ui/button/button";
import { InfoIcon } from "@/ui/icons/info";
import { Pill } from "@/ui/pill/pill";
import { useState } from "react";

export default function Index() {
  const { setMode, mode } = useThemeStore();
  const [test, setTest] = useState("test");

  return (
    <View className="flex flex-col justify-center items-center gap-10 flex-1">
      <Text className="bg-background text-foreground p-4 rounded-lg">
        {mode}
        Edit app/index.tsx to edit this screen.
      </Text>
      <View className="flex flex-row gap-4">
        <Button.Base onClick={() => setMode("dark")} color="success" size="lg">
          <Button.Label>Dark</Button.Label>
          <Button.Icon>
            {(props) => {
              return <InfoIcon {...props} />;
            }}
          </Button.Icon>
        </Button.Base>
        <Button.Base onClick={() => setMode("light")}>
          <Button.Icon>
            {(props) => {
              return <InfoIcon {...props} />;
            }}
          </Button.Icon>
          <Button.Label>Light</Button.Label>
        </Button.Base>
        <Button.Base onClick={() => setMode("system")} size="sm">
          <Button.Icon>
            {(props) => {
              return <InfoIcon {...props} />;
            }}
          </Button.Icon>
          <Button.Label>System</Button.Label>
        </Button.Base>
      </View>
      <View className="flex flex-row gap-4">
        <Pill.Base size="sm">
          <Pill.Icon>
            {(props) => {
              return <InfoIcon {...props} />;
            }}
          </Pill.Icon>
          <Pill.Label>No Selectable Pill</Pill.Label>
        </Pill.Base>
        <Pill.Base
          selectable
          onChange={(selected) => setTest(`Selected: ${selected}`)}
          size="sm"
        >
          <Pill.Icon>
            {(props) => {
              return <InfoIcon {...props} />;
            }}
          </Pill.Icon>
          <Pill.Label>Selectable Pill</Pill.Label>
        </Pill.Base>
      </View>
      <Text>prueba: {test}</Text>
    </View>
  );
}
