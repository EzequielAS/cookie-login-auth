const express = require('express')
const cors = require('cors')
const crypto = require('crypto');

const app = express()
const port = 3333
const bd = {
  email: 'email@email.com',
  password: '123'
}
app.use(cors())
app.use(express.json())

app.post('/login', (req, res) => {
  const email = req.body?.email
  const password = req.body?.password

  const isValidUser = email === bd.email 
    && password === bd.password

  if (!isValidUser) {
    return res.status(404).send({ 
      statusCode: 404, 
      message: 'User not found'
    })
  }

  const token = crypto.randomUUID()

  res.status(200).send({ statusCode: 200, message: 'User logged', token } )
})

app.get('/server-cookie', (req, res) => {
  const token = req.headers?.authorization

  if (token === undefined) {
    return res.status(401).send({ 
      statusCode: 401, 
      message: 'User Unauthorized'
    })
  }

  res.status(200).send({ statusCode: 200, results: [1, 2, 3]})
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
