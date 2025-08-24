import { Icon } from '@ui/icon';
import { shadows } from '@ui/shadows';
import { useThemeStore } from '@ui/theme/theme.store';
import clsx from 'clsx';
import { MotiView } from 'moti';
import { ComponentProps } from 'react';
import { Control, useController } from 'react-hook-form';
import { DimensionValue, PixelRatio, Text, View } from 'react-native';
import { InputContext } from '../input.context';

/**
 * The props used in the Inputbase component, this adds the original
 * MotiView props to permit the personalization
 */
interface InputBaseProps extends ComponentProps<typeof MotiView> {
  control: Control<any>;
  name: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  radius?: 'sm' | 'md' | 'lg' | 'full' | 'none';
  width?: DimensionValue;
  height?: DimensionValue;
  disabled?: boolean;
}

/**
 * * This values are passed to PixelRatio.getPixelSizeForLayoutSize
 * * to get a pixel size based on the mobile layout size.
 */
const baseHeightSizes = {
  sm: 16,
  md: 20,
  lg: 24,
};

/**
 * * This values will be used with PixelRatio to scale the icon size
 * * based on the device's font scale. Using PixelRatio.getFontScale() * iconSizes[size]
 * * allows the icon to adapt to different screen sizes and resolutions.
 */
const iconSizes = {
  sm: 14,
  md: 16,
  lg: 20,
};

// Base border radius values for the input component
const baseRadius = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
  none: 'rounded-none',
};

// Base label sizes for the input component
const labelSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function InputBase({
  size = 'md',
  radius = 'md',
  width = '100%',
  height = baseHeightSizes[size],
  ...props
}: InputBaseProps) {
  const controller = useController({
    control: props.control,
    name: props.name,
    defaultValue: '',
  });
  const { colors } = useThemeStore();
  const { fieldState } = controller;

  // Transforms width and height to pixel sizes if they are numbers
  if (typeof width === 'number') {
    width = PixelRatio.getPixelSizeForLayoutSize(width);
  }
  if (typeof height === 'number') {
    height = PixelRatio.getPixelSizeForLayoutSize(height);
  }

  // Styles for the input container
  const inputStyles = clsx(
    'flex w-full flex-row items-center px-2 py-1',
    baseRadius[radius],
    props.className,
  );

  // Styles for the label, it changes color based on the field state
  const labelStyles = clsx(
    'w-full font-semibold',
    labelSizes[size],
    controller.fieldState.error ? 'text-error' : 'text-foreground',
  );

  return (
    <InputContext.Provider
      value={{ size, disabled: props.disabled, ...controller }}
    >
      <View
        className="flex h-fit flex-col justify-center gap-2"
        style={{ width }}
      >
        {props.label && <Text className={labelStyles}>{props.label}</Text>}
        <MotiView
          className={inputStyles}
          style={{
            height,
            ...shadows.normal,
          }}
          animate={{
            opacity: props.disabled || fieldState.isValidating ? 0.5 : 1,
            backgroundColor: fieldState.error ? colors.error : colors.primary,
          }}
          {...props}
        >
          {props.children}
        </MotiView>
        {fieldState.error && (
          <View className="flex w-full flex-row gap-2">
            <Icon.Error
              size={PixelRatio.getFontScale() * iconSizes[size]}
              fill={colors.error}
            />
            <Text
              className={clsx(
                'flex-1 font-semibold text-error',
                labelSizes[size],
              )}
            >
              {fieldState.error.message}
            </Text>
          </View>
        )}
      </View>
    </InputContext.Provider>
  );
}
