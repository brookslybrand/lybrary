ALTER TABLE `boardGames` RENAME TO `board_games`;--> statement-breakpoint
ALTER TABLE `guestBook` RENAME TO `guest_book`;--> statement-breakpoint
DROP INDEX `guestBook_email_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `guest_book_email_unique` ON `guest_book` (`email`);