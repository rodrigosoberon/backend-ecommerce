require('dotenv').config()

const remoteConfig = {
	DB_ENGINE: 'mongoDB',
	client: 'ecommerce',
	cnxStr: process.env.MONGO_URL
}

const tokenConfig = {
	JWT_KEY: process.env.JWT_KEY,
	expiration: '24h'
}

module.exports = { remoteConfig, tokenConfig }
