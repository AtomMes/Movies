import { Router } from 'express'
import * as userController from '../controllers/user.controller'
import { authenticate } from '../middleware/authenticate'
import {
  validateLoginUser,
  validateRegisterUser
} from '../validations/user.validation'

const router = Router()

router.post(
  '/register',
  validateRegisterUser,
  userController.registerUserHandler
)
router.post('/login', validateLoginUser, userController.loginUserHandler)
router.get('/me', authenticate, userController.getMeHandler)

export default router
