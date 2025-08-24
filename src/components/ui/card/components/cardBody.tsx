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

interface CardBodyProps extends Omit<ViewProps, 'children'> {
  children: (props: { size: number; fill: string }) => ReactNode;
}

export function CardBody({ children, ...props }: CardBodyProps) {
  const context = useContext(CardContext);

  const { color } = context || {
    color: 'surface',
  };

  const fill = getInfoColor(color);
  const size = PixelRatio.getFontScale() * 14;

  return (
    <View
      className="flex w-full flex-col items-start justify-center gap-1"
      {...props}
    >
      {children({ size, fill })}
    </View>
  );
}
