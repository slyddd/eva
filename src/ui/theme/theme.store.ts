import { create } from "zustand";
import { Colors } from "./colors";

interface ThemeState {
  mode: "light" | "dark" | "system";
  setMode: (mode: "light" | "dark" | "system") => void;

  colors?: Colors;
  setColors: (colors: Colors) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: "system",
  setMode: (mode) => set({ mode }),

  colors: undefined,
  setColors: (colors) => set({ colors }),
}));
