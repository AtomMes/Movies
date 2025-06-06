import tmdbApi from '../config/tmdbInstance'
import { NoteModel } from '../models/note'
import { IGetMovieResponse, IMovie } from '../types/movies'
import { AppError } from '../utils/error'

export const getMovies = async (
  page: string,
  query?: string
): Promise<IGetMovieResponse> => {
  try {
    const url = query ? `/search/movie` : `/discover/movie`
    const params = query ? { page, query } : { page }

    const response: { data: IGetMovieResponse } = await tmdbApi.get(url, {
      params,
    })

    return response.data
  } catch (error) {
    throw new AppError(500, 'Error fetching movies', (error as Error).message)
  }
}

export const getMovie = async (
  movieId: string,
  userId?: string
): Promise<IMovie> => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`)
    const notes = await NoteModel.find({ movieId, userId })
    return { ...response.data, notes }
  } catch (error) {
    throw new AppError(500, 'Error fetching movie', (error as Error).message)
  }
}

export const makeNote = async (
  movieId: string,
  userId: string,
  note: string
) => {
  try {
    await NoteModel.create({ userId, movieId, note })
    return true
  } catch (error) {
    throw new AppError(500, 'Error making note', (error as Error).message)
  }
}
