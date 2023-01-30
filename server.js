const express = require('express')
const products = require('./routes/products.routes')
const initServer = () => {
  const app = express()

  app.get('/', (request, response) => {
    response.send('<h1>API running!</h1>')
  })
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/api/products', products)

  return {
    listen: port => new Promise((res, rej) => {
      const server = app.listen(port, () => {
        res(server)
      })
      server.on('error', err => rej(err))
    })
  }
}

module.exports = initServer
