const CartsService = require('../services/carts.service')
const cartsService = new CartsService()
const HttpError = require('../utils/http-error')

class CartsController {
	async getCartByEmailController(req, res, next) {
		// validates correct email format
		if (req.params.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
			await cartsService.getCartByEmail(req.params.email, res, next)
		} else {
			return next(new HttpError('Invalid email format', 400))
		}
	}

	async newCartController(req, res, next) {
		await cartsService.newCart(req.body, res, next)
	}

	async addProductToCartController(req, res, next) {
		// validates correct id format
		if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			await cartsService.addProductToCart(req, res, next)
		} else {
			return next(new HttpError('Invalid cart id format', 400))
		}
	}

	async deleteProductFromCartController(req, res, next) {
		// validates correct id format
		if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			await cartsService.deleteProductFromCart(req, res, next)
		} else {
			return next(new HttpError('Invalid cart id format', 400))
		}
	}

	async deleteCartController(req, res, next) {
		// validates correct email format
		if (req.params.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
			await cartsService.deleteCart(req.params.email, res, next)
		} else {
			return next(new HttpError('Invalid email format', 400))
		}
	}
}

module.exports = CartsController
