import { model, Schema } from 'mongoose'

const urlSchema = new Schema({
  baseUrl: String,
  urlId: String
})

urlSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Url = model('Url', urlSchema)
