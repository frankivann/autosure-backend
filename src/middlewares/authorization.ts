import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
const { ACCESS_TOKEN_SECRET } = process.env

export function authorization (req: Request, res: Response, next: NextFunction): void {
  const { authorization } = req.headers

  if (authorization == null) {
    res.status(403).json({ error: true, message: 'An error has occurred' })
    return
  }
  if (!authorization.toLowerCase().startsWith('bearer ')) {
    res.status(403).json({ error: true, message: 'An error has occurred' })
    return
  }

  const token = authorization.substring(7)

  try {
    if (ACCESS_TOKEN_SECRET == null) throw new Error()

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload

    req.userId = decoded.id
    req.userRole = decoded.rol
    next()
  } catch (error) {
    next(error)
  }
}
