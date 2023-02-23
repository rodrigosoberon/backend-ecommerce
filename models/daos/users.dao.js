const config = require('../../config')
const MongoDBContainer = require('../containers/mongo.container')
const userModel = require('../users.model')

let UserContainer

if (config.remoteConfig.DB_ENGINE === 'mongoDB') {
	UserContainer = class UsersGeneralDAO extends MongoDBContainer {
		constructor() {
			super(userModel)
		}
	}
}

module.exports = UserContainer
