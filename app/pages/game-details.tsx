import { Link } from "react-router";
import { database } from "~/modules/db.server";
import type { Route } from "./+types/game-details";

export async function loader({ params, context }: Route.LoaderArgs) {
  const db = database(context);
  const gameId = parseInt(params.gameId);

  if (isNaN(gameId)) {
    throw new Response("Invalid game ID", { status: 400 });
  }

  const game = await db.query.boardGames.findFirst({
    where: (games, { eq }) => eq(games.id, gameId),
    with: {
      mechanisms: {
        with: {
          mechanism: true,
        },
      },
    },
  });

  if (!game) {
    throw new Response("Game not found", { status: 404 });
  }

  return { game };
}

export default function GameDetails({ loaderData }: Route.ComponentProps) {
  const { game } = loaderData;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to="/"
        className="inline-block mb-8 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
      >
        ← Back to Games
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold mb-6">{game.name}</h1>

        {game.description && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {game.description}
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Game Details</h2>
            <dl className="space-y-2">
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">
                  Players
                </dt>
                <dd>
                  {game.minPlayers === game.maxPlayers
                    ? `${game.minPlayers} players`
                    : `${game.minPlayers}-${game.maxPlayers} players`}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">
                  Play Time
                </dt>
                <dd>
                  {game.minTime === game.maxTime
                    ? `${game.minTime} minutes`
                    : `${game.minTime}-${game.maxTime} minutes`}
                </dd>
              </div>
              {game.complexity && (
                <div>
                  <dt className="font-medium text-gray-500 dark:text-gray-400">
                    Complexity
                  </dt>
                  <dd>{game.complexity}/5</dd>
                </div>
              )}
            </dl>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Mechanisms</h2>
            <div className="flex flex-wrap gap-2">
              {game.mechanisms.map(({ mechanism }) => (
                <span
                  key={mechanism.id}
                  className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full text-sm"
                >
                  {mechanism.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
