export const ROUTES = {
  HOME: "/",
  GAMES: "/games",
  SEARCH: "/search",
  FAVORITES: "/favorites",
  GAMES_DETAILS: "/games/:id",
} as const;

export const LINKS = [{ to: ROUTES.FAVORITES, label: "Избранное" }] as const;
