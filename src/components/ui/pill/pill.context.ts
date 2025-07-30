import { createContext } from 'react';

// The colors used for the pill
export type PillColor =
  | 'primary'
  | 'error'
  | 'success'
  | 'surface'
  | 'background';

// The context properties for the Pill component
interface PillContextProps {
  selected: boolean;
  size: 'sm' | 'md' | 'lg';
  color: PillColor;
}

// Create a context for the Pill component
// This context will provide the selected state, size, and color of the pill
export const PillContext = createContext<PillContextProps | null>(null);
