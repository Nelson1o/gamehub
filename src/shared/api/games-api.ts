import { PAGE_SIZE } from "../config";
import type { GamesResponse } from "../types";
import { api } from "./base-api";

export const gamesApi = {
  searchGames: async (query: string, page: number = 1) => {
    const res = await api.get<GamesResponse>("/games", {
      params: {
        search: query,
        page,
        page_size: PAGE_SIZE,
      },
    });

    return res.data;
  },
};
