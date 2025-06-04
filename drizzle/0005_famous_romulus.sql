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
	`player_id` integer NOT NULL,
	`mining_node_id` integer NOT NULL,
	`quantity` integer DEFAULT 0 NOT NULL,
	`last_mined_at` integer DEFAULT 'null',
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`mining_node_id`) REFERENCES `mining_nodes`(`id`) ON UPDATE no action ON DELETE cascade
);
