// const ProductsMongoDB = require('../products.mongoDB')
const config = require('../../config')
const MongoDBContainer = require('../containers/mongo.container')
const messsageModel = require('../messages.model')

let MessageContainer

if (config.remoteConfig.DB_ENGINE === 'mongoDB') {
	MessageContainer = class MessagesGeneralDAO extends MongoDBContainer {
		constructor() {
			super(messsageModel)
		}
	}
}

module.exports = MessageContainer
