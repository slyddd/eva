import { genConfig } from '@ui/avatar';
import { useThemeStore } from '@ui/theme/theme.store';

export function useAvatarBySex(sex: 'man' | 'woman') {
  const { colors } = useThemeStore();
  const avatarConfig = genConfig({
    bgColor: colors.primary,
    earSize: 'small',
    hairColor: '#fff',
    eyeBrowStyle: sex === 'man' ? 'up' : 'upWoman',
    eyeStyle: 'circle',
    glassesStyle: 'round',
    hairStyle: sex === 'man' ? 'thick' : 'womanLong',
    hatStyle: 'none',
    mouthStyle: 'peace',
    noseStyle: 'round',
    shirtStyle: 'polo',
    shirtColor: colors.background,
    faceColor: '#f0cdbc',
  });

  return avatarConfig;
}
