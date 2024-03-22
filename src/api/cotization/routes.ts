import { Router } from 'express'
import { addCotization, getCotizations, getUserCotizations, preCotization } from './controller'
import { authorization } from '@middlewares/authorization'
import asyncHandler from 'express-async-handler'
const router = Router()

router
  .get('/', authorization, asyncHandler(getCotizations))
  .get('/pre', asyncHandler(preCotization))
  .get('/record', authorization, asyncHandler(getUserCotizations))
  .post('/', authorization, asyncHandler(addCotization))

export default router
