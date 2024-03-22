import { Response } from 'express'
import { Document } from 'mongoose'
import { CAR_COVERAGE, CAR_INSURANCE } from '@src/constants'

/**
 * User Types definitions
 */

type UserRoles = typeof USER_ROLES[keyof typeof USER_ROLES]

interface IUser extends Document {
  firstname: string
  lastname: string
  username: string
  password: string
  email: string
  role: UserRoles
}

/**
 * Cotization Types definitions
*/

type Insurance = typeof CAR_INSURANCE[keyof typeof CAR_INSURANCE]
type Coverage = typeof CAR_COVERAGE[keyof typeof CAR_COVERAGE]

interface ICotization extends Document {
  cotizationNumber: number
  productionYear: number
  brand: string
  cost: number
  carModel: string
  insurance: Insurance
  coverage: Coverage
  userId: string
  price: number
}

/**
 * Utils Types definitions
 */

export interface ErrorHandlerDictionary {
  [key: string]: (res: Response<any, Record<string, any>>) => void
}
