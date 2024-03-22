import { Router } from 'express'
import { signin, signup } from './controller'
import asyncHandler from 'express-async-handler'
const router = Router()

router
  .post('/signup', asyncHandler(signup))
  .post('/signin', asyncHandler(signin))

export default router
