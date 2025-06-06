import Joi from 'joi'
import { validate } from '../middlewares/validate'

const getMoviesSchema = Joi.object({
  page: Joi.number().min(1).default(1),
  query: Joi.string().optional(),
})

const getMovieSchema = Joi.object({
  id: Joi.string().hex().required(),
})

const makeNoteSchema = Joi.object({
  note: Joi.string().required(),
  movieId: Joi.string().required()
})

export const validateGetMovies = validate(
  getMoviesSchema,
  'query'
)

export const validateGetMovie = validate(getMovieSchema, 'params')
export const validateMakeNote = validate(makeNoteSchema, 'body')