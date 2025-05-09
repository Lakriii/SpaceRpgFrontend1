CREATE TABLE `achievements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `achievements_name_unique` ON `achievements` (`name`);--> statement-breakpoint
CREATE TABLE `armor` (
	`item_id` integer PRIMARY KEY NOT NULL,
	`defense_bonus` integer NOT NULL,
	`special_effect` text,
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`value` integer,
	`rarity` text NOT NULL,
	`content_type` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `jewelry` (
	`item_id` integer PRIMARY KEY NOT NULL,
	`origin` text NOT NULL,
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `market_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`item_id` integer NOT NULL,
	`market_type` text NOT NULL,
	`location` text,
	`price` integer NOT NULL,
	`delivery_time` integer,
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `player_achievements` (
	`player_id` integer NOT NULL,
	`achievement_id` integer NOT NULL,
	`earned` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`achievement_id`) REFERENCES `achievements`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `player_inventory` (
	`player_id` integer NOT NULL,
	`item_id` integer NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	`is_equipped` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
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
	`reputation` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `quest_items` (
	`item_id` integer PRIMARY KEY NOT NULL,
	`quest_name` text NOT NULL,
	`is_consumed` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `weapons` (
	`item_id` integer PRIMARY KEY NOT NULL,
	`base_damage` integer NOT NULL,
	`critical_chance` integer NOT NULL,
	`critical_damage_bonus` integer NOT NULL,
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE cascade
);
