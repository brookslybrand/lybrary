import { type RouteConfig, index, route } from "@react-router/dev/routes";

const routes = [
  index("pages/home.tsx"),
  route("games/:gameId", "pages/game-details.tsx"),
] satisfies RouteConfig;

if (process.env.NODE_ENV === "development") {
  routes.push(route("seed", "pages/seed.tsx"));
}

export default routes;
