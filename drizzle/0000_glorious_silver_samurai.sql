CREATE TABLE `achievements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `achievements_name_unique` ON `achievements` (`name`);--> statement-breakpoint
CREATE TABLE `player_achievements` (
	`player_id` integer NOT NULL,
	`achievement_id` integer NOT NULL,
	`earned` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`achievement_id`) REFERENCES `achievements`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
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
CREATE TABLE `items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`iron` integer DEFAULT 0,
	`credits` integer,
	`gold` integer,
	`rarity` text NOT NULL,
	`content_type` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `armor` (
	`item_id` integer PRIMARY KEY NOT NULL,
	`defense_bonus` integer NOT NULL,
	`special_effect` text,
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
CREATE TABLE `mining_nodes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`parent_id` integer DEFAULT 'null',
	`name` text NOT NULL,
	`description` text NOT NULL,
	`rarity` text NOT NULL,
	`yield_amount` integer NOT NULL,
	`cooldown` integer NOT NULL,
	FOREIGN KEY (`parent_id`) REFERENCES `mining_nodes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `player_resources` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`player_id` integer NOT NULL,
	`mining_node_id` integer NOT NULL,
	`quantity` integer DEFAULT 0 NOT NULL,
	`last_mined_at` integer DEFAULT 'null',
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`mining_node_id`) REFERENCES `mining_nodes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `player_research` (
	`player_id` integer NOT NULL,
	`research_node_id` integer NOT NULL,
	`status` text DEFAULT 'locked' NOT NULL,
	`started_at` integer,
	`completed_at` integer,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`research_node_id`) REFERENCES `research_nodes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `research_nodes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`parent_id` integer,
	`name` text NOT NULL,
	`level` integer NOT NULL,
	`description` text NOT NULL,
	`x` integer NOT NULL,
	`y` integer NOT NULL,
	FOREIGN KEY (`parent_id`) REFERENCES `research_nodes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `npc_interactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`npc_id` integer NOT NULL,
	`interaction_type` text NOT NULL,
	FOREIGN KEY (`npc_id`) REFERENCES `npcs`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `npc_items_for_sale` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`npc_id` integer NOT NULL,
	`item_id` integer NOT NULL,
	`quantity` integer DEFAULT 0,
	`price` integer NOT NULL,
	FOREIGN KEY (`npc_id`) REFERENCES `npcs`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `npcs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`avatar` text NOT NULL,
	`role` text NOT NULL,
	`location` text NOT NULL,
	`bio` text,
	`tooltip` text
);
