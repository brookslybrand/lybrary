import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "~/database/schema";
import type { Route } from "../+types/root";
import { createContext, type RouterContextProvider } from "react-router";

let dbContext = createContext<DrizzleD1Database<typeof schema>>();

// Cache Drizzle clients per DB instance to avoid recreating on every request
const dbCache = new WeakMap<D1Database, DrizzleD1Database<typeof schema>>();

export let dbMiddleware: Route.MiddlewareFunction = async ({ context }) => {
  let cloudflareEnv = context.cloudflare.env;

  // Check if we already have a cached Drizzle client for this DB instance
  let db = dbCache.get(cloudflareEnv.DB);

  if (!db) {
    // Create and cache the Drizzle client if it doesn't exist
    db = drizzle(cloudflareEnv.DB, {
      schema,
      casing: "snake_case",
    });
    dbCache.set(cloudflareEnv.DB, db);
  }

  context.set(dbContext, db);
};

export function database(context: Readonly<RouterContextProvider>) {
  return context.get(dbContext);
}
