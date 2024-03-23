import { Schema, model } from 'mongoose'
import { type Cotization } from '@src/types/global'
import { CAR_BRANDS, CAR_MODELS, FUEL_TYPES, LOCATIONS, TRANSMISSION_TYPES, USAGES } from '@src/constants'

const CotizationSchema = new Schema<Cotization>({
  year: {
    type: Number,
    required: true,
    lowercase: true,
    trim: true
  },
  brand: {
    type: String,
    enum: CAR_BRANDS,
    required: true,
    lowercase: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    enum: CAR_MODELS,
    lowercase: true,
    trim: true
  },
  fuelType: {
    type: String,
    enum: FUEL_TYPES,
    required: true,
    lowercase: true,
    trim: true
  },
  transmissionType: {
    type: String,
    enum: TRANSMISSION_TYPES,
    required: true,
    lowercase: true,
    trim: true
  },
  numberOfDoors: {
    type: Number,
    enum: [2, 4],
    required: true,
    lowercase: true,
    trim: true
  },
  location: {
    type: String,
    enum: LOCATIONS,
    required: true,
    lowercase: true,
    trim: true
  },
  usage: {
    type: String,
    enum: USAGES,
    required: true,
    lowercase: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
