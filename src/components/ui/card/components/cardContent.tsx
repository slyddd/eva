import { View, ViewProps } from 'react-native';

export function CardContent(props: ViewProps) {
  return (
    <View
      className="flex-1 flex-col items-center justify-start gap-5 px-4 py-2"
      {...props}
    >
      {props.children}
    </View>
  );
}
