import { Request, Response, NextFunction } from 'express'
import UserModel from './model'

export async function getUsers (_: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const users = await UserModel.find({})
    res.json({ users })
  } catch (error) {
    next(error)
  }
}
