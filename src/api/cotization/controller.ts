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

    const cotizations = await CotizationModel.find<Cotization>({ userId })

    /**
     * Get data to graphics
     */

    const numberOfQuotes = cotizations.length
    const quotes = cotizations.map(({ id, brand, model, fuelType, usage, price }) => ({
      id,
      brand,
      model,
      fuelType,
      usage,
      price
    }))

    const brands = quotes.map(quote => quote.brand)
    const uniques = [...new Set(brands)]

    const mappedQuotes = uniques.map(brand => ({
      name: brand,
      value: quotes.filter(quote => quote.brand === brand).length
    }))

    const sortted = [...mappedQuotes].sort((a, b) => b.value - a.value)
    const top3Brands = sortted.slice(0, 3)

    res.json({
      numberOfQuotes,
      top3Brands,
      quotes
    })
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

    if (models == null) {
      res.status(400).json({ error: true, message: 'Bad request' })
      return
    }

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
