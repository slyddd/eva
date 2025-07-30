import clsx from 'clsx';
import { MotiText } from 'moti';
import { ComponentProps, useContext } from 'react';
import { ButonContext } from '../button.context';

// This object gives the clases for the different label colors
const labelColors = {
  primary: 'text-background',
  none: 'text-foreground',
  error: 'text-errorText',
  success: 'text-successText',
};

export function ButtonLabel(props: ComponentProps<typeof MotiText>) {
  const context = useContext(ButonContext);

  // Ensure the ButtonLabel is used like a child of ButtonBase
  if (!context) {
    console.warn('ButtonLabel must be used within ButtonBase');
    return null;
  }

  const { size = 'md', color = 'primary' } = context;
  const className = clsx(
    'font-bold justify-center items-center text-center',
    labelColors[color],
    `text-${size}`,
    props.className,
  );

  return (
    <MotiText className={className} {...props}>
      {props.children || 'Button Label'}
    </MotiText>
  );
}
