import { MotiPressableInteractionProp } from 'moti/interactions';

const press: MotiPressableInteractionProp = ({ hovered, pressed }) => {
  'worklet';

  return {
    opacity: hovered || pressed ? 0.8 : 1,
    scale: hovered || pressed ? 0.85 : 1,
  };
};

const reload: MotiPressableInteractionProp = ({ hovered, pressed }) => {
  'worklet';
  return {
    rotate: hovered || pressed ? '360deg' : '0deg',
  };
};

export const animations = {
  press,
  reload,
};
