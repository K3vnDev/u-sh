import { Url } from '../schemas/Url.js'

const letters = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

export const generateRandomId = async () => {
  let randomId = ''
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length)

    if (Math.random() > 0.66) {
      randomId += letters[randomIndex]
    } else {
      randomId += String((Math.floor(Math.random() * 10)))
    }
  }

  if (await Url.findOne({ urlId: randomId })) {
    await generateRandomId()
  }
  return randomId
}
