/**
 * Combines class names into a single string, filtering out falsy values.
 *
 * @param {...(string | boolean | undefined | null)} args - The class names to combine.
 * @returns {string} The combined class names as a single string.
 */
export function clsx(...args: (string | boolean | undefined | null)[]): string {
  return args.filter(Boolean).join(" ").trim();
}
