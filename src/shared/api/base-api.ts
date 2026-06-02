import axios from "axios";

const BASE_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});
