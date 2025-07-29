import { Circle, Path } from 'react-native-svg';

export function FemaleIcon() {
  return (
    <>
      <Circle cx={12} cy={8} r={5.5} />
      <Path d="M12 13.5v8" />
      <Path d="M9 17.5h6" />
    </>
  );
}
