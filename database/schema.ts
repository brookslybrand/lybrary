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

// GOA2 Scheduling Tool Tables
export const goa2Users = sqliteTable("goa2_users", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
});

export const goa2TimeSlots = sqliteTable("goa2_time_slots", {
  id: integer().primaryKey({ autoIncrement: true }),
  date: text().notNull(), // ISO date string format
  startTime: text().notNull(), // Time in HH:MM format
  endTime: text().notNull(), // Time in HH:MM format
  description: text(),
});

export const goa2UserTimeSlots = sqliteTable(
  "goa2_user_time_slots",
  {
    userId: integer()
      .notNull()
      .references(() => goa2Users.id),
    timeSlotId: integer()
      .notNull()
      .references(() => goa2TimeSlots.id),
  },
  (table) => [primaryKey({ columns: [table.userId, table.timeSlotId] })],
);

// Relations
export const goa2UsersRelations = relations(goa2Users, ({ many }) => ({
  timeSlots: many(goa2UserTimeSlots),
}));

export const goa2TimeSlotsRelations = relations(goa2TimeSlots, ({ many }) => ({
  users: many(goa2UserTimeSlots),
}));

export const goa2UserTimeSlotsRelations = relations(
  goa2UserTimeSlots,
  ({ one }) => ({
    user: one(goa2Users, {
      fields: [goa2UserTimeSlots.userId],
      references: [goa2Users.id],
    }),
    timeSlot: one(goa2TimeSlots, {
      fields: [goa2UserTimeSlots.timeSlotId],
      references: [goa2TimeSlots.id],
    }),
  }),
);
