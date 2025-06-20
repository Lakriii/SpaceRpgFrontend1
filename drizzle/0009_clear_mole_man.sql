PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_items` (
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
INSERT INTO `__new_items`("id", "name", "description", "iron", "credits", "gold", "rarity", "content_type") SELECT "id", "name", "description", "iron", "credits", "gold", "rarity", "content_type" FROM `items`;--> statement-breakpoint
DROP TABLE `items`;--> statement-breakpoint
ALTER TABLE `__new_items` RENAME TO `items`;--> statement-breakpoint
PRAGMA foreign_keys=ON;