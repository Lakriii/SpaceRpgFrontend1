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
