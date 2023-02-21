const ProductDao = require('../models/daos/products.dao')
const productDao = new ProductDao()
const { ProductDto } = require('../models/dtos/products.dto')
const HttpError = require('../models/http-error')

class ProductsService {
	async getProducts() {
		let products
		try {
			products = await productDao.getAll()
			return products.map(p => new ProductDto(p.toObject()))
		} catch (err) {
			console.log(err)
		}
	}

	async getProductById(id, next) {
		let product
		try {
			product = await productDao.getById(id)
			if (product) {
				const productDtoConvertido = new ProductDto(...product)
				return { ...productDtoConvertido }
			}
		} catch (err) {
			return next(new HttpError('Product not found', 404))
		}
	}

	async postProduct(product, next) {
		let newProduct
		try {
			newProduct = await productDao.save(new ProductDto(product))
		} catch (err) {
			return next(new HttpError('Something went wrong, could not save product.', 500))
		}
		return newProduct
	}

	async putProduct(id, product, next) {
		if (await productDao.getById(id)) {
			try {
				await productDao.updateById(id, new ProductDto(product))
			} catch (err) {
				return next(new HttpError('Something went wrong, could not update product.', 500))
			}
			return { message: 'Product updated successfully' }
		} else {
			next(new HttpError('Product not found', 404))
		}
	}

	async deleteProduct(id) {
		if (await productDao.getById(id)) {
			try {
				await productDao.deleteById(id)
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
