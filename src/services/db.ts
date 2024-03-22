import mongoose from 'mongoose'
const { DB_URI_PROD, DB_URI_DEV, NODE_ENV } = process.env

const connectionString = (NODE_ENV === 'development'
  ? DB_URI_DEV
  : DB_URI_PROD) as string

mongoose.connect(connectionString)
  .then(() => console.log(`Database connected ${NODE_ENV as string}`))
  .catch((error) => console.error(error))
