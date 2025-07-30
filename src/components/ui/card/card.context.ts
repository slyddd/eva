import { createContext } from 'react';

export type Colors = 'surface' | 'error' | 'success';

interface CardContextProps {
  radius: 'sm' | 'md' | 'lg' | 'full' | 'none';
  color: Colors;
}

export const CardContext = createContext<CardContextProps | null>(null);
