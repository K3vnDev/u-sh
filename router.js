import { Router } from 'express'
import { Url } from './schemas/Url.js'
import { generateRandomId } from './services/generateRandomId.js'

export const router = Router()

router.get('/', (req, res) => {
  res.send('exmaple jskasa')
  // res.redirect(process.env.HOME_URL)
})

router.get('/:id', (req, res) => {
  const { id: urlId } = req.params

  Url.findOne({ urlId })
    .then(savedId => {
      res.redirect(savedId.baseUrl)
    })
    .catch(_ => {
      res.status(404).send({ error: 'id not found' })
      // change this to an html file
    })
})

router.post('/', async (req, res) => {
  const { url: baseUrl } = req.body

  const alreadyExists = await Url.findOne({ baseUrl })
  if (alreadyExists) {
    return res.status(200).json(alreadyExists)
  }

  const newUrl = new Url({
    baseUrl,
    urlId: await generateRandomId()
  })
  newUrl.save()
    .then(savedUrl => {
      res.status(201).json(savedUrl)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'server error' })
    })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const { deletedCount } = await Url.deleteOne({ urlId: id })
  if (deletedCount !== 0) {
    res.status(200).json({})
  } else {
    res.status(404).json({ error: 'id not found' })
  }
})
