// import ContenedorMongoDB from "../../contenedores/contenedorMongoDB.js";
// import productModel from '../../models/producto.js'

const ContenedorMongoDB = require('../../contenedores/contenedorMongoDB')
const productModel = require('../../models/producto')

class ProductosDAOMongoDB extends ContenedorMongoDB{
    constructor() {
        super(productModel);
    }
}

module.exports = ProductosDAOMongoDB;