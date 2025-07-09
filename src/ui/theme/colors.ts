/**
 * Color definitions for light and dark themes.
 */
export type Colors = {
  background: string;
  primary: string;
  surface: string;
  error: string;
  success: string;
  foreground: string;
  errorText: string;
  successText: string;
};

export const colors = {
  dark: {
    background: "#1e2a38",
    primary: "#6ca8ea",
    surface: "#2c3e50",
    error: "#ef9a9a",
    success: "#a3e4c1",
    foreground: "#ffffff",
    errorText: "#7c1f1f",
    successText: "#0e6e3a",
  },
  light: {
    background: "#FAFAF5",
    primary: "#4A90E2",
    surface: "#F0EFEA",
    error: "#E57373",
    success: "#73E887",
    foreground: "#333333",
    errorText: "#AC2020",
    successText: "#1DAF35",
  },
};

/**
 * Converts a hex color to an RGB string (e.g. "#ffffff" -> "255 255 255").
 */
const hexToRgb = (hex: string): string => {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return m
    ? `${parseInt(m[1], 16)} ${parseInt(m[2], 16)} ${parseInt(m[3], 16)}`
    : hex;
};

/**
 * CSS variable color values for each theme.
 */
export const colorsVars = {
  dark: Object.fromEntries(
    Object.entries(colors.dark).map(([k, v]) => [`--${k}`, hexToRgb(v)]),
  ),
  light: Object.fromEntries(
    Object.entries(colors.light).map(([k, v]) => [`--${k}`, hexToRgb(v)]),
  ),
};
