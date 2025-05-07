CREATE TABLE `players` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`level` integer NOT NULL,
	`class_type` text NOT NULL,
	`hp` integer NOT NULL,
	`max_hp` integer NOT NULL,
	`energy` integer NOT NULL,
	`max_energy` integer NOT NULL,
	`stamina` integer NOT NULL,
	`strength` integer NOT NULL,
	`defense` integer NOT NULL,
	`agility` integer NOT NULL,
	`intelligence` integer NOT NULL,
	`luck` integer NOT NULL,
	`credits` integer NOT NULL,
	`experience` integer NOT NULL,
	`next_level_exp` integer NOT NULL,
	`fights_won` integer NOT NULL,
	`fights_lost` integer NOT NULL,
	`missions_completed` integer NOT NULL,
	`missions_failed` integer NOT NULL,
	`equipped_weapon` text NOT NULL,
	`equipped_armor` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);