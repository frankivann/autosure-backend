import { Request, Response, NextFunction } from 'express'
import UserModel from '@api/user/model'
import CotizationModel from './model'
import type { Cotization } from '@src/types/global'
import { CARS } from '@src/constants'

export async function getCotizations (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const cotizations = await CotizationModel.find({}).populate('userId', {
      firstname: 1,
      lastname: 1
    })
    res.json({ cotizations })
  } catch (error) {
    next(error)
  }
}

export async function getUserCotizations (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { userId } = req

  try {
    /**
     * Check if user exists.
     */

    const user = await UserModel.findById(userId)
    if (user == null) {
      res.status(406).json({ error: true, message: 'An error has occurred' })
      return
    }

    const cotizations = await CotizationModel.find({ userId })
    res.json({ cotizations })
  } catch (error) {
    next(error)
  }
}

export async function addCotization (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { body, userId } = req
  const { brand, model }: Cotization = body as Cotization

  try {
    /**
     * Validate cars model
     */
    const models = CARS[brand]
    const isValidModel = models.includes(model)

    if (!isValidModel) {
      res.status(400).json({ error: true, message: 'Bad request' })
      return
    }

    const newCotization = new CotizationModel({ ...body, userId })

    await newCotization.save()
    res.status(201).json({ message: 'Quote added successfully' })
  } catch (error) {
    next(error)
  }
}
