CREATE TABLE `boardGames` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`min_players` integer NOT NULL,
	`max_players` integer NOT NULL,
	`min_time` integer NOT NULL,
	`max_time` integer NOT NULL,
	`complexity` integer NOT NULL
);
