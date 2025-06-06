import { ROUTES } from "@/constants";
import type { IMovie } from "@/types/movies";
import { formatDate } from "@/utils/dateFormatters";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface IMovieCardProps {
  movie: IMovie;
}

export const MovieCard = ({ movie }: IMovieCardProps) => {
  return (
    <Link to={ROUTES.movie.replace(":id", movie.id.toString())}>
      <div className="bg-card flex h-full flex-col overflow-auto rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <div className="relative h-full overflow-hidden">
          {movie.poster_path ? (
            <img
              src={movie.poster_path} 
              alt={movie.title}
              className="h-full object-covers"
            />
          ) : (
            <div className="bg-muted flex h-full w-full items-center justify-center">
              <span className="text-neutral-500">No image available</span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="mb-1 line-clamp-1 text-lg font-semibold">
            {movie.title}
          </h3>
          <div className="mb-2 flex items-center">
            <Star
              className="mr-1 h-4 w-4 text-yellow-500"
              fill="currentColor"
            />
            <span className="text-sm">{movie.vote_average.toFixed(1)}</span>
            <span className="ml-2 text-xs text-neutral-500">
              ({movie.vote_count} votes)
            </span>
          </div>
          <p className="mb-2 line-clamp-3 flex-1 text-sm text-neutral-500">
            {movie.overview}
          </p>
          <div className="text-xs text-neutral-500">
            Release: {formatDate(movie.release_date)}
          </div>
        </div>
      </div>
    </Link>
  );
};
