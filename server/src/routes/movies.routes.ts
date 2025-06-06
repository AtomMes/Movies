import { Router } from 'express'
import * as moviesController from '../controllers/movies.controller'
import { authenticate, authenticateOptional } from '../middleware/authenticate'
import { validateGetMovie, validateGetMovies, validateMakeNote } from '../validations/movies.validation'

const router = Router()

router.get('/', validateGetMovies, moviesController.getMoviesHandler)
router.get('/:id', validateGetMovie, authenticateOptional, moviesController.getMovieHandler)
router.post('/note', authenticate, validateMakeNote, moviesController.makeNoteHandler)

export default router
