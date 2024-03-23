import { Router } from 'express'
import { addCotization, getCotizations, getUserCotizations, preCotization } from './controller'
import asyncHandler from 'express-async-handler'
const router = Router()

router
  .get('/', asyncHandler(getCotizations))
  .get('/user', asyncHandler(getUserCotizations))
  .get('/pre', asyncHandler(preCotization))
  .post('/', asyncHandler(addCotization))

export default router
