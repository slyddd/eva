import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { batteries } from '@data/batteries';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../../drizzle/migrations';
import { Exercise } from './schema';

const expo = SQLite.openDatabaseSync('db.db', { enableChangeListener: true });

export const db = drizzle(expo);

export function useDrizzle() {
  return useMigrations(db, migrations);
}

// Carga los ejercicios de batteries a la tabla Exercise usando insert or ignore
export async function loadExercises() {
  const exercises = batteries.flatMap((battery) => battery.excercises);

  for (const execercise of exercises) {
    const materials = JSON.stringify(execercise.materials ?? []);

    await db
      .insert(Exercise)
      .values({
        id: execercise.id,
        name: execercise.name,
        description: execercise.description ?? '',
        materials: materials,
      })
      .onConflictDoNothing();
  }
}
