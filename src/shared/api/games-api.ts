import { PAGE_SIZE } from "../config";
import type {
  Game,
  GameDetails,
  GamesResponse,
  Genres,
  Platforms,
  Short_Screenshots,
  StringSearchFilters,
  Trailer,
} from "../types";
import { api } from "./base-api";

export const gamesApi = {
  searchGames: async (
    query: string,
    page: number = 1,
    filters?: StringSearchFilters
  ) => {
    const res = await api.get<GamesResponse<Game>>("/games", {
      params: {
        search: query,
        page,
        page_size: PAGE_SIZE,
        ...filters,
      },
    });

    return res.data;
  },

  getGameById: async (id: number) => {
    const res = await api.get<GameDetails>(`/games/${id}`);

    return res.data;
  },

  getGameScreenshotsById: async (id: number) => {
    const res = await api.get<GamesResponse<Short_Screenshots>>(
      `/games/${id}/screenshots`
    );

    return res.data.results;
  },

  getGameSeriesById: async (id: number, page: number = 1) => {
    const res = await api.get<GamesResponse<Game>>(`/games/${id}/game-series`, {
      params: {
        page,
        page_size: 8,
      },
    });

    return res.data;
  },

  getGameTrailersById: async (id: number) => {
    const res = await api.get<GamesResponse<Trailer>>(`/games/${id}/movies`);

    return res.data.results;
  },

  getPopularGames: async (ordering: string = "-rating", page: number = 1) => {
    const res = await api.get<GamesResponse<Game>>("/games", {
      params: {
        ordering,
        page,
        page_size: PAGE_SIZE,
      },
    });

    return res.data;
  },

  getPlatforms: async () => {
    const res = await api.get<GamesResponse<Platforms>>("/platforms");

    return res.data;
  },

  getGenres: async () => {
    const res = await api.get<GamesResponse<Genres>>("/genres");

    return res.data;
  },
};
