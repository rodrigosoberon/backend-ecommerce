require('dotenv').config()

const remoteConfig = {
  DB_ENGINE: 'mongoDB',
  client: 'ecommerce',
  cnxStr: process.env.MONGO_URL
}

module.exports = { remoteConfig }
