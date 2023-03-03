const config = require('../../config')
const MongoDBContainer = require('../containers/mongo.container')
const cartModel = require('../carts.model')

let CartContainer

if (config.remoteConfig.DB_ENGINE === 'mongoDB') {
	CartContainer = class CartsGeneralDAO extends MongoDBContainer {
		constructor() {
			super(cartModel)
		}
	}
}

module.exports = CartContainer
