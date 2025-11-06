ALTER TABLE `users_table` RENAME TO `User`;--> statement-breakpoint
ALTER TABLE `User` RENAME COLUMN "name" TO "username";--> statement-breakpoint
ALTER TABLE `User` RENAME COLUMN "email" TO "password";--> statement-breakpoint
ALTER TABLE `User` RENAME COLUMN "age" TO "avatar";--> statement-breakpoint
CREATE TABLE `Disease` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Exercise` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`materials` text
);
--> statement-breakpoint
CREATE TABLE `ExerciseLog` (
	`id` text PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`result` text,
	`exerciseId` text NOT NULL,
	`participantId` text NOT NULL,
	FOREIGN KEY (`exerciseId`) REFERENCES `Exercise`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`participantId`) REFERENCES `Participant`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Participant` (
	`id` text PRIMARY KEY NOT NULL,
	`firstName` text NOT NULL,
	`middleName` text,
	`lastName` text NOT NULL,
	`secondLastName` text,
	`genre` text NOT NULL,
	`bornDate` text NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ParticipantDiseases` (
	`participantId` text NOT NULL,
	`diseaseId` text NOT NULL,
	FOREIGN KEY (`participantId`) REFERENCES `Participant`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`diseaseId`) REFERENCES `Disease`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ParticipantTags` (
	`participantId` text NOT NULL,
	`tagId` text NOT NULL,
	FOREIGN KEY (`participantId`) REFERENCES `Participant`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Tag` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
DROP INDEX `users_table_email_unique`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_User` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`genre` text NOT NULL,
	`avatar` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_User`("id", "username", "password", "genre", "avatar") SELECT "id", "username", "password", "genre", "avatar" FROM `User`;--> statement-breakpoint
DROP TABLE `User`;--> statement-breakpoint
ALTER TABLE `__new_User` RENAME TO `User`;--> statement-breakpoint
PRAGMA foreign_keys=ON;