import { readFileSync, writeFileSync } from "fs";
import { parse } from "csv-parse/sync";
import path from "path";

const csvPath = path.join(process.cwd(), "database", "raw", "games.csv");
const jsonPath = path.join(process.cwd(), "database", "raw", "games.json");

const csvContent = readFileSync(csvPath, "utf-8");

const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
});

// Transform the data
const games = records.map((game: any) => ({
  name: game.name,
  description: game.description,
  minPlayers: parseInt(game.min_players),
  maxPlayers: parseInt(game.max_players),
  minTime: parseInt(game.min_time),
  maxTime: parseInt(game.max_time),
  complexity: game.complexity === "?" ? null : parseFloat(game.complexity),
  mechanisms: game.mechanisms.split("\n").filter(Boolean),
}));

writeFileSync(jsonPath, JSON.stringify(games, null, 2));
console.log(`Converted ${games.length} games to JSON format`);
