import { createContext } from 'react';
import { FieldValues, UseControllerReturn } from 'react-hook-form';

// This context will be used to share input properties across components
interface InputContextProps extends UseControllerReturn<FieldValues, string> {
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

// Create a context for sharing input properties
export const InputContext = createContext<InputContextProps | null>(null);
