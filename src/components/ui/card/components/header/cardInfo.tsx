import { CardContext, Colors } from '@ui/card/card.context';
import { useThemeStore } from '@ui/theme/theme.store';
import clsx from 'clsx';
import { ReactNode, useContext } from 'react';
import { PixelRatio, Text, TextProps, View } from 'react-native';

const textColors = {
  surface: 'text-foreground',
  error: 'text-errorText',
  success: 'text-successText',
};

function getInfoColor(color: Colors) {
  const { colors } = useThemeStore();

  const infoColors = {
    surface: colors.foreground,
    error: colors.errorText,
    success: colors.successText,
  };

  return infoColors[color];
}

interface CardInfoProps extends Omit<TextProps, 'children'> {
  children: ((props: { size: number; fill: string }) => ReactNode) | string;
}

export function CardInfo({ children, className, ...props }: CardInfoProps) {
  const context = useContext(CardContext);

  const { color } = context || {
    color: 'surface',
  };

  const fill = getInfoColor(color);
  const size = PixelRatio.getFontScale() * 12;

  return typeof children === 'function' ? (
    <View className="flex flex-row items-center gap-1 opacity-60">
      {children({ size, fill })}
    </View>
  ) : (
    <Text
      className={clsx('text-sm opacity-60', textColors[color], className)}
      {...props}
    >
      {children}
    </Text>
  );
}
