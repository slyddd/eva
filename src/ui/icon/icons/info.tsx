import { Circle, Path } from 'react-native-svg';

export function InfoIcon() {
  return (
    <>
      <Circle cx={12} cy={12} r={10} />
      <Path d="M12 16v-4M12 8h.01" />
    </>
  );
}
