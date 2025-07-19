/**
 * BaseStyle provides a set of style classes for base UI elements.
 * It includes color, size, and radius options.
 *
 * @property color - Color variants for background styling.
 * @property size - Size variants for element dimensions and padding.
 * @property radius - Border radius variants for rounded corners.
 */
export const BaseStyle = {
  /**
   * Color variants for background styling.
   * - primary: Primary background color.
   * - error: Error background color.
   * - success: Success background color.
   */
  color: {
    primary: 'bg-primary',
    error: 'bg-error',
  },
  /**
   * Size variants for element dimensions and padding.
   * - sm: Small size.
   * - md: Medium size.
   * - lg: Large size.
   */
  size: {
    sm: 'py-1 px-3',
    md: 'py-2 px-4',
    lg: 'py-3 px-5',
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
 * TextFieldStyle provides a set of style classes for label elements.
 * It includes color and size options.
 *
 * @property color - Color variants for text styling.
 * @property size - Size variants for text size.
 */
export const TextFieldStyle = {
  /**
   * Color variants for text styling.
   * - primary: Primary text color.
   * - error: Error text color.
   * - success: Success text color.
   */
  color: {
    primary: 'text-background placeholder:text-background/60',
    error: 'text-errorText placeholder:text-errorText/60',
  },
  /**
   * Size variants for text size.
   * - sm: Small text size.
   * - md: Medium text size.
   * - lg: Large text size.
   */
  size: {
    sm: 'text-sm placeholder:text-sm',
    md: 'text-base placeholder:text-base',
    lg: 'text-lg placeholder:text-lg',
  },
};
