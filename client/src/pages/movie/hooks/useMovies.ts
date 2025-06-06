import { useGetMovie, useMakeNote } from "@/hooks/api/useMoviesApi";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useMovies = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading } = useGetMovie(id!);
  const {
    mutateAsync: makeNote,
    isPending: isLoadingNote,
    error: noteError,
  } = useMakeNote();
  const [personalNote, setPersonalNote] = useState("");
  const navigate = useNavigate();

  const handleSaveNote = () => {
    if (personalNote.trim())
      makeNote({ movieId: id!, note: personalNote.trim() }).then(() => {
        setPersonalNote(""); 
      });
  };

  return {
    movie,
    isLoading,
    personalNote,
    setPersonalNote,
    handleSaveNote,
    navigate,
    isLoadingNote,
    noteError,
  };
};
