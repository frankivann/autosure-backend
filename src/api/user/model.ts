import { Schema, model } from 'mongoose'
import { type IUser } from '@src/types/global'
import { USER_ROLES } from '@src/constants'

const UserSchema = new Schema<IUser>({
  firstname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 2
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 2
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    minlength: 2
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  role: {
    type: String,
    trim: true,
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.USER,
    required: true,
    lowercase: true
  }
}, { timestamps: true })

/**
 * Remove unnecesary fields before returning the request.
*/

UserSchema.set('toJSON', {
  transform: (_, returnedObj) => {
    returnedObj.id = returnedObj._id
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.password
  }
})

export default model('User', UserSchema)
