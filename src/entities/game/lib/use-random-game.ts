import { useQuery } from "@tanstack/react-query";

import { gamesApi } from "@/shared/api/games-api";
import type { Game, GameDetails } from "@/shared/types";

export const useRandomGame = () => {
  return useQuery<GameDetails, Error, Game>({
    queryKey: ["random"],
    queryFn: async () => {
      const id = await gamesApi.getRandomGameId();
      const response = await gamesApi.getGameById(id);

      return response;
    },
    select: (game) => {
      return {
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
        released: game.released,
        short_screenshots: [],
      } as Game;
    },
    staleTime: 0,
    enabled: false,
  });
};
