CREATE TABLE `board_game_mechanisms` (
	`board_game_id` integer NOT NULL,
	`mechanism_id` integer NOT NULL,
	PRIMARY KEY(`board_game_id`, `mechanism_id`),
	FOREIGN KEY (`board_game_id`) REFERENCES `board_games`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`mechanism_id`) REFERENCES `mechanisms`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `mechanisms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `mechanisms_name_unique` ON `mechanisms` (`name`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_board_games` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`min_players` integer NOT NULL,
	`max_players` integer NOT NULL,
	`min_time` integer NOT NULL,
	`max_time` integer NOT NULL,
	`complexity` integer
);
--> statement-breakpoint
INSERT INTO `__new_board_games`("id", "name", "description", "min_players", "max_players", "min_time", "max_time", "complexity") SELECT "id", "name", "description", "min_players", "max_players", "min_time", "max_time", "complexity" FROM `board_games`;--> statement-breakpoint
DROP TABLE `board_games`;--> statement-breakpoint
ALTER TABLE `__new_board_games` RENAME TO `board_games`;--> statement-breakpoint
PRAGMA foreign_keys=ON;