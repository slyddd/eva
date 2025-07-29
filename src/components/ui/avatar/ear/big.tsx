import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export default function earBig(props: SvgProps) {
  const { color, ...rest } = props;
  return (
    <Svg
      fill="none"
      viewBox="0 0 48 52"
      style={{
        position: 'absolute',
        width: '16%',
        height: '15%',
        top: '13%',
        left: '19%',
      }}
      {...rest}
    >
      <Path
        d="M42.972 23.984c.071-.652.108-1.314.108-1.984 0-10.217-9.507-17-20-17s-19 6.5-18 18.5c.556 6.677 2.946 11.072 6.65 13.717-.588 1.024-.845 2.227-.682 3.6.63 5.281 5.138 7.183 11.476 7.183 11.105 0 19.892-14.047 20.448-24.016Z"
        fill={color}
      />
    </Svg>
  );
}
