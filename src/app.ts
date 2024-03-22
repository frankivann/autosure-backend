import express from 'express'
import authRoutes from '@api/auth/routes'
import userRoutes from '@api/user/routes'
import cotizationRoutes from '@api/cotization/routes'
import notFound from '@middlewares/not-found'
import errorHandler from '@middlewares/error-handler'
import cors from 'cors'
const app = express()

// config
app.use(express.json())
app.use(cors())

// routes
app.get('/', (_, res) => res.json({ message: 'Car Insurance API', version: process.env.npm_package_version }))
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/cotization', cotizationRoutes)

// error handling
app.use(notFound)
app.use(errorHandler)

export default app
