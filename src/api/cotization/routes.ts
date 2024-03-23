import { Router } from 'express'
import { addCotization, getCotizations, getUserCotizations } from './controller'
import asyncHandler from 'express-async-handler'
const router = Router()

router
  .get('/', asyncHandler(getCotizations))
  .get('/user', asyncHandler(getUserCotizations))
  .post('/', asyncHandler(addCotization))

export default router
