ALTER TABLE `items` ADD `iron` integer;--> statement-breakpoint
ALTER TABLE `items` ADD `credits` integer;--> statement-breakpoint
ALTER TABLE `items` ADD `gold` integer;--> statement-breakpoint
ALTER TABLE `items` DROP COLUMN `value`;--> statement-breakpoint
ALTER TABLE `items` DROP COLUMN `price`;--> statement-breakpoint
ALTER TABLE `items` DROP COLUMN `cost_type`;