const express = require('express')
const productsRouter = require('./routes/products.routes')
const usersRouter = require('./routes/users.routes')
const infoRouter = require('./routes/info.routes')
const hbs = require('express-handlebars')
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer } = require('http')
const initSocket = require('./utils/initSocket')

const initServer = () => {
	const app = express()
	const httpServer = new HttpServer(app)
	const io = new IOServer(httpServer)

	//* ----------------------- Middlewares----------------------- *//
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))
	app.use(express.static('public'))
	app.use('/api/products', productsRouter)
	app.use(usersRouter)
	app.use(infoRouter)

	app.get('/', (req, res) => {
		res.render('index')
	})
	//* ----------------------- Middlewares----------------------- *//

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

	//* ---------------------- Custom error ---------------------- *//
	app.use((error, req, res, next) => {
		if (res.headerSent) {
			return next(error)
		}
		res.status(error.code || 500)
		res.json({ message: error.message || 'Unknown error ocurred!' })
	})
	//* ---------------------- Custom error ---------------------- *//

	//* --------------------- Socket.io setup --------------------- *//
	initSocket(io)
	//* --------------------- Socket.io setup --------------------- *//

	return {
		listen: port =>
			new Promise((res, rej) => {
				const server = httpServer.listen(port, () => {
					res(server)
				})
				server.on('error', err => rej(err))
			})
	}
}

module.exports = initServer
