import { Exercise } from './exercise';

/**
 /**
 * Represents a battery of exercises.
 *
 * @property {string} name - The name of the battery.
 * @property {string} id - The unique identifier for the battery.
 * @property {Exercise[]} excercises - The list of exercises included in the battery.
 * @property {string} description - A brief description of the battery.
 * @property {number} duration - The total duration of the battery in minutes.
 */
export interface Battery {
  name: string;
  id: string;
  excercises: Exercise[];
  description: string;
  duration: number; // in minutes
}
