CREATE TABLE `goa2_time_slots` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`start_time` text NOT NULL,
	`end_time` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `goa2_user_time_slots` (
	`user_id` integer NOT NULL,
	`time_slot_id` integer NOT NULL,
	PRIMARY KEY(`user_id`, `time_slot_id`),
	FOREIGN KEY (`user_id`) REFERENCES `goa2_users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`time_slot_id`) REFERENCES `goa2_time_slots`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `goa2_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `goa2_users_name_unique` ON `goa2_users` (`name`);