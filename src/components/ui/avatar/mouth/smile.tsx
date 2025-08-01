import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function mouthSmile() {
  return (
    <Svg
      style={{
        width: '50%',
        height: '17%',
        position: 'absolute',
        top: '23%',
        right: '23%',
        opacity: 0.6,
      }}
      viewBox="0 0 64 64"
      fill="none"
    >
      <Path
        d="M10.0007 24.1649C14.941 30.6115 22.4277 37.7537 33.9767 36.125C45.5257 34.4963 50.6642 26.5297 49.1492 20.0779"
        stroke="black"
        strokeWidth="4"
      />
    </Svg>
  );
}
