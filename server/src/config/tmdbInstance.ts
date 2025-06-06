import axios from "axios";
import { envConfig } from "./env";

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: envConfig.tmdb.apiKey,
    language: 'en-US'
  },
  timeout: 5000
});

export default tmdbApi