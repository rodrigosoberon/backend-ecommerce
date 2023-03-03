const config = require('../../config')
const MongoDBContainer = require('../containers/mongo.container')
const orderModel = require('../orders.model')

let OrderContainer

if (config.remoteConfig.DB_ENGINE === 'mongoDB') {
	OrderContainer = class OrdersGeneralDAO extends MongoDBContainer {
		constructor() {
			super(orderModel)
		}
	}
}

module.exports = OrderContainer
