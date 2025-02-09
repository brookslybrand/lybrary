import { type RouteConfig, index, route } from "@react-router/dev/routes";

const routes = [index("routes/home.tsx")] satisfies RouteConfig;

if (process.env.NODE_ENV === "development") {
  routes.push(route("seed", "routes/seed.tsx"));
}

export default routes;
