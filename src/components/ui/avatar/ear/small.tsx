import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export default function earSmall(props: SvgProps) {
  const { color, ...rest } = props;
  return (
    <Svg
      viewBox="0 0 48 48"
      fill="none"
      style={{
        position: 'absolute',
        width: '16%',
        height: '15%',
        top: '13%',
        left: '19.8%',
      }}
      {...rest}
    >
      <Path
        d="M31.5 39.036a19.382 19.382 0 0 1-7.42 1.464c-10.493 0-17.958-4.5-19-17-1-12 7.507-18.5 18-18.5 3.138 0 6.187.606 8.92 1.73l-.5 32.306Z"
        fill={color}
      />
    </Svg>
  );
}
