import { Request, Response, NextFunction } from 'express'
import { USER_ROLES } from '@src/constants'
import CotizationModel from './model'
import UserModel from '@api/user/model'

export async function getCotizations (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { userRole } = req

  try {
    if (userRole !== USER_ROLES.ADMIN) {
      res.status(401).json({ error: true, message: 'Permitido solo a administración' })
      return
    }

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
      res.status(406).json({ error: true, message: 'Ha ocurrido un error' })
      return
    }

    const cotizations = await CotizationModel.find({ userId })
    res.json({ cotizations })
  } catch (error) {
    next(error)
  }
}

export async function preCotization (_: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * Check if there are cotizations
     * if not return 1
     */

    const cotizations = await CotizationModel.find({})
    if (cotizations.length === 0) {
      res.json({ currentCotization: 1 })
      return
    }

    const cotizationNumbers = cotizations.map(cotization => cotization.cotizationNumber)
    res.json({ currentCotization: (cotizationNumbers.at(-1) as number) + 1 })
  } catch (error) {
    next(error)
  }
}

export async function addCotization (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { body, userId } = req

  try {
    const newCotization = new CotizationModel({ ...body, userId })

    await newCotization.save()
    res.status(201).json({ message: 'Cotización agregada correctamente' })
  } catch (error) {
    next(error)
  }
}
