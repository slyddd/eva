import React from 'react';

import Normal from './normal';
import Thick from './thick';
import Mohawk from './mohawk';
import WomanLong from './womanLong';
import WomanShort from './womanShort';
import type { HairStyleType } from 'src/types';

export default function hair(props: {
  style: HairStyleType;
  color: string;
  colorRandom: boolean;
}) {
  const { style, color, colorRandom } = props;
  switch (style) {
    case 'thick':
      return <Thick color={color} colorRandom={colorRandom} />;
    case 'mohawk':
      return <Mohawk color={color} colorRandom={colorRandom} />;
    case 'womanLong':
      return <WomanLong color={color} />;
    case 'womanShort':
      return <WomanShort color={color} />;
    case 'normal':
    default:
      return <Normal color={color} />;
  }
}
