import { Rect, Circle, Path } from 'react-native-svg';

export function ImageIcon() {
  return (
    <>
      <Rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
      <Circle cx={8.5} cy={8.5} r={1.5} />
      <Path d="m21 15-5-5L5 21" />
    </>
  );
}
