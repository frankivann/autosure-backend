import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from '@api/user/model'
const { ACCESS_TOKEN_SECRET } = process.env

export async function signup (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { firstname, lastname, username, password, email } = req.body

  try {
    /**
     * Check if user already exists.
     */

    const user = await UserModel.findOne({ username })
    if (user != null) {
      res.status(400).json({ error: true, message: 'User already exists' })
      return
    }

    /**
     * Creating new user.
     */

    const genSalt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, genSalt)

    const newUser = new UserModel({
      firstname,
      lastname,
      username,
      password: hashedPassword,
      email
    })

    await newUser.save()
    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    next(error)
  }
}

export async function signin (req: Request, res: Response, next: NextFunction): Promise<void> {
  const { username, password } = req.body

  try {
    /**
     * Check if user exists.
     */

    const user = await UserModel.findOne({ username })
    if (user == null) {
      res.status(400).json({ error: true, message: 'Invalid Credentials' })
      return
    }

    /**
     * Validate password.
     */

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      res.status(400).json({ error: true, message: 'Invalid Credentials' })
      return
    }

    /**
     * Check secret tokens and
     * Configure JsonWebToken.
     */

    const payload = { id: user.id, rol: user.role }
    const accessToken = jwt.sign(payload, (ACCESS_TOKEN_SECRET as string), { expiresIn: '24h' })

    res.json({ accessToken, user })
  } catch (error) {
    next(error)
  }
}
