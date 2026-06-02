export const ROUTES = {
  HOME: "/",
  GAMES: "games",
  FAVORITES: "favorites",
} as const;

export const LINKS = [{ to: ROUTES.FAVORITES, label: "Избранное" }] as const;
