import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface PressAnimationProps {
  children: (animatedStyle: any) => React.ReactNode;
  onPress?: () => void;
}

export function PressAnimation({
  children,
  onPress = () => {},
}: PressAnimationProps) {
  const pressed = useSharedValue<boolean>(false);

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
      runOnJS(onPress)();
    });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: pressed.value ? 0.8 : 1,
    transform: [
      {
        scale: withSpring(pressed.value ? 0.85 : 1),
      },
    ],
  }));

  return (
    <GestureHandlerRootView
      style={{ display: "flex", width: "auto", height: "auto" }}
    >
      <GestureDetector gesture={tap}>{children(animatedStyle)}</GestureDetector>
    </GestureHandlerRootView>
  );
}
