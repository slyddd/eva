import { Button } from '@ui/button';
import { useThemeStore } from '@ui/theme/theme.store';
import clsx from 'clsx/lite';
import { createContext, use } from 'react';
import { Control, FieldValues, useController } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { BaseStyle, TextFieldStyle } from './input.styles';

/**
 * Button color options.
 */
type Colors = 'primary' | 'error';

/**
 * Button size options.
 */
type Size = 'sm' | 'md' | 'lg';

/**
 * Button border radius options.
 */
type Radius = 'sm' | 'md' | 'lg' | 'full' | 'none';

/**
 * Props for global styling.
 */
interface GlobalProps {
  className?: string;
}

interface InputProps {
  color?: Colors;
  size?: Size;
}

const InputContext = createContext<InputProps | null>(null);

interface BaseProps extends InputProps, GlobalProps {
  radius?: Radius;
  disabled?: boolean;
  children?: React.ReactNode;
  width?: number;
  height?: number;
}

function Base({
  className = '',
  color = 'primary',
  radius = 'md',
  size = 'md',
  disabled = false,
  children,
}: BaseProps) {
  const combinedClassName = clsx(
    'flex flex-row justify-between items-center gap-2 relative max-w-full w-full h-fit',
    BaseStyle.size[size],
    BaseStyle.color[color],
    BaseStyle.radius[radius],
    disabled ? 'opacity-50' : '',
    className,
  );

  return (
    <InputContext.Provider value={{ color, size }}>
      <View
        className={combinedClassName}
        style={{
          boxShadow: [
            {
              offsetX: 0,
              offsetY: 3,
              blurRadius: 10,
              color: 'rgba(0, 0, 0, 0.2)',
              spreadDistance: 1,
            },
          ],
        }}
      >
        {children}
      </View>
    </InputContext.Provider>
  );
}

interface TextFieldProps extends TextInputProps, GlobalProps {
  name: string;
  control: Control<FieldValues, any, FieldValues>;
}

function TextField({ name, control, className, ...props }: TextFieldProps) {
  const {} = useController({
    name,
    control,
    defaultValue: '',
  });
  const { color = 'primary', size = 'md' } = use(InputContext)!;

  const combinedClassName = clsx(
    'flex-1',
    TextFieldStyle.color[color],
    TextFieldStyle.size[size],
    className,
  );

  return <TextInput className={combinedClassName} {...props} />;
}

interface IconChildrenProps {
  fill?: string;
  size?: number;
}

interface IconProps {
  children: (props: IconChildrenProps) => React.ReactNode;
  onPress?: () => void;
}

function Icon({ children, onPress }: IconProps) {
  const { color = 'primary', size = 'md' } = use(InputContext)!;
  const { colors } = useThemeStore();
  const iconProps: IconChildrenProps = {
    fill: color === 'primary' ? colors?.background : colors?.errorText,
    size: size === 'sm' ? 14 : size === 'md' ? 18 : 22,
  };

  if (onPress) {
    return (
      <Button.Base size="none" color={color} onPress={onPress} shadow={false}>
        <Button.Icon>
          {({ fill, size }) => children({ fill, size })}
        </Button.Icon>
      </Button.Base>
    );
  }

  return <>{children(iconProps)}</>;
}

function ElevateOnKeyboard({ children }: { children: React.ReactNode }) {
  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      {children}
    </KeyboardAvoidingView>
  );
}

export const Input = {
  Base,
  TextField,
  Icon,
  ElevateOnKeyboard,
};
