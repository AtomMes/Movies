import { useGetMovies } from "@/hooks/api/useMoviesApi";
import { useDebounce } from "@/hooks/utils/useFetchUtils";
import { useState } from "react";

export const useHomeState = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [requestQuery, setRequestQuery] = useState("");
  const [query, setQuery] = useState("");

  const { data: movies } = useGetMovies(currentPage, requestQuery);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = () => {
    if (query === requestQuery) return;
    setCurrentPage(1);
    setRequestQuery(query);
  };

  useDebounce(query, 700, handleSubmit);

  return {
    query,
    setQuery,
    currentPage,
    movies,
    handleSubmit,
    handlePageChange,
  };
};
