import { create } from 'zustand';
import { colors, Colors, gradients, Gradients } from './colors';

interface ThemeState {
  mode: 'light' | 'dark' | 'system';
  setMode: (mode: 'light' | 'dark' | 'system') => void;

  colors: Colors;
  gradients: Gradients;
  setColors: (colors: Colors) => void;
  setGradients: (gradients: Gradients) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'system',
  setMode: (mode) => set({ mode }),

  colors: colors.light,
  gradients: gradients.light,
  setColors: (colors) => set({ colors }),
  setGradients: (gradients) => set({ gradients }),
}));
