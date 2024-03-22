import { Schema, model } from 'mongoose'
import { type ICotization } from '@src/types/global'
import { CAR_COVERAGE, CAR_INSURANCE } from '@src/constants'

const CotizationSchema = new Schema<ICotization>({
  cotizationNumber: {
    type: Number,
    required: true,
    default: 1
  },
  productionYear: {
    type: Number,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  cost: {
    type: Number,
    required: true,
    trim: true
  },
  carModel: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  insurance: {
    type: String,
    trim: true,
    enum: Object.values(CAR_INSURANCE),
    required: true,
    lowercase: true
  },
  coverage: {
    type: String,
    trim: true,
    enum: Object.values(CAR_COVERAGE),
    required: true,
    lowercase: true
  },
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true })

/**
 * Add autoincrement cotizationNumber field.
*/

CotizationSchema.pre('save', async function (next) {
  try {
    const lastCotization: ICotization | null = await this.model('Cotization').findOne({}, {}, { sort: { cotizationNumber: -1 } })
    if (lastCotization == null) return

    this.cotizationNumber = (lastCotization.cotizationNumber) + 1
  } catch (error) {
    next(error as Error)
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
