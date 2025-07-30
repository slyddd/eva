import { CardContext, Colors } from '@ui/card/card.context';
import { useThemeStore } from '@ui/theme/theme.store';
import { ReactNode, useContext } from 'react';
import { PixelRatio, View, ViewProps } from 'react-native';

function getInfoColor(color: Colors) {
  const { colors } = useThemeStore();

  const infoColors = {
    surface: colors.foreground,
    error: colors.errorText,
    success: colors.successText,
  };

  return infoColors[color];
}

interface CardFooterProps extends Omit<ViewProps, 'children'> {
  children: (props: { size: number; fill: string }) => ReactNode;
}

export function CardFooter({ children, ...props }: CardFooterProps) {
  const context = useContext(CardContext);

  const { color } = context || {
    color: 'surface',
  };

  const fill = getInfoColor(color);
  const size = PixelRatio.getFontScale() * 12;

  return (
    <View
      className="flex w-full flex-row items-center justify-start gap-1"
      {...props}
    >
      {children({ size, fill })}
    </View>
  );
}
