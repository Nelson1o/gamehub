export type Short_Screenshots = {
  id: number;
  image: string;
};

export type Game = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  short_screenshots: Short_Screenshots[];
};

export type GamesResponse<T> = {
  count: number;
  results: T[];
  next: null | string;
  previous: null | string;
};

export type SelectData = {
  totalCount: number;
  allGames: Game[];
};

export type GameDetails = Omit<Game, "short_screenshots"> & {
  description_raw: string;
  developers: {
    id: number;
    name: string;
  }[];
  genres: {
    id: number;
    name: string;
  }[];
  parent_platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
    };
  }[];
  platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
    };
  }[];
  publishers: {
    id: number;
    name: string;
  }[];
  website: string;
  metacritic: number;
  metacritic_url?: string;
  playtime: number;
  esrb_rating?: {
    id: number;
    name: string;
    slug: string;
  };
};

export type Trailer = {
  id: number;
  name: string;
  preview: string;
  data: {
    480: string;
    max: string;
  };
};

export type Platforms = {
  id: number;
  name: string;
  slug: string;
};

export type Genres = {
  id: number;
  name: string;
  slug: string;
};

export type SearchFilters = {
  platforms: number[];
  genres: number[];
  metacritic?: number;
};

export type StringSearchFilters = {
  [K in keyof SearchFilters]: string | undefined;
};
