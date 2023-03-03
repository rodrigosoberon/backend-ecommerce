const ProductDao = require('../models/daos/products.dao')
const productDao = new ProductDao()
const { ProductDto } = require('../models/dtos/products.dto')
const HttpError = require('../utils/http-error')

class ProductsService {
	async getProducts(req, res, next) {
		let products
		try {
			products = await productDao.getAll()
			return res.json(products.map(p => new ProductDto(p.toObject())))
		} catch (err) {
			return next(new HttpError('Something went wrong, could not get products.', 500))
		}
	}

	async getProductById(req, res, next) {
		const id = req.params.id
		let product
		try {
			product = await productDao.getById(id)
			if (product) {
				const dtoProduct = new ProductDto(product)
				return res.json({ ...dtoProduct })
			}
		} catch (err) {
			return next(new HttpError('Product not found', 404))
		}
	}

	async postProduct(req, res, next) {
		const product = req.body
		let newProduct
		try {
			newProduct = await productDao.save(new ProductDto(product))
		} catch (err) {
			return next(new HttpError('Something went wrong, could not save product.', 500))
		}
		return res.json(newProduct)
	}

	async putProduct(req, res, next) {
		const id = req.params.id
		const product = req.body
		if (await productDao.getById(id)) {
			try {
				await productDao.updateById(id, new ProductDto(product))
			} catch (err) {
				return next(new HttpError('Something went wrong, could not update product.', 500))
			}
			return res.json({ message: 'Product updated successfully' })
		} else {
			next(new HttpError('Product not found', 404))
		}
	}

	async deleteProduct(req, res, next) {
		const id = req.params.id
		if (await productDao.getById(id)) {
			try {
				await productDao.deleteById(id)
			} catch (err) {
				return next(new HttpError('Something went wrong, could not delete product.', 500))
			}
			return res.json({ message: 'Product updated deleted' })
		} else {
			next(new HttpError('Product not found', 404))
		}
	}
}

module.exports = ProductsService
