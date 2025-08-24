const { fontScale } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
      },
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        error: 'rgb(var(--error) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        errorText: 'rgb(var(--errorText) / <alpha-value>)',
        successText: 'rgb(var(--successText) / <alpha-value>)',
      },
    },
    fontSize: {
      xs: fontScale(10),
      sm: fontScale(12),
      base: fontScale(14),
      md: fontScale(14),
      lg: fontScale(16),
      xl: fontScale(18),
      '2xl': fontScale(20),
      '3xl': fontScale(24),
      '4xl': fontScale(28),
      '5xl': fontScale(32),
      '6xl': fontScale(36),
      '7xl': fontScale(40),
      '8xl': fontScale(44),
    },
    boxShadow: {
      default: '0px 3px 10px 1px rgba(0, 0, 0, 0.2)',
    },
  },
  plugins: [
    ({ addBase }) =>
      addBase({
        ':root': {
          '--background': '255, 255, 255',
          '--foreground': '0, 0, 0',
          '--primary': '0, 122, 255',
          '--surface': '240, 240, 240',
          '--error': '255, 59, 48',
          '--success': '52, 199, 89',
          '--errorText': '255, 69, 58',
          '--successText': '76, 217, 100',
        },
      }),
  ],
};
