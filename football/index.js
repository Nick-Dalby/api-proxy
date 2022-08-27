const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

const fetchFootball = async (team) => {
  const url = `https://api.football-data.org/v4/teams/${team}/matches?status=FINISHED&limit=1`

  const footballStream = await fetch(url, {
    headers: { 'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY },
  })
  try {
    const footballJson = await footballStream.json()
    return footballJson
  } catch (err) {
    return { Error: err.stack }
  }
}

router.get('/', (req, res) => {
  res.json({ success: 'football' })
})

router.get('/:team', async (req, res) => {
  const team = req.params.team
  const data = await fetchFootball(team)
  res.json(data)
})

module.exports = router
