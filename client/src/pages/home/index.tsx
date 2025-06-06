import { Navbar } from "@/components/shared/navbar";
import SearchBar from "@/components/shared/search-bar";
import { MovieGrid } from "@/pages/home/components/movie-grid";
import { MoviesPagination } from "@/pages/home/components/movie-pagination";
import { useHomeState } from "@/pages/home/hooks/useHomeState";

const HomePage = () => {
  const {
    query,
    setQuery,
    currentPage,
    movies,
    handleSubmit,
    handlePageChange,
  } = useHomeState();

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="mb-8 text-3xl font-bold">Movie Discovery</h1>
        </div>
        <SearchBar onSearch={handleSubmit} query={query} setQuery={setQuery} />
        <MovieGrid movies={movies?.results || []} />
        {movies && (
          <MoviesPagination
            currentPage={currentPage}
            totalPages={movies.total_pages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
};

export default HomePage;
