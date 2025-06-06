import { moviesService } from "@/services/moviesService";
import type { IMakeNoteRequest } from "@/types/movies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const movieKeys = {
  getMovies: () => ["get-movies"] as const,
  getMoviesWithQuery: (page: number, query?: string) =>
    [...movieKeys.getMovies(), page, query] as const,
  getMovie: (movieId: string) => ["movie", movieId] as const,
};

export const useGetMovies = (page: number, query?: string) => {
  return useQuery({
    queryKey: movieKeys.getMoviesWithQuery(page, query),
    queryFn: () => moviesService.useGetMovies(page, query),
  });
};

export const useGetMovie = (movieId: string) => {
  return useQuery({
    queryKey: movieKeys.getMovie(movieId),
    queryFn: () => moviesService.getMovie(movieId),
  });
};

export const useMakeNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: IMakeNoteRequest) => moviesService.makeNote(body),
    onSuccess: (_, meta) => {
      queryClient.invalidateQueries({
        queryKey: movieKeys.getMovie(meta.movieId),
      });
    },
  });
};
