// More work to do here: https://kevinkipp.com/blog/going-full-stack-on-astro-with-cloudflare-d1-and-drizzle/

import type { Config } from "drizzle-kit";

const common = {
  schema: "./database/schema.ts",
  dialect: "sqlite",
  casing: "snake_case",
} satisfies Partial<Config>;

export default process.env.LOCAL_DB_PATH
  ? ({
      ...common,
      dbCredentials: {
        url: process.env.LOCAL_DB_PATH,
      },
    } satisfies Config)
  : ({
      ...common,
      out: "./drizzle",
      driver: "d1-http",
      dbCredentials: {
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
        databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
        token: process.env.CLOUDFLARE_D1_TOKEN!,
      },
    } satisfies Config);
