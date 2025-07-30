import { createContext } from 'react';

// The context properties for the Switch component
interface SwitchContextProps {
  selected: boolean;
  size: 'sm' | 'md' | 'lg';
  radius: 'sm' | 'md' | 'lg' | 'full';
}

// Create a context for the Switch component
// This context will provide the selected state, size, and radius of the switch
export const SwitchContext = createContext<SwitchContextProps | null>(null);
