import { Request, Response, NextFunction } from 'express'
// import { USER_ROLES } from '@src/constants'
import UserModel from '@api/user/model'
import CotizationModel from './model'

export async function getCotizations (req: Request, res: Response, next: NextFunction): Promise<void> {
  // const { userRole } = req

  try {
    // if (userRole !== USER_ROLES.ADMIN) {
    //   res.status(401).json({ error: true, message: 'Permitido solo a administración' })
    //   return
    // }

    const cotizations = await CotizationModel.find({})
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
      res.status(406).json({ error: true, message: 'Ha ocurrido un error' })
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

  try {
    const newCotization = new CotizationModel({ ...body, userId: '65fee13c17ff9e06bfa6df7d' })

    await newCotization.save()
    res.status(201).json({ message: 'Cotización agregada correctamente' })
  } catch (error) {
    next(error)
  }
}
