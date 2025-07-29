/**
 * BaseStyle provides a set of style classes for base UI elements.
 * It includes color, size, and radius options.
 *
 * @property color - Color variants for background styling.
 * @property size - Size variants for element dimensions and padding.
 * @property radius - Border radius variants for rounded corners.
 */
const Base = {
  /**
   * Color variants for background styling.
   * - primary: Primary background color.
   * - error: Error background color.
   * - success: Success background color.
   */
  color: {
    primary: 'bg-primary',
    error: 'bg-error',
    success: 'bg-success',
    none: 'bg-transparent',
  },
  /**
   * Size variants for element dimensions and padding.
   * - sm: Small size.
   * - md: Medium size.
   * - lg: Large size.
   */
  size: {
    none: 'py-0 px-0',
    sm: 'py-2 px-3',
    md: 'py-3 px-4',
    lg: 'py-4 px-5',
  },
  /**
   * Border radius variants for rounded corners.
   * - sm: Small radius.
   * - md: Medium radius.
   * - lg: Large radius.
   * - full: Fully rounded.
   * - none: No rounding.
   */
  radius: {
    sm: 'rounded-el-sm',
    md: 'rounded-el-md',
    lg: 'rounded-el-lg',
    full: 'rounded-full',
    none: 'rounded-none',
  },
};

/**
 * LabelStyle provides a set of style classes for label elements.
 * It includes color and size options.
 *
 * @property color - Color variants for text styling.
 * @property size - Size variants for text size.
 */
const Label = {
  /**
   * Color variants for text styling.
   * - primary: Primary text color.
   * - error: Error text color.
   * - success: Success text color.
   */
  color: {
    primary: 'text-background',
    error: 'text-errorText',
    success: 'text-successText',
    none: 'text-foreground',
  },
  /**
   * Size variants for text size.
   * - sm: Small text.
   * - md: Medium text.
   * - lg: Large text.
   */
  size: {
    none: 'text-sm',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  },
};

export const buttonStyle = {
  Base,
  Label,
};
