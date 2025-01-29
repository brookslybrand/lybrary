import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const guestBook = sqliteTable("guest_book", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  message: text().notNull(),
});

export const users = sqliteTable("users", {
  id: integer().primaryKey({ autoIncrement: true }),
  firstName: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
});

export const boardGames = sqliteTable("board_games", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
  minPlayers: integer().notNull(),
  maxPlayers: integer().notNull(),
  minTime: integer().notNull(),
  maxTime: integer().notNull(),
  complexity: integer().notNull(),
  // TODO: mechanisms
});
