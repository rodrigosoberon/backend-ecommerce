const Container = require('../models/daos/products.dao')
const container = new Container()
const { ProductDto } = require('../models/dtos/products.dto')
const HttpError = require('../models/http-error')

class ProductsService {
	async getProducts() {
		let products
		try {
			products = await container.getAll()
			return products.map(p => new ProductDto(p.toObject()))
		} catch (err) {
			console.log(err)
		}
	}

	async getProductById(id, next) {
		let product
		try {
			product = await container.getById(id)
			if (product) {
				const productDtoConvertido = new ProductDto(...product)
				return { ...productDtoConvertido }
			}
		} catch (err) {
			return next(new HttpError('Product not found', 404))
		}
	}

	async postProduct(product, next) {
		let newId
		try {
			newId = await container.save(new ProductDto(product))
		} catch (err) {
			return next(new HttpError('Something went wrong, could not save product.', 500))
		}
		return newId
	}

	async putProduct(id, product, next) {
		if (await container.getById(id)) {
			try {
				await container.updateById(id, new ProductDto(product))
			} catch (err) {
				return next(new HttpError('Something went wrong, could not update product.', 500))
			}
			return { message: 'Product updated successfully' }
		} else {
			next(new HttpError('Product not found', 404))
		}
	}

	async deleteProduct(id) {
		if (await container.getById(id)) {
			try {
				await container.deleteById(id)
			} catch (err) {
				return next(new HttpError('Something went wrong, could not delete product.', 500))
			}
			return { message: 'Product updated successfully' }
		} else {
			next(new HttpError('Product not found', 404))
		}
	}
}

module.exports = ProductsService
