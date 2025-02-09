import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const boardGames = sqliteTable("board_games", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
  minPlayers: integer().notNull(),
  maxPlayers: integer().notNull(),
  minTime: integer().notNull(),
  maxTime: integer().notNull(),
  complexity: integer(),
});

export const boardGamesRelations = relations(boardGames, ({ many }) => ({
  mechanisms: many(boardGameMechanisms),
}));

export const mechanisms = sqliteTable("mechanisms", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
});

export const mechanismsRelations = relations(mechanisms, ({ many }) => ({
  games: many(boardGameMechanisms),
}));

export const boardGameMechanisms = sqliteTable(
  "board_game_mechanisms",
  {
    boardGameId: integer()
      .notNull()
      .references(() => boardGames.id),
    mechanismId: integer()
      .notNull()
      .references(() => mechanisms.id),
  },
  (table) => [primaryKey({ columns: [table.boardGameId, table.mechanismId] })],
);

export const boardGameMechanismsRelations = relations(
  boardGameMechanisms,
  ({ one }) => ({
    game: one(boardGames, {
      fields: [boardGameMechanisms.boardGameId],
      references: [boardGames.id],
    }),
    mechanism: one(mechanisms, {
      fields: [boardGameMechanisms.mechanismId],
      references: [mechanisms.id],
    }),
  }),
);
