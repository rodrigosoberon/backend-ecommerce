// import ContenedorMongoDB from "../../contenedores/contenedorMongoDB.js";
// import cartModel from '../../models/carrito.js'

const ContenedorMongoDB = require('../../contenedores/contenedorMongoDB')
const cartModel = require('../../models/producto')

class CarritosDAOMongoDB extends ContenedorMongoDB{
    constructor() {
        super(cartModel);
    }
}

export default CarritosDAOMongoDB;