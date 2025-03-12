import {
  createRequestHandler,
  unstable_RouterContextProvider,
} from "react-router";

// @ts-expect-error - no types
import * as build from "virtual:react-router/server-build";

import { cloudflareEnvContext } from "~/modules/cloudflare-env-context";

const handler = createRequestHandler(build);

export default {
  fetch(request: Request, env: Env) {
    try {
      const context = new Map([[cloudflareEnvContext, env]]);
      return handler(
        request,
        context as unknown as unstable_RouterContextProvider,
      );
    } catch (error) {
      console.error(error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
