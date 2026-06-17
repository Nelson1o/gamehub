import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Game } from "../types";

type Favorites = {
  favorites: Game[];
  toggleFavorite: (game: Game) => void;
  isFavorite: (gameId: number) => boolean;
};

export const useFavorites = create<Favorites>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (game) =>
        set((state) => {
          const exists = state.favorites.some((g) => g.id === game.id);
          return {
            favorites: exists
              ? state.favorites.filter((g) => g.id !== game.id)
              : [...state.favorites, game],
          };
        }),
      isFavorite: (gameId) => get().favorites.some((g) => g.id === gameId),
    }),
    {
      name: "favorites",
    }
  )
);
