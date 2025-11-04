/**
 * Scale interface representing age and score ranges.
 * @interface Scale
 * @property {number[]} age - An array containing the minimum and maximum age.
 * @property {number[]} score - An array containing the minimum and maximum score.
 */
export interface Scale {
  age: [number, number];
  score: [number, number];
}
