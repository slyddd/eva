import { MotiPressableInteractionProp } from 'moti/interactions';

const reload: MotiPressableInteractionProp = ({ hovered, pressed }) => {
  'worklet';
  return {
    rotate: hovered || pressed ? '360deg' : '0deg',
  };
};

export const animations = {
  reload,
};
