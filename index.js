require('dotenv').config()
const express = require('express')
const rateLimit = require('express-rate-limit')
const cors = require('cors')

const app = express()
const port = 3000

const football = require('./football')
const translate = require('./translate')
const tweets = require('./tweets')

app.use(express.json())

const allowedOrigins = [
  'http://127.0.0.1:5500',
  'https://did-leeds-win.netlify.app',
  'https://zesty-moxie-726a47.netlify.app/',
  'https://nickdalby.com/',
]
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by Cors'))
    }
  },
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
// app.use(cors())

// rate limiter
const limiter = rateLimit({
  windowMs: 1000 * 60,
  max: 10,
})

// app.use(limiter)

// test route
app.get('/', (req, res) => res.json({ success: 'hello!' }))

// football route
app.use('/football', football)

// deepl route
app.use('/translate', translate)

// twitter route
app.use('/tweets', tweets)

app.listen(port, () => console.log(`app listening on port ${port}`))
