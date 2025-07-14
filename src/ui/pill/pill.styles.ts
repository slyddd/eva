/**
 * BaseStyle contains style definitions for base components, including sizing and selection states.
 *
 * @property {object} size - Size variants for the component.
 * @property {string} size.sm - Small size classes.
 * @property {string} size.md - Medium size classes.
 * @property {string} size.lg - Large size classes.
 * @property {string} selected - Classes applied when the component is selected.
 * @property {string} unselected - Classes applied when the component is unselected.
 */
export const BaseStyle = {
  size: {
    sm: "h-fit w-fit py-2 px-3 max-w-32 max-h-10",
    md: "h-fit w-fit py-3 px-4 max-w-40 max-h-12",
    lg: "h-fit w-fit py-4 px-5 max-w-48 max-h-14",
  },
  selected: "bg-primary",
  unselected: "bg-opacity-0",
};

/**
 * LabelStyle contains style definitions for label components, including sizing and selection states.
 *
 * @property {object} size - Size variants for the label.
 * @property {string} size.sm - Small text size.
 * @property {string} size.md - Medium text size.
 * @property {string} size.lg - Large text size.
 * @property {string} selected - Classes applied when the label is selected.
 * @property {string} unselected - Classes applied when the label is unselected.
 */
export const LabelStyle = {
  size: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  },
  selected: "text-background",
  unselected: "text-primary",
};
