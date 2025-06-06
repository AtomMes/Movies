import { MovieCard } from "@/pages/home/components/movie-card";
import type { IMovie } from "@/types/movies";

interface IMovieGridProps {
  movies: IMovie[];
}

export const MovieGrid = ({ movies }: IMovieGridProps) => {
  return (
    <div className="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
