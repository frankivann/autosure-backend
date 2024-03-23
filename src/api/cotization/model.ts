import { Schema, model } from 'mongoose'
import { type CarInsurance } from '@src/types/global'
import { CAR_BRANDS, FUEL_TYPES, LOCATIONS, TRANSMISSION_TYPES, USAGES } from '@src/constants'

const CotizationSchema = new Schema<CarInsurance>({
  year: {
    type: Number,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    enum: CAR_BRANDS,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  fuelType: {
    type: String,
    enum: FUEL_TYPES,
    required: true,
    trim: true
  },
  transmissionType: {
    type: String,
    enum: TRANSMISSION_TYPES,
    required: true,
    trim: true
  },
  numberOfDoors: {
    type: Number,
    enum: [2, 4],
    required: true,
    trim: true
  },
  location: {
    type: String,
    enum: LOCATIONS,
    required: true,
    trim: true
  },
  usage: {
    type: String,
    enum: USAGES,
    required: true,
    trim: true
  }
})

/**
 * Remove unnecesary fields before returning the request.
*/

CotizationSchema.set('toJSON', {
  transform: (_, returnedObj) => {
    returnedObj.id = returnedObj._id
    delete returnedObj._id
    delete returnedObj.__v
  }
})

export default model('Cotization', CotizationSchema)
