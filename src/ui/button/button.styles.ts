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
    primary: "bg-primary",
    error: "bg-error",
    success: "bg-success",
  },
  /**
   * Size variants for element dimensions and padding.
   * - sm: Small size.
   * - md: Medium size.
   * - lg: Large size.
   */
  size: {
    sm: "h-fit w-fit py-2 px-3 max-w-32 max-h-10",
    md: "h-fit w-fit py-3 px-4 max-w-40 max-h-12",
    lg: "h-fit w-fit py-4 px-5 max-w-48 max-h-14",
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
    sm: "rounded-el-sm",
    md: "rounded-el-md",
    lg: "rounded-el-lg",
    full: "rounded-full",
    none: "rounded-none",
  },
};

/**
 * LabelStyle provides a set of style classes for label elements.
 * It includes color and size options.
 *
 * @property color - Color variants for text styling.
 * @property size - Size variants for text size.
 */
export const LabelStyle = {
  /**
   * Color variants for text styling.
   * - primary: Primary text color.
   * - error: Error text color.
   * - success: Success text color.
   */
  color: {
    primary: "text-background",
    error: "text-errorText",
    success: "text-successText",
  },
  /**
   * Size variants for text size.
   * - sm: Small text.
   * - md: Medium text.
   * - lg: Large text.
   */
  size: {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  },
};
