const express = require('express')

const router = express.Router()
const fetch = require('node-fetch')

const rateLimit = require('express-rate-limit')


const translate = async (text, lang) => {
  const url = `http://api-free.deepl.com/v2/translate?text=${text}&target_lang=${lang}`

  const response = await fetch(url, {
    headers: {
      Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  try {
    const responseJson = await response.json()
    return responseJson
  } catch (error) {
    return { Error: error.stack }
  }
}

const limiter = rateLimit({
  windowMs: 1000 * 60,
  max: 5,
})

router.get('/', (req, res) => {
  res.json({ success: 'translate' })
})

router.get('/:text/:lang', limiter, async (req, res) => {
  const { text, lang } = req.params
  const data = await translate(text, lang)
  res.json(data)
})

module.exports = router
