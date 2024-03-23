import { Response } from 'express'
import { Document, Schema } from 'mongoose'
import { CAR_BRANDS, CAR_MODELS, FUEL_TYPES, LOCATIONS, TRANSMISSION_TYPES, USAGES, USER_ROLES } from '@src/constants'

/**
 * User Types definitions
 */

type UserRoles = typeof USER_ROLES[keyof typeof USER_ROLES]

interface User extends Document {
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

type CarBrand = typeof CAR_BRANDS[number]
type CarModel = typeof CAR_MODELS[number]
type FuelType = typeof FUEL_TYPES[number]
type TransmissionType = typeof TRANSMISSION_TYPES[number]
type Location = typeof LOCATIONS[number]
type Usage = typeof USAGES[number]

interface Cotization {
  year: number
  brand: CarBrand
  model: CarModel
  fuelType: FuelType
  transmissionType: TransmissionType
  numberOfDoors: 2 | 4
  location: Location
  usage: Usage
  price: number
  userId: Schema.Types.ObjectId
}

/**
 * Utils Types definitions
 */

export interface ErrorHandlerDictionary {
  [key: string]: (res: Response<any, Record<string, any>>) => void
}
