import { Router } from 'express'
import { getUsers } from './controller'
import asyncHandler from 'express-async-handler'
const router = Router()

router
  .get('/', asyncHandler(getUsers))

export default router
