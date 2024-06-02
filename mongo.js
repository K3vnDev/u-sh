import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
configDotenv()

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log('Database Connected!')
  })
  .catch((err) => console.error(err))
