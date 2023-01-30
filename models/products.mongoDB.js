const MongoDBContainer = require('./mongo.container')
const productModel = require('./products.model')

class ProductsMongoDB extends MongoDBContainer {
  constructor () {
    super(productModel)
  }
}

module.exports = ProductsMongoDB
