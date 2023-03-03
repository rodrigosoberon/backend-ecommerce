const OrdersService = require('../services/orders.service')
const ordersService = new OrdersService()
const HttpError = require('../utils/http-error')

class OrdersController {
	async postOrderController(req, res, next) {
		// validates correct _id format for mongoDB
		if (req.params.cartId.match(/^[0-9a-fA-F]{24}$/)) {
			await ordersService.postOrder(req, res, next)
		} else {
			return next(new HttpError('Invalid id format', 400))
		}
	}
}

module.exports = OrdersController
