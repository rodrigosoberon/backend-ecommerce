const { Router } = require('express')
const infoRouter = Router()
const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs.argv

infoRouter.get('/info', (req, res, next) => {
	const info = {
		args: args,
		platform: process.platform,
		pid: process.pid,
		uptime: process.uptime(),
		title: process.title,
		arch: process.arch,
		memoryUsage: process.memoryUsage().rss,
		cpuUsage: process.cpuUsage().system,
		cwd: process.cwd(),
		execPath: process.execPath,
		version: process.version
	}

	res.render('info', { info })
})

module.exports = infoRouter
