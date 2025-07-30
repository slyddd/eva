import clsx from 'clsx';
import { MotiText } from 'moti';
import { ComponentProps, useContext } from 'react';
import { PillContext } from '../pill.context';

// The colors used for the label based on the selected state and color
const labelColors = {
  selected: {
    primary: 'text-background',
    error: 'text-errorText',
    success: 'text-successText',
    surface: 'text-foreground',
    background: 'text-foreground',
  },
  unselected: {
    primary: 'text-primary',
    error: 'text-error',
    success: 'text-success',
    surface: 'text-surface',
    background: 'text-background',
  },
};

// The sizes of the label text based on the size prop
const labelSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function PillLabel(props: ComponentProps<typeof MotiText>) {
  const context = useContext(PillContext);

  // Ensure the PillLabel is used like a child of PillBase
  if (!context) {
    console.warn('PillLabel must be used within PillBase');
    return null;
  }

  const { size, color, selected } = context;

  return (
    <MotiText
      className={clsx(
        'items-center justify-center text-center font-bold',
        selected ? labelColors.selected[color] : labelColors.unselected[color],
        labelSizes[size],
        props.className,
      )}
    >
      {props.children || 'Pill Label'}
    </MotiText>
  );
}
