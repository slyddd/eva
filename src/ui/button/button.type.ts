import { MotiPressableInteractionProp } from 'moti/interactions';

/**
 * Button color options.
 */
export type Colors = 'primary' | 'error' | 'success' | 'none';

/**
 * Button size options.
 */
export type Size = 'none' | 'sm' | 'md' | 'lg';

/**
 * Button border radius options.
 */
export type Radius = 'sm' | 'md' | 'lg' | 'full' | 'none';

/**
 * Props for global styling.
 */
export interface ButtonProps {
  className?: string;
  animation?: MotiPressableInteractionProp;
}
