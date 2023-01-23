const express = require('express')
const productos = require('./routes/productosRoute')
const initServer = () => {
    const app = express()

    app.get('/', (request, response) => {
        response.send('<h1>Hello World!</h1>')
    })

    app.use("/api/productos", productos)

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