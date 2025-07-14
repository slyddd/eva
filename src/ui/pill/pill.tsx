import { createContext, use } from "react";
import { Text, TextProps, ViewProps } from "react-native";
import Animated, { AnimatedProps } from "react-native-reanimated";
import { PressAnimation } from "../animations/press";
import { useThemeStore } from "../theme/theme.store";
import { BaseStyle, LabelStyle } from "./pill.styles";
import { useSelectablePill } from "./hooks/useSelectablePill";
import { clsx } from "../utils/clsx";

/**
 * Pill component size options.
 */
type Size = "sm" | "md" | "lg";

/**
 * Context value for pill button state.
 */
interface PillProps {
  size?: Size;
  selected?: boolean;
}

/**
 * Common global props for styling.
 */
interface GlobalProps {
  className?: string;
}

/**
 * Context for sharing pill button state between subcomponents.
 */
const PillContext = createContext<PillProps | null>(null);

/**
 * Props for the main Pill.Base component.
 */
interface BaseProps
  extends PillProps,
    Omit<AnimatedProps<ViewProps>, "className"> {
  className?: string;
  onChange?: (selected: boolean) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  selectable?: boolean;
}

/**
 * Pill.Base
 * Main pill button component. Handles selection state and provides context to children.
 */
function Base({
  size = "md",
  className = "",
  onChange,
  children,
  disabled = false,
  selectable = false,
  selected: selectedProps,
  ...props
}: BaseProps) {
  // Internal selected state
  const { handlePress, selected } = useSelectablePill({
    initialSelected: selectedProps,
    disabled,
    selectable,
  });

  // Compose className based on props and state
  const combinedClassName = clsx(
    "flex flex-row justify-between gap-2 items-center rounded-full border border-primary transition-colors",
    selectable && "active:opacity-80 active:scale-95",
    BaseStyle.size[size],
    className,
    selected ? BaseStyle.selected : BaseStyle.unselected,
    disabled && "opacity-40",
  );

  return (
    <PillContext.Provider value={{ size, selected }}>
      <PressAnimation
        onPress={() => {
          handlePress();
          onChange?.(!selected);
        }}
      >
        {(animatedStyle) => (
          <Animated.View
            className={combinedClassName}
            aria-disabled={disabled}
            style={selectable && animatedStyle}
            {...props}
          >
            {children}
          </Animated.View>
        )}
      </PressAnimation>
    </PillContext.Provider>
  );
}

/**
 * Props for Pill.Label component.
 */
interface LabelProps extends GlobalProps, TextProps {
  children?: React.ReactNode;
}

/**
 * Pill.Label
 * Renders the pill label, styled according to context (size, selected).
 */
function Label({ className = "", children, ...props }: LabelProps) {
  const { size, selected } = use(PillContext)!;

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

/**
 * Props passed to icon children.
 */
interface IconChildrenProps {
  fill?: string;
  size?: number;
}

/**
 * Pill.Icon
 * Renders an icon, passing fill and size based on context and theme.
 */
function Icon({
  children,
}: {
  children: (props: IconChildrenProps) => React.ReactNode;
}) {
  const { size, selected } = use(PillContext) ?? {
    size: "md",
    selected: false,
  };
  const { colors } = useThemeStore();

  if (!colors) return null;

  const iconProps: IconChildrenProps = {
    fill: selected ? colors.background : colors.primary,
    size: size === "sm" ? 12 : size === "md" ? 16 : 20,
  };

  return <>{children(iconProps)}</>;
}

/**
 * Pill component API.
 */
export const Pill = {
  Base,
  Label,
  Icon,
};
