import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ROUTES } from "@/constants";
import { useGetMe } from "@/hooks/api/useUsersApi";
import { useMovies } from "@/pages/movie/hooks/useMovies";
import { formatDate, formatDateToReadable } from "@/utils/dateFormatters";
import { ArrowLeft, Calendar, Edit3, Save, Star } from "lucide-react";
import { Link } from "react-router-dom";

const MoviePage = () => {
  const {
    movie,
    isLoading,
    personalNote,
    setPersonalNote,
    handleSaveNote,
    navigate,
    isLoadingNote,
    noteError,
  } = useMovies();
  const { data: user } = useGetMe();

  if (isLoading || !movie)
    return (
      <div className="flex h-dvh w-full items-center justify-center">
        <LoadingSpinner className="h-40 w-40" />
      </div>
    );

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Button variant="outline" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Movies
        </Button>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg">
            {movie.poster_path ? (
              <img
                src={movie.poster_path || "/placeholder.svg"}
                alt={movie.title}
                className="w-full object-cover"
              />
            ) : (
              <div className="bg-muted flex h-full w-full items-center justify-center">
                <span className="text-gray-600">No image available</span>
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <h1 className="mb-2 text-3xl font-bold">{movie.title}</h1>

            <div className="mb-4 flex items-center">
              <Star
                className="mr-1 h-5 w-5 text-yellow-500"
                fill="currentColor"
              />
              <span className="text-lg font-semibold">
                {movie.vote_average?.toFixed(1)}
              </span>
              <span className="ml-2 text-sm text-gray-600">
                ({movie.vote_count} votes)
              </span>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-600">Release Date</p>
                <p>{formatDate(movie.release_date)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Runtime</p>
                <p>{movie.runtime ? `${movie.runtime} minutes` : "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Original Language</p>
                <p>{movie.original_language?.toUpperCase()}</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="mb-2 text-xl font-semibold">Overview</h2>
              <p className="text-gray-600">
                {movie.overview || "No overview available."}
              </p>
            </div>
            <div className="border-t pt-6">
              <h2 className="mb-4 text-xl font-semibold">Personal Notes</h2>
              {user?.name && movie.notes && movie.notes.length > 0 && (
                <div className="mb-6 space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Your Previous Notes
                  </h3>
                  {movie.notes.map((note) => (
                    <Card
                      key={note._id}
                      className="border-l-4 border-l-blue-500"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="mr-1 h-4 w-4" />
                            {formatDateToReadable(note.createdAt)}
                          </div>
                          {note.updatedAt !== note.createdAt && (
                            <div className="flex items-center text-xs text-gray-400">
                              <Edit3 className="mr-1 h-3 w-3" />
                              Updated {formatDateToReadable(note.updatedAt)}
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="leading-relaxed whitespace-pre-wrap text-gray-700">
                          {note.note}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="space-y-4 text-lg font-medium text-gray-800">
                <div>
                  {user?.name ? (
                    <p>Add a new note</p>
                  ) : (
                    <p>
                      <Link
                        to={ROUTES.login}
                        className="text-red-800 underline"
                      >
                        Login
                      </Link>{" "}
                      to add a note
                    </p>
                  )}
                </div>
                {noteError && (
                  <p className="text-sm text-red-500">{noteError.message}</p>
                )}
                <Textarea
                  placeholder="Write your personal notes or review about this movie..."
                  className="min-h-[150px]"
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  disabled={!user?.name || isLoadingNote}
                />
                <Button
                  onClick={handleSaveNote}
                  disabled={!user?.name || isLoadingNote}
                >
                  <Save className="mr-2 h-4 w-4" /> Save Note
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MoviePage;
