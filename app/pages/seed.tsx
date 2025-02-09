import { Form, useLoaderData } from "react-router";
import { database } from "~/modules/db.server";
import { boardGames, mechanisms, boardGameMechanisms } from "~/database/schema";

// Import games data
import gamesData from "../../database/raw/games.json";
import type { Route } from "./+types/seed";

const BATCH_SIZE = 10;

async function processBatch<T, R>(
  items: T[],
  batchSize: number,
  processor: (batch: T[]) => Promise<R[]>,
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    results.push(...(await processor(batch)));
  }
  return results;
}

export async function loader() {
  const db = database();
  const games = await db.query.boardGames.findMany({
    orderBy: (games) => games.name,
    with: {
      mechanisms: {
        with: {
          mechanism: true,
        },
      },
    },
  });

  const allMechanisms = await db.query.mechanisms.findMany({
    orderBy: (mechanisms) => mechanisms.name,
  });

  return { games, mechanisms: allMechanisms };
}

export async function action() {
  const db = database();

  // Get existing games and mechanisms to avoid duplicates
  const existingGames = await db.query.boardGames.findMany({
    columns: { name: true },
  });
  const existingNames = new Set(existingGames.map((g) => g.name));

  const existingMechanisms = await db.query.mechanisms.findMany();
  const mechanismMap = new Map(existingMechanisms.map((m) => [m.name, m.id]));

  // Filter out games that already exist
  const newGames = gamesData.filter((game) => !existingNames.has(game.name));

  if (newGames.length === 0) {
    return { message: "No new games to add" };
  }

  // First, insert any new mechanisms in batches
  const uniqueMechanisms = new Set(newGames.flatMap((g) => g.mechanisms));
  const newMechanisms = Array.from(uniqueMechanisms).filter(
    (m) => !mechanismMap.has(m),
  );

  const insertedMechanisms = await processBatch(
    newMechanisms,
    BATCH_SIZE,
    async (batch) => {
      const inserted = await db
        .insert(mechanisms)
        .values(batch.map((name) => ({ name })))
        .returning();
      inserted.forEach((m) => mechanismMap.set(m.name, m.id));
      return inserted;
    },
  );

  // Insert games in batches
  const insertedGames = await processBatch(
    newGames,
    BATCH_SIZE,
    async (batch) => {
      const games = await db
        .insert(boardGames)
        .values(
          batch.map((game) => ({
            name: game.name,
            description: game.description,
            minPlayers: game.minPlayers,
            maxPlayers: game.maxPlayers,
            minTime: game.minTime,
            maxTime: game.maxTime,
            complexity: game.complexity,
          })),
        )
        .returning();

      // Create and insert game-mechanism relationships
      const relationships = batch.flatMap((game, idx) =>
        game.mechanisms.map((mechanismName) => ({
          boardGameId: games[idx].id,
          mechanismId: mechanismMap.get(mechanismName)!,
        })),
      );

      await processBatch(
        relationships,
        BATCH_SIZE,
        async (relationshipBatch) => {
          await db.insert(boardGameMechanisms).values(relationshipBatch);
          return relationshipBatch;
        },
      );

      return games;
    },
  );

  return { message: `Added ${insertedGames.length} new games` };
}

export default function SeedRoute({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { games, mechanisms } = loaderData;

  return (
    <div className="p-4">
      {actionData?.message && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-sm">
          {actionData.message}
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Games Database ({games.length})
          </h1>
          <p className="text-gray-600">Mechanisms: {mechanisms.length}</p>
        </div>
        <Form method="post">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-sm"
          >
            Seed Games
          </button>
        </Form>
      </div>

      <div className="grid gap-4">
        {games.map((game) => (
          <div
            key={game.id}
            className="border p-4 rounded-sm shadow-sm hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">{game.name}</h2>
            {game.description && (
              <p className="text-gray-600 mt-2">{game.description}</p>
            )}
            <div className="mt-2 text-sm text-gray-500">
              {game.minPlayers}-{game.maxPlayers} players · {game.minTime}-
              {game.maxTime} min · Complexity: {game.complexity ?? "N/A"}
            </div>
            {game.mechanisms.length > 0 && (
              <div className="mt-2 flex gap-2 flex-wrap">
                {game.mechanisms.map(({ mechanism }) => (
                  <span
                    key={mechanism.id}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                  >
                    {mechanism.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
