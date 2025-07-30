import { Image } from 'expo-image';
import { ComponentProps, useContext } from 'react';
import { CardContext } from '../card.context';
import { PixelRatio } from 'react-native';

interface CardImageProps extends ComponentProps<typeof Image> {
  size?: number;
}

const imageRadius = {
  sm: 4 - 6 / 2,
  md: 8 - 6 / 2,
  lg: 12 - 6 / 2,
  full: 9999,
  none: 0,
};

const randomBlurHash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';

export function CardImage({ size = 20, ...props }: CardImageProps) {
  const context = useContext(CardContext);

  // Ensure the CardImage is used like a child of CardBase
  if (!context) {
    console.warn('CardImage must be used inside CardBase');
    return null;
  }

  const { radius } = context;

  return (
    <Image
      style={{
        aspectRatio: 1,
        backgroundColor: 'red',
        width: PixelRatio.getPixelSizeForLayoutSize(size),
        borderRadius: imageRadius[radius],
      }}
      contentFit="cover"
      placeholder={{ blurhash: randomBlurHash }}
      {...props}
    />
  );
}
