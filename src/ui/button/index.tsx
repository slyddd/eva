import { animations } from '@/ui/animations';
import { shadows } from '@ui/shadows';
import { useThemeStore } from '@ui/theme/theme.store';
import clsx from 'clsx';
import { MotiView } from 'moti';
import { MotiPressable, useMotiPressable } from 'moti/interactions';
import { ComponentProps, createContext, use, useMemo } from 'react';
import { PixelRatio, Text, TextProps, View } from 'react-native';
import { buttonStyle } from './button.styles';
import { ButtonProps, Colors, Radius, Size } from './button.type';

/**
 * Props shared by all button components.
 */
interface ButtonContextProps {
  color?: Colors;
  size?: Size;
}

/**
 * Context to provide button color and size to children.
 */
const ButtonContext = createContext<ButtonContextProps | null>(null);

/**
 * Props for the Base button component.
 */
interface BaseProps
  extends ButtonContextProps,
    ButtonProps,
    ComponentProps<typeof MotiPressable> {
  onPress?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  radius?: Radius;
  shadow?: boolean;
  width?: number;
  height?: number;
}

/**
 * Base button component.
 * Handles press animation, styling, and disabled state.
 */
export function Base({
  color = 'primary',
  size = 'md',
  radius = 'md',
  className = '',
  disabled = false,
  shadow = true,
  ...props
}: BaseProps) {
  const styles = buttonStyle.Base;

  // Combine all class names for styling using clsx.
  const combinedClassName = clsx(
    'flex flex-row justify-between gap-2 items-center w-fit h-fit',
    styles.color[color],
    styles.size[size],
    styles.radius[radius],
    disabled && 'opacity-40',
    className,
  );

  return (
    <ButtonContext.Provider value={{ color, size }}>
      <MotiPressable
        animate={useMemo(() => props.animation || animations.press, [])}
        onPress={props.onPress}
        disabled={disabled}
        {...props}
      >
        <View
          className={combinedClassName}
          aria-disabled={disabled}
          style={
            [
              shadow && shadows.normal,
              {
                width:
                  props.width &&
                  PixelRatio.getPixelSizeForLayoutSize(props.width),
                height:
                  props.height &&
                  PixelRatio.getPixelSizeForLayoutSize(props.height),
              },
            ] as any
          }
          {...props}
        >
          {props.children}
        </View>
      </MotiPressable>
    </ButtonContext.Provider>
  );
}

/**
 * Props for the Label component.
 */
interface LabelProps extends Omit<ButtonProps, 'animation'>, TextProps {
  children?: React.ReactNode;
  center?: boolean;
}

/**
 * Label component for button text.
 * Applies color and size from context.
 */
export function Label({ className = '', ...props }: LabelProps) {
  const { color, size } = use(ButtonContext) ?? {
    color: 'primary',
    size: 'md',
  };
  const styles = buttonStyle.Label;

  const combinedClassName = clsx(
    'font-bold',
    props.center && 'm-auto text-center',
    styles.color[color!],
    styles.size[size!],
    className,
  );

  return (
    <Text className={combinedClassName} {...props}>
      {props.children || 'Button'}
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

interface IconProps extends Omit<ButtonProps, 'className'> {
  children: (props: IconChildrenProps) => React.ReactNode;
  center?: boolean;
}

/**
 * Icon component for button.
 * Passes fill color and size to icon children based on context and theme.
 */
export function Icon(props: IconProps) {
  const { color, size } = use(ButtonContext) ?? {
    color: 'primary',
    size: 'md',
  };
  const animation =
    props.animation ||
    (() => {
      'worklet';
      return {};
    });

  const state = useMotiPressable(animation, []);
  const { colors } = useThemeStore();

  if (!colors || !color) {
    return null;
  }

  let colorCode;
  switch (color) {
    case 'primary':
      colorCode = colors.background;
      break;
    case 'none':
      colorCode = colors.foreground;
      break;
    default:
      colorCode = colors[`${color}Text`];
      break;
  }

  // Determine icon size based on button size.
  const iconProps: IconChildrenProps = {
    fill: colorCode,
    size: size === 'sm' || size === 'none' ? 16 : size === 'md' ? 20 : 24,
  };

  return (
    <MotiView
      className={clsx(
        'flex items-center justify-center',
        props.center && 'm-auto',
      )}
      state={state}
    >
      {props.children(iconProps)}
    </MotiView>
  );
}

/**
 * Button component exports.
 */
export const Button = {
  Base,
  Label,
  Icon,
};
