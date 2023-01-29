const Container = require('../models/products.dao')
const container = new Container()

class ProductsService{
    async getProducts(){
        return await container.getAll()
    }

    async getProductById(id){
        return await container.getById(id)
    }

    async postProduct(product){
        const timestamp = new Date().toLocaleString();
        return await container.save({timestamp: timestamp, ...product})
    }
    async putProduct(id, product){
        return await container.updateById(id, product)
    }
    async deletProduct(id){
        return await container.deleteById(id)
    }
}

module.exports = ProductsService