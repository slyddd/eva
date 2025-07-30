import { CardContext } from '@ui/card/card.context';
import clsx from 'clsx';
import { useContext } from 'react';
import { Text, TextProps } from 'react-native';

const titleColors = {
  surface: 'text-foreground',
  error: 'text-errorText',
  success: 'text-successText',
};

export function CardTitle(props: TextProps) {
  const context = useContext(CardContext);

  const { color } = context || {
    color: 'surface',
  };

  return (
    <Text className={clsx('text-lg font-bold', titleColors[color])}>
      {props.children}
    </Text>
  );
}
