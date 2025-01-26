import { createContext, provide, pull } from "@ryanflorence/async-provider";

import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "~/database/schema";
import type { Route } from "../+types/root";

let dbContext = createContext<DrizzleD1Database<typeof schema>>();

export function dbMiddleware({ request, context, next }: Route.MiddlewareArgs) {
  const db = drizzle(context.cloudflare.env.DB, { schema });
  return provide([[dbContext, db]], async () => {
    try {
      let res = (await next()) as Response;
      return res;
    } catch (e) {
      console.log("session middleware error", request.url);
      console.log(e);
      return new Response("Oops, something went wrong.", { status: 500 });
    }
  });
}

export function database() {
  return pull(dbContext);
}
