import type { GamesResponse } from "../types";
import { api } from "./base-api";

export const gamesApi = {
  searchGames: (query: string, page: number = 1) => {
    api.get<GamesResponse>("/games", {
      params: {
        search: query,
        page,
        page_size: 20,
      },
    });
  },
};
