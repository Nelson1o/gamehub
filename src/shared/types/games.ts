type Short_Screenshots = {
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

export type GamesResponse = {
  count: number;
  results: Game[];
  next: null | string;
  previous: null | string;
};

export type SelectData = {
  totalCount: number;
  allGames: Game[];
};
