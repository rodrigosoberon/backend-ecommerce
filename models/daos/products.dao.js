// const ProductsMongoDB = require('../products.mongoDB')
const config = require('../../config')
const MongoDBContainer = require('../containers/mongo.container')
const productModel = require('../products.model')

let ProductContainer

if (config.remoteConfig.DB_ENGINE === 'mongoDB') {
	ProductContainer = class ProductsGeneralDAO extends MongoDBContainer {
		constructor() {
			super(productModel)
		}
	}
}

module.exports = ProductContainer
