import {
  createContext,
  createRequestHandler,
  RouterContextProvider,
} from "react-router";

declare module "react-router" {
  export interface RouterContextProvider {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export const cloudflareContext = createContext<{
  env: Env;
  ctx: ExecutionContext;
}>();

export default {
  async fetch(request, env, ctx) {
    const context = new RouterContextProvider();

    context.set(cloudflareContext, { env, ctx });

    Object.assign(context, {
      cloudflare: { env, ctx },
    });

    return requestHandler(request, context);
  },
} satisfies ExportedHandler<Env>;
