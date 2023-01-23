// import {mongo_url, base, DB_ENGINE} from "../config.js";
// import MongoProductosDAO from './productos/productosDAOMongoDB.js'

const MongoProductosDAO = require('./productos/productosDAOMongoDB')
const config = require('../config')

let contenedorProducto

if (config.remoteConfig.DB_ENGINE === 'mongoDB') {
    contenedorProducto = class ProductosGeneralDAO extends MongoProductosDAO {
        constructor() {
            super();
        }
    }
}

module.exports = contenedorProducto;