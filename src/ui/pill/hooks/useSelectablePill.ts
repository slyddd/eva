import { useState, useCallback } from "react";

/**
 * Props for the {@link useSelectablePill} hook.
 */
interface UseSelectablePillProps {
  /**
   * Whether the pill is initially selected.
   * @default !selectable
   */
  initialSelected?: boolean;
  /**
   * Whether the pill is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the pill is selectable.
   * @default false
   */
  selectable?: boolean;
}

/**
 * React hook to manage the selection state of a pill component.
 *
 * @param props - {@link UseSelectablePillProps}
 * @returns An object containing:
 * - `selected`: Whether the pill is currently selected.
 * - `setSelected`: Setter for the selected state.
 * - `handlePress`: Callback to toggle selection if enabled and selectable.
 */
export function useSelectablePill({
  disabled = false,
  selectable = false,
  initialSelected = !selectable,
}: UseSelectablePillProps) {
  const [selected, setSelected] = useState(initialSelected);

  /**
   * Handles press events to toggle the selected state.
   * Does nothing if the pill is disabled or not selectable.
   */
  const handlePress = useCallback(() => {
    if (disabled || !selectable) return;
    setSelected((s) => !s);
  }, [disabled, selectable]);

  return { selected, setSelected, handlePress };
}
