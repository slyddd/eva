import { create } from 'zustand';
import { Colors, Gradients } from './colors';

interface ThemeState {
  mode: 'light' | 'dark' | 'system';
  setMode: (mode: 'light' | 'dark' | 'system') => void;

  colors?: Colors;
  gradients?: Gradients;
  setColors: (colors: Colors) => void;
  setGradients: (gradients: Gradients) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'system',
  setMode: (mode) => set({ mode }),

  colors: undefined,
  gradients: undefined,
  setColors: (colors) => set({ colors }),
  setGradients: (gradients) => set({ gradients }),
}));
