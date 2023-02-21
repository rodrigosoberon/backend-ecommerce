const { Router } = require('express')
const infoRouter = Router()

infoRouter.get('/info', (req, res, next) => {
	const info = {
		platform: process.platform
	}

	res.render('info', { info })
})

module.exports = infoRouter
