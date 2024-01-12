const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const crypto = require('crypto');

const app = express()
const port = 3333
const bd = {
  email: 'email@email.com',
  password: '123'
}

app.use(cors({ credentials: true, origin: 'https://clean-arch-next.vercel.app' }))
app.use(express.json())
app.use(cookieParser())

app.post('/login', (req, res) => {
  const cookie = req.cookies['1.0.0-cookie']
  const email = req.body?.email
  const password = req.body?.password

  const isValidUser = email === bd.email 
    && password === bd.password

  if (!isValidUser) return res.status(404).send({ 
    statusCode: 404, 
    message: 'User not found'
  })

  if (cookie === undefined) {
    const token = crypto.randomUUID()
    const oneYear = 1000 * 60 * 60 * 24 * 365

    res.cookie(
      '1.0.0-cookie', 
      token, 
      { maxAge: oneYear, httpOnly: true, sameSite: 'none', secure: true },
    )

  }

  res.status(200).send({ statusCode: 200, message: 'User logged'} )
})

app.get('/server-cookie', (req, res) => {
  const cookie = req.cookies['1.0.0-cookie']

  if (cookie === undefined) {
    return res.status(401).send({ 
      statusCode: 400, 
      message: 'User Unauthorized'
    })
  }

  res.status(200).send({ statusCode: 200, results: [1, 2, 3]})
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
