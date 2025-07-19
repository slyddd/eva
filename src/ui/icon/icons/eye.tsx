import { Path, Circle } from 'react-native-svg';

export function EyeIcon() {
  return (
    <>
      <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <Circle cx={12} cy={12} r={3} />
    </>
  );
}
