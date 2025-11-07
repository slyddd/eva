import { create } from 'zustand';

/**
 * Describes a single exercise entry that the battery store tracks.
 * - id: A unique identifier for the exercise (e.g., a slug or UUID).
 * - value: A numeric value associated with the exercise (e.g., a score or selection).
 */
export interface ExerciseDefinition {
  id: string;
  value: number;
}

/**
 * Shape of the Zustand battery store.
 */
interface BatteryState {
  /**
   * Current list of exercise values keyed by id.
   */
  values: ExerciseDefinition[];

  /**
   * Upserts (adds or updates) the value for a given exercise id.
   * - If an entry with the same id exists, its value is updated.
   * - If not, a new entry is appended.
   */
  defValue: ({ id, value }: ExerciseDefinition) => void;

  /**
   * Clears all stored exercise values.
   */
  resetValues: () => void;
}

/**
 * useBatteryStore
 *
 * A small Zustand store that manages a collection of exercise values keyed by id.
 * Provides:
 * - values: the current list of { id, value } pairs
 * - setValue: upsert by id
 * - resetValues: clear all values
 *
 * Example:
 * const { values, setValue, resetValues } = useBatteryStore();
 * defValue({ id: 'pushups', value: 20 });
 * resetValues();
 */
export const useBatteryStore = create<BatteryState>((set) => ({
  values: [],
  defValue: ({ id, value }) =>
    set((state) => {
      // Look for an existing entry with the same id
      const existingIndex = state.values.findIndex((item) => item.id === id);

      if (existingIndex !== -1) {
        // Update existing value (immutable update)
        const updatedValues = [...state.values];
        updatedValues[existingIndex].value = value;
        return { values: updatedValues };
      } else {
        // Append a new entry if none exists for this id
        return { values: [...state.values, { id, value }] };
      }
    }),
  resetValues: () => set({ values: [] }),
}));
