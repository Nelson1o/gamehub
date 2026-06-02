type Game = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
};

export type GamesResponse = {
  count: number;
  results: Game[];
  next: null | string;
  previous: null | string;
};
