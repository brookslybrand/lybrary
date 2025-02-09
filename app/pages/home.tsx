import type { Route } from "./+types/home";
import { Link } from "react-router";
import { database } from "~/modules/db.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lybrary - Board Game Collection" },
    {
      name: "description",
      content:
        "Digital board game library and ranking system for the Lybrand family collection",
    },
  ];
}

export async function loader() {
  const db = database();

  const games = await db.query.boardGames.findMany({
    columns: {
      id: true,
      name: true,
      minPlayers: true,
      maxPlayers: true,
      minTime: true,
      maxTime: true,
      complexity: true,
    },
    with: {
      mechanisms: {
        with: {
          mechanism: true,
        },
      },
    },
  });

  return { games };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Lybrary</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          A digital board game library and ranking system for the Lybrand
          family's collection of {loaderData.games.length} board games.
        </p>
      </div>

      <div className="grid gap-4">
        {loaderData.games.map((game) => (
          <Link
            key={game.id}
            to={`/games/${game.id}`}
            className="block p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors dark:border-gray-700 dark:hover:border-blue-400"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <p>
                    {game.minPlayers === game.maxPlayers
                      ? `${game.minPlayers} players`
                      : `${game.minPlayers}-${game.maxPlayers} players`}
                  </p>
                  <p>
                    {game.minTime === game.maxTime
                      ? `${game.minTime} minutes`
                      : `${game.minTime}-${game.maxTime} minutes`}
                  </p>
                  {game.complexity && <p>Complexity: {game.complexity}/5</p>}
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {game.mechanisms.length} mechanisms
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
