const express = require('express')

const router = express.Router()
const fetch = require('node-fetch')

// amount can be between 5 and 100

const getTweets = async (userId, amount) => {
  const url = `https://api.twitter.com/2/users/${userId}/tweets?exclude=replies&max_results=${amount}&tweet.fields=created_at`

  const response = await fetch(url, {
    headers: { authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
  })
  try {
    const responseJson = await response.json()
    return responseJson
  } catch (error) {
    return { Error: error.stack }
  }
}

router.get('/', (req, res) => {
  res.json({ success: 'tweets' })
})

router.get('/:userId/:amount', async (req, res) => {
  const { userId, amount } = req.params
  const data = await getTweets(userId, amount)
  res.json(data)
})

module.exports = router
