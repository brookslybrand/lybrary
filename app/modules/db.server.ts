import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "~/database/schema";
import type { Route } from "../+types/root";
import {
  unstable_createContext,
  type unstable_RouterContextProvider,
} from "react-router";
import { cloudflareEnvContext } from "./cloudflare-env-context";

let dbContext = unstable_createContext<DrizzleD1Database<typeof schema>>();

export let dbMiddleware: Route.unstable_MiddlewareFunction = async ({
  context,
}) => {
  let cloudflareEnv = context.get(cloudflareEnvContext);

  let db = drizzle(cloudflareEnv.DB, {
    schema,
    casing: "snake_case",
  });

  context.set(dbContext, db);
};

export function database(context: unstable_RouterContextProvider) {
  return context.get(dbContext);
}
