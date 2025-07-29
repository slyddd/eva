import { createContext } from 'react';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonColor = 'primary' | 'error' | 'success' | 'none';

// Define the properties that can be shared through the context
export interface ButtonContextProps {
  size?: ButtonSize;
  color?: ButtonColor;
}

// Create a context for sharing button properties
export const ButonContext = createContext<ButtonContextProps | null>(null);
