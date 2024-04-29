import { Request, Response } from 'express'

export default function (_req: Request, res: Response): void {
  res.status(404).json({
    error: true,
    message: 'Not found'
  })
}
