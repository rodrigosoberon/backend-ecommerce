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

	app.use((error, req, res, next) => {
		if (res.headerSent) {
			//Si ya existe una respuesta
			return next(error) //sigue la ejecución y pasa el error
		} //si no existe, creo el error
		res.status(error.code || 500) //Si no existe codigo de error, asigna 500 por def.
		res.json({ message: error.message || 'Unknown error ocurred!' }) //Creo mensaje por defecto si no existe
	})

	return {
		listen: port =>
			new Promise((res, rej) => {
				const server = app.listen(port, () => {
					res(server)
				})
				server.on('error', err => rej(err))
			})
	}
}

module.exports = initServer
