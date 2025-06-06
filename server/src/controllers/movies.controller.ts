import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { AuthenticatedRequest } from '../middleware/authenticate'
import { getMovie, getMovies, makeNote } from '../services/movies.service'

export const getMoviesHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { page = '1', query } = req.query
  const movies = await getMovies(page!.toString(), query?.toString())
  const modifiedMovies = movies.results.map((movie) => ({
    ...movie,
    poster_path: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
  }))
  res.status(StatusCodes.CREATED).json({ ...movies, results: modifiedMovies })
}

export const getMovieHandler = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id
  const { id } = req.params
  const movie = await getMovie(id, userId)
  res.status(StatusCodes.OK).json({
    ...movie,
    poster_path: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
  })
}

export const makeNoteHandler = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id } = req.user!
  const { movieId, note } = req.body

  const success = await makeNote(movieId, id, note)
  if (success) res.status(StatusCodes.CREATED).json({ success })
}
