import React from 'react';
import Svg, {
  Ellipse,
  EMaskUnits,
  G,
  Mask,
  Path,
  SvgProps,
} from 'react-native-svg';

export default function face(props: SvgProps) {
  const { color, ...rest } = props;
  const maskId = `mask${Math.round(Math.random() * 9999999)}`;
  const pathId = `path${Math.round(Math.random() * 9999999)}`;
  return (
    <Svg
      viewBox="0 0 200 320"
      fill="none"
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}
      {...rest}
    >
      <Path
        d="M154 319.5c-14.4-20-25.667-58.666-27-78L58.5 212 30 319.5h124Z"
        fill={color}
      />
      <Mask
        id={maskId}
        maskUnits={'useSpaceOnUse' as EMaskUnits.USER_SPACE_ON_USE}
        // maskType="alpha"
        x={30}
        y={212}
        width={124}
        height={118}
      >
        <Path
          d="M154 329.5c-14.4-20-25.667-68.666-27-88L58.5 212 30 329.5h124Z"
          fill={color}
        />
      </Mask>
      <G mask={`url(#${maskId})`}>
        <Ellipse cx={124} cy={210} rx={59} ry={54} fill="#000" />
      </G>
      <Mask id={pathId} fill="#fff">
        <Path d="m183.886 150.917-.083-.348a24.868 24.868 0 0 0-.084-.347l-16.396-68.437a15.008 15.008 0 0 1-.049-.203 14.655 14.655 0 0 0-.049-.203l-.073-.304h-.001c-10.218-41.444-51.995-66.928-93.569-56.967-41.574 9.96-67.267 51.61-57.594 93.185h-.002l16.992 70.918.014-.003c10.602 40.904 52.07 65.941 93.337 56.053 41.268-9.887 66.887-50.997 57.802-92.265l.013-.003-.258-1.076Z" />
      </Mask>
      <Path
        d="m183.886 150.917-.083-.348a24.868 24.868 0 0 0-.084-.347l-16.396-68.437a15.008 15.008 0 0 1-.049-.203 14.655 14.655 0 0 0-.049-.203l-.073-.304h-.001c-10.218-41.444-51.995-66.928-93.569-56.967-41.574 9.96-67.267 51.61-57.594 93.185h-.002l16.992 70.918.014-.003c10.602 40.904 52.07 65.941 93.337 56.053 41.268-9.887 66.887-50.997 57.802-92.265l.013-.003-.258-1.076Z"
        fill={color}
      />
    </Svg>
  );
}
