import type { IGetMoviesResponse, IMakeNoteRequest, IMovie } from "@/types/movies";
import { apiClient } from "../lib/axios";

export const moviesService = {
  useGetMovies: async (
    page: number,
    query?: string,
  ): Promise<IGetMoviesResponse> => {
    const params: Record<string, string|number> = { page };
    if (query) {
      params.query = query;
    }

    const response = await apiClient.get(`/movies`, { params });
    return response.data;
  },
  getMovie: async (movieId: string): Promise<IMovie> => {
    const response = await apiClient.get(`/movies/${movieId}`);
    return response.data;
  },

  makeNote: async (body:IMakeNoteRequest) => {
    const response = await apiClient.post(`/movies/note`, body);
    return response.data;
  },
};
