const ProductsService = require('../services/products.service')
const productsService = new ProductsService()
const HttpError = require('../utils/http-error')

class ProductsController {
	async getProductsController(req, res) {
		const products = await productsService.getProducts()
		res.json(products)
	}

	async getProductByIdController(req, res, next) {
		// validates correct _id format for mongoDB
		if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			res.json(await productsService.getProductById(req.params.id, next))
		} else {
			return next(new HttpError('Invalid id format', 400))
		}
	}

	async postProductController(req, res, next) {
		res.json(await productsService.postProduct(req.body, next))
	}

	async putProductController(req, res, next) {
		// validates correct _id format for mongoDB
		if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			res.json(await productsService.putProduct(req.params.id, req.body, next))
		} else {
			return next(new HttpError('Invalid id format', 400))
		}
	}

	async deleteProductController(req, res, next) {
		// validates correct _id format for mongoDB
		if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			res.json(await productsService.deleteProduct(req.params.id, next))
		} else {
			return next(new HttpError('Invalid id format', 400))
		}
	}
}

module.exports = ProductsController
