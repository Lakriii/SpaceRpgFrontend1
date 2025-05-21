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
DROP TABLE `jewelry`;--> statement-breakpoint
DROP TABLE `quest_items`;