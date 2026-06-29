import type { Link } from "../types";

export const ROUTES = {
  HOME: "/",
  GAMES: "/games",
  SEARCH: "/search",
  FAVORITES: "/favorites",
  GAMES_DETAILS: "/games/:id",
  RANDOM: "/random",
} as const;

export const LINKS: Link[] = [
  { to: ROUTES.FAVORITES, label: "Избранное" },
  { to: ROUTES.RANDOM, label: "Случайная игра" },
] as const;
