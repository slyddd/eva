import clsx from 'clsx';
import { useContext } from 'react';
import { PixelRatio, TextInput, TextInputProps } from 'react-native';
import { InputContext } from '../input.context';

// The classes used for the text input based on the size
const textSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

/**
 * * The heights used for the text input based on the size.
 * * This values are passed to PixelRatio.getPixelSizeForLayoutSize
 * * to get a pixel size based on the mobile layout size.
 */
const inputHeights = {
  sm: 20,
  md: 22,
  lg: 24,
};

export function InputField(props: TextInputProps) {
  const context = useContext(InputContext);

  // Ensure the InputField is used like a child of InputBase
  if (!context) {
    console.warn('InputField must be used inside InputBase');
    return null;
  }

  const { size, fieldState, field, disabled } = context;
  const textStyle = clsx(
    'flex-1',
    textSizes[size],
    fieldState.error
      ? 'text-errorText placeholder:text-errorText'
      : 'text-background placeholder:text-background',
  );

  return (
    <TextInput
      className={textStyle}
      style={{
        height: PixelRatio.getPixelSizeForLayoutSize(inputHeights[size]),
      }}
      onChangeText={field.onChange}
      readOnly={disabled || props.readOnly}
      {...field}
      {...props}
    />
  );
}
