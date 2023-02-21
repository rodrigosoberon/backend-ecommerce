const express = require('express')
const products = require('./routes/products.routes')
const infoRouter = require('./routes/info.routes')
const hbs = require('express-handlebars')

const initServer = () => {
	const app = express()

	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))
	app.use('/api/products', products)
	app.use(infoRouter)

	app.get('/', (req, res) => {
		res.render('index', { funciona: 'Si' })
	})

	//* -------------------- Handlebars setup -------------------- *//
	app.engine(
		'hbs',
		hbs.engine({
			extname: '.hbs',
			partialDir: __dirname + '/views/partials',
			layoutDir: __dirname + '/views/layouts',
			defaultLayout: 'layout.hbs'
		})
	)
	app.set('views', './views')
	app.set('view engine', 'hbs')
	//* -------------------- Handlebars setup -------------------- *//

	app.use((error, req, res, next) => {
		if (res.headerSent) {
			return next(error)
		}
		res.status(error.code || 500)
		res.json({ message: error.message || 'Unknown error ocurred!' })
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
