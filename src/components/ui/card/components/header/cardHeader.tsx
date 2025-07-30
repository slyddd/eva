import { View, ViewProps } from 'react-native';

export function CardHeader(props: ViewProps) {
  return (
    <View className="w-full flex-row items-center justify-between" {...props}>
      {props.children}
    </View>
  );
}
