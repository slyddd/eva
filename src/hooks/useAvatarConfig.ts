import { genConfig } from '@ui/avatar';
import { useThemeStore } from '@ui/theme/theme.store';

export function useAvatarBySex(sex: 'h' | 'm') {
  const { colors } = useThemeStore();
  const avatarConfig = genConfig({
    bgColor: colors.primary,
    earSize: 'small',
    hairColor: '#fff',
    eyeBrowStyle: sex === 'h' ? 'up' : 'upWoman',
    eyeStyle: 'circle',
    glassesStyle: 'round',
    hairStyle: sex === 'h' ? 'thick' : 'womanLong',
    hatStyle: 'none',
    mouthStyle: 'peace',
    noseStyle: 'round',
    shirtStyle: 'polo',
    shirtColor: colors.background,
    faceColor: '#f0cdbc',
  });

  return avatarConfig;
}
