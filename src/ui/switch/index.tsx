import { animations } from '@ui/animations';
import { useThemeStore } from '@ui/theme/theme.store';
import clsx from 'clsx/lite';
import { createContext, use, useState } from 'react';
import { BaseStyle, PillStyle } from './switch.styles';
import { MotiPressable } from 'moti/interactions';
import { View } from 'react-native';
import { MotiView } from 'moti';

interface GlobalProps {
  className?: string;
}

interface SwitchProps {
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
}

interface BaseProps extends GlobalProps, Omit<SwitchProps, 'selected'> {
  radius?: 'sm' | 'md' | 'lg' | 'full';
  onPress: () => void;
  children?: React.ReactNode;
}

const SwitchContext = createContext<SwitchProps | null>(null);

function Base({ size = 'md', radius = 'md', ...props }: BaseProps) {
  const [selected, setSelected] = useState(false);

  const combinedClassName = clsx(
    'flex h-fit w-fit flex-row items-center relative justify-start gap-2 bg-primary border border-primary p-1',
    !selected && 'bg-transparent',
    BaseStyle.size[size],
    BaseStyle.radius[radius],
    props.className,
  );

  const pillClassName = clsx(
    'flex flex-row items-center justify-center',
    selected ? 'bg-background' : 'bg-primary',
    PillStyle.size[size],
    BaseStyle.radius[radius],
  );

  const handlePress = () => {
    setSelected((prev) => !prev);
    props.onPress();
  };

  return (
    <SwitchContext.Provider value={{ size, selected }}>
      <MotiPressable onPress={handlePress} animate={animations.press}>
        <View className={combinedClassName}>
          <MotiView
            animate={{
              translateX: selected ? 20 : 0,
            }}
            className={pillClassName}
          >
            {props.children}
          </MotiView>
        </View>
      </MotiPressable>
    </SwitchContext.Provider>
  );
}

interface IconProps {
  children: ({
    fill,
    selected,
    size,
  }: {
    selected: boolean;
    fill: string;
    size: number;
  }) => React.ReactNode;
}

function Icon({ children }: IconProps) {
  const context = use(SwitchContext);
  const { colors } = useThemeStore();

  if (!context) {
    throw new Error('Icon must be used within a Switch');
  }
  if (!colors) {
    throw new Error('Theme colors are not available');
  }

  const { selected, size } = context;
  const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24;

  return children({
    selected: selected ?? false,
    fill: selected ? colors.primary : colors.background,
    size: iconSize,
  });
}

export const Switch = {
  Base,
  Icon,
};
