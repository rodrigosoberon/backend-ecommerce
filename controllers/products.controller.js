const ProductsService = require('../services/products.service')
const productsService = new ProductsService()
const HttpError = require('../utils/http-error')

class ProductsController {
	async getProductsController(req, res, next) {
		await productsService.getProducts(req, res, next)
	}

	async getProductByIdController(req, res, next) {
		// validates correct _id format for mongoDB
		if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			await productsService.getProductById(req, res, next)
		} else {
			return next(new HttpError('Invalid id format', 400))
		}
	}

	async postProductController(req, res, next) {
		await productsService.postProduct(req, res, next)
	}

	async putProductController(req, res, next) {
		// validates correct _id format for mongoDB
		if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			await productsService.putProduct(req, res, next)
		} else {
			return next(new HttpError('Invalid id format', 400))
		}
	}

	async deleteProductController(req, res, next) {
		// validates correct _id format for mongoDB
		if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			await productsService.deleteProduct(req, res, next)
		} else {
			return next(new HttpError('Invalid id format', 400))
		}
	}
}

module.exports = ProductsController
