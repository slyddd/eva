import { ButtonBase, ButtonIcon } from '@ui/button';
import { useContext } from 'react';
import { InputContext } from '../input.context';

/**
 * The props for the InputIcon component.
 * children has the icon props to be passed in a function
 * the onpress permit add functions and activate the press animation in icon
 */
interface InputIconProps {
  children: (props: { fill: string; size: number }) => React.ReactNode;
  onPress?: () => void;
}

export function InputIcon(props: InputIconProps) {
  const context = useContext(InputContext);

  // Ensure the InputIcon is used like a child of InputBase
  if (!context) {
    console.warn('InputIcon must be used inside InputBase');
    return null;
  }

  const { size, fieldState, disabled } = context;

  return (
    <ButtonBase
      size={size}
      onPress={props.onPress}
      hasAnimation={props.onPress !== undefined}
      hasShadow={false}
      width="auto"
      radius="none"
      color={fieldState.error ? 'error' : 'primary'}
      disabled={disabled}
      style={{
        backgroundColor: 'transparent',
      }}
    >
      <ButtonIcon>{props.children}</ButtonIcon>
    </ButtonBase>
  );
}
