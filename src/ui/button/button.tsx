import { PressAnimation } from "@UI/animations/press";
import { useThemeStore } from "@UI/theme/theme.store";
import { createContext, use } from "react";
import { PressableProps, Text, TextProps } from "react-native";
import Animated from "react-native-reanimated";
import { BaseStyle, LabelStyle } from "./button.styles";

/**
 * Button color options.
 */
type Colors = "primary" | "error" | "success";

/**
 * Button size options.
 */
type Size = "sm" | "md" | "lg";

/**
 * Button border radius options.
 */
type Radius = "sm" | "md" | "lg" | "full" | "none";

/**
 * Props shared by all button components.
 */
interface ButtonProps {
  color?: Colors;
  size?: Size;
}

/**
 * Props for global styling.
 */
interface GlobalProps {
  className?: string;
}

/**
 * Context to provide button color and size to children.
 */
const ButtonContext = createContext<ButtonProps | null>(null);

/**
 * Props for the Base button component.
 */
interface BaseProps extends ButtonProps, GlobalProps, PressableProps {
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  radius?: Radius;
}

/**
 * Base button component.
 * Handles press animation, styling, and disabled state.
 */
function Base({
  color = "primary",
  size = "md",
  radius = "md",
  className = "",
  onClick,
  children,
  disabled = false,
  ...props
}: BaseProps) {
  // Combine all class names for styling.
  const combinedClassName = [
    "flex flex-row justify-between gap-2 items-center",
    BaseStyle.color[color],
    BaseStyle.size[size],
    BaseStyle.radius[radius],
    disabled ? "opacity-40" : "",
    className,
  ].join(" ");

  return (
    <ButtonContext.Provider value={{ color, size }}>
      <PressAnimation
        onPress={() => {
          if (disabled || !onClick) return;
          onClick();
        }}
      >
        {(animatedStyle) => (
          <Animated.View
            className={combinedClassName}
            aria-disabled={disabled}
            style={
              [
                animatedStyle,
                {
                  boxShadow: [
                    {
                      offsetX: 0,
                      offsetY: 3,
                      blurRadius: 10,
                      color: "rgba(0, 0, 0, 0.2)",
                      spreadDistance: 1,
                    },
                  ],
                },
              ] as any
            }
            {...props}
          >
            {children}
          </Animated.View>
        )}
      </PressAnimation>
    </ButtonContext.Provider>
  );
}

/**
 * Props for the Label component.
 */
interface LabelProps extends GlobalProps, TextProps {
  children?: React.ReactNode;
}

/**
 * Label component for button text.
 * Applies color and size from context.
 */
function Label({ className = "", children, ...props }: LabelProps) {
  const { color, size } = use(ButtonContext)!;
  const combinedClassName = [
    "font-bold",
    LabelStyle.color[color!],
    LabelStyle.size[size!],
    className,
  ].join(" ");

  return (
    <Text className={combinedClassName} {...props}>
      {children || "Button"}
    </Text>
  );
}

/**
 * Props for icon children.
 */
interface IconChildrenProps {
  fill?: string;
  size?: number;
}

/**
 * Icon component for button.
 * Passes fill color and size to icon children based on context and theme.
 */
function Icon({
  children,
}: {
  children: (props: IconChildrenProps) => React.ReactNode;
}) {
  const { color, size } = use(ButtonContext)!;
  const { colors } = useThemeStore();

  if (!colors || !color) {
    return null;
  }

  // Determine icon color based on button color.
  const colorCode =
    color === "primary" ? colors.background : colors[`${color}Text`];

  // Determine icon size based on button size.
  const iconProps: IconChildrenProps = {
    fill: colorCode,
    size: size === "sm" ? 16 : size === "md" ? 20 : 24,
  };

  return <>{children(iconProps)}</>;
}

/**
 * Button component exports.
 */
export const Button = {
  Base,
  Label,
  Icon,
};
