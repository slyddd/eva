import { createContext, use } from "react";
import { Pressable, PressableProps, Text, TextProps } from "react-native";
import { BaseStyle, LabelStyle } from "./button.styles";
import { useThemeStore } from "../theme/theme.store";

type Colors = "primary" | "error" | "success";
type Size = "sm" | "md" | "lg";
type Radius = "sm" | "md" | "lg" | "full" | "none";

interface ButtonProps {
  color?: Colors;
  size?: Size;
}

interface GlobalProps {
  className?: string;
}

const propsButtonContext = createContext<ButtonProps | null>(null);

interface BaseProps extends ButtonProps, GlobalProps, PressableProps {
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  radius?: Radius;
}

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
  const combinedClassName = [
    "flex flex-row justify-between gap-2 items-center",
    "active:opacity-80 active:scale-95",
    BaseStyle.color[color],
    BaseStyle.size[size],
    BaseStyle.radius[radius],
    className,
    disabled ? "opacity-40" : "",
  ].join(" ");

  return (
    <propsButtonContext.Provider value={{ color, size }}>
      <Pressable
        className={combinedClassName}
        onPress={onClick}
        disabled={disabled}
        style={{
          boxShadow: [
            {
              offsetX: 0,
              offsetY: 3,
              blurRadius: 10,
              color: "rgba(0, 0, 0, 0.2)",
              spreadDistance: 1,
            },
          ],
        }}
        {...props}
      >
        {children}
      </Pressable>
    </propsButtonContext.Provider>
  );
}

interface LabelProps extends GlobalProps, TextProps {
  children?: React.ReactNode;
}

function Label({ className = "", children, ...props }: LabelProps) {
  const { color, size } = use(propsButtonContext)!;
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

interface IconChildrenProps {
  fill?: string;
  size?: number;
}

function Icon({
  children,
}: {
  children: (props: IconChildrenProps) => React.ReactNode;
}) {
  const { color, size } = use(propsButtonContext)!;
  const { colors } = useThemeStore();

  if (!colors || !color) {
    return null;
  }

  const colorCode =
    color === "primary" ? colors.background : colors[`${color}Text`];

  const iconProps: IconChildrenProps = {
    fill: colorCode,
    size: size === "sm" ? 16 : size === "md" ? 20 : 24,
  };

  return <>{children(iconProps)}</>;
}

export const Button = {
  Base,
  Label,
  Icon,
};
