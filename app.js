import express, { json } from 'express'
import { router } from './router.js'
import cors from 'cors'
import './mongo.js'

const app = express()
app.use(json())
app.use(cors())
app.disable('x-powered-by')

app.use('/', router)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
