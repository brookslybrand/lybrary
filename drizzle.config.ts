// More work to do here: https://kevinkipp.com/blog/going-full-stack-on-astro-with-cloudflare-d1-and-drizzle/

import type { Config } from "drizzle-kit";

export default process.env.LOCAL_DB_PATH
  ? ({
      schema: "./database/schema.ts",
      dialect: "sqlite",
      dbCredentials: {
        url: process.env.LOCAL_DB_PATH,
      },
    } satisfies Config)
  : ({
      out: "./drizzle",
      schema: "./database/schema.ts",
      dialect: "sqlite",
      driver: "d1-http",
      dbCredentials: {
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
        databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
        token: process.env.CLOUDFLARE_D1_TOKEN!,
      },
    } satisfies Config);
