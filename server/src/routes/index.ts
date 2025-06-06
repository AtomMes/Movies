import { Router } from 'express'
import moviesRoutes from './movies.routes'
import userRoutes from './user.routes'

const router = Router()

router.use('/users', userRoutes)
router.use('/movies', moviesRoutes)

export default router