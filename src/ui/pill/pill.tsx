import { createContext, use, useState } from "react";
import { Pressable, PressableProps, Text, TextProps } from "react-native";
import { BaseStyle, LabelStyle } from "./pill.styles";
import { useThemeStore } from "../theme/theme.store";

type Size = "sm" | "md" | "lg";

interface ButtonProps {
  size?: Size;
  selected?: boolean;
}

interface GlobalProps {
  className?: string;
}

const propsButtonContext = createContext<ButtonProps | null>(null);

interface BaseProps extends ButtonProps, GlobalProps, PressableProps {
  onSelect?: (selected: boolean) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  selectable?: boolean;
}

function Base({
  size = "md",
  className = "",
  onSelect,
  children,
  disabled = false,
  selectable = false,
  selected = !selectable,
  ...props
}: BaseProps) {
  const [selectedState, setSelectedState] = useState(selected);

  const combinedClassName = [
    "flex flex-row justify-between gap-2 items-center rounded-full border border-primary",
    selectable ? "active:opacity-80 active:scale-95" : "",
    BaseStyle.size[size],
    className,
    selectedState ? BaseStyle.selected : BaseStyle.unselected,
    disabled ? "opacity-40" : "",
  ].join(" ");

  return (
    <propsButtonContext.Provider value={{ size, selected: selectedState }}>
      <Pressable
        className={combinedClassName}
        onPress={() => {
          if (disabled || !selectable) return;
          setSelectedState(!selectedState);
          if (onSelect) {
            onSelect(!selectedState);
          }
        }}
        disabled={disabled}
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
  const { size, selected } = use(propsButtonContext)!;

  const combinedClassName = [
    LabelStyle.size[size!],
    selected ? LabelStyle.selected : LabelStyle.unselected,
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
  const { size, selected } = use(propsButtonContext)!;
  const { colors } = useThemeStore();

  if (!colors) {
    return null;
  }

  const iconProps: IconChildrenProps = {
    fill: selected ? colors.background : colors.primary,
    size: size === "sm" ? 12 : size === "md" ? 16 : 20,
  };

  return <>{children(iconProps)}</>;
}

export const Pill = {
  Base,
  Label,
  Icon,
};
