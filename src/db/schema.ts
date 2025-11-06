import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

// Enum para géneros
export enum Genres {
  MAN = 'man',
  WOMAN = 'woman',
}

// USER
export const User = sqliteTable('User', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text().notNull(),
  password: text().notNull(),
  genre: text().$type<Genres>().notNull(),
  avatar: text().notNull(),
});

// PARTICIPANT
export const Participant = sqliteTable('Participant', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  firstName: text().notNull(),
  middleName: text(),
  lastName: text().notNull(),
  secondLastName: text(),
  genre: text().$type<Genres>().notNull(),
  bornDate: text().notNull(),
  createdAt: text().notNull(),
  updatedAt: text().notNull(),

  userId: text()
    .notNull()
    .references(() => User.id),
});

// EXERCISE
export const Exercise = sqliteTable('Exercise', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text().notNull(),
  description: text(),
  materials: text(),
});

// EXERCISE_LOG
export const ExerciseLog = sqliteTable('ExerciseLog', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  date: text().notNull(),
  result: text(),
  exerciseId: text()
    .notNull()
    .references(() => Exercise.id),
  participantId: text()
    .notNull()
    .references(() => Participant.id),
});

// DISEASE
export const Disease = sqliteTable('Disease', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text().notNull(),
});

// TAG
export const Tag = sqliteTable('Tag', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text().notNull(),
});

// PARTICIPANT_DISEASES (Many-to-Many)
export const ParticipantDiseases = sqliteTable('ParticipantDiseases', {
  participantId: text()
    .notNull()
    .references(() => Participant.id),
  diseaseId: text()
    .notNull()
    .references(() => Disease.id),
});

// PARTICIPANT_TAGS (Many-to-Many)
export const ParticipantTags = sqliteTable('ParticipantTags', {
  participantId: text()
    .notNull()
    .references(() => Participant.id),
  tagId: text()
    .notNull()
    .references(() => Tag.id),
});
