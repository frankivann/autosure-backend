import { NextFunction, Request, Response } from 'express'
import { type ErrorHandlerDictionary } from '@src/types/global'

const ERROR_HANDLER: ErrorHandlerDictionary = {
  ValidationError: (res: Response) => {
    res.status(400).json({ erorr: true, message: 'Bad request' })
  },
  SyntaxError: (res: Response) => {
    res.status(400).json({ erorr: true, message: 'Bad request' })
  },
  TokenExpiredError: (res: Response) => {
    res.status(401).json({ error: true, message: 'Sesión expirada' })
  },
  Default: (res: Response) => {
    res.status(500).json({ erorr: true, message: 'Internal server error' })
  }
}

export default function (error: Error, _req: Request, res: Response, _next: NextFunction): void {
  const handler = ERROR_HANDLER[error.name] ?? ERROR_HANDLER.Default
  handler(res)
}
