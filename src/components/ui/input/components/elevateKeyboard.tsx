import { KeyboardAvoidingView } from 'react-native';

export function ElevateOnKeyboard(props: { children: React.ReactNode }) {
  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      {props.children}
    </KeyboardAvoidingView>
  );
}
