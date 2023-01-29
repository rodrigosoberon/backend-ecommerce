const ProductsMongoDB = require('./products.mongoDB')
const config = require('../config')

let ProductContainer

if (config.remoteConfig.DB_ENGINE === 'mongoDB') {
    ProductContainer = class ProductsGeneralDAO extends ProductsMongoDB {
        constructor() {
            super();
        }
    }
}

module.exports = ProductContainer;