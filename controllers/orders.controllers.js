const OrdersService = require('../services/orders.service')
const ordersService = new OrdersService()
const HttpError = require('../utils/http-error')

class OrdersController {
	async getOrdersController(req, res, next) {
		await ordersService.getOrders(req, res, next)
	}

	async postOrderController(req, res, next) {
		// validates correct _id format for mongoDB
		if (req.params.cartId.match(/^[0-9a-fA-F]{24}$/)) {
			await ordersService.postOrder(req, res, next)
		} else {
			return next(new HttpError('Invalid id format', 400))
		}
	}

	async confirmOrderController(req, res, next) {
		// validates correct _id format for mongoDB
		if (req.params.orderId.match(/^[0-9a-fA-F]{24}$/)) {
			await ordersService.confirmOrder(req, res, next)
		} else {
			return next(new HttpError('Invalid id format', 400))
		}
	}

	async cancelOrderController(req, res, next) {
		// validates correct _id format for mongoDB
		if (req.params.orderId.match(/^[0-9a-fA-F]{24}$/)) {
			await ordersService.cancelOrder(req, res, next)
		} else {
			return next(new HttpError('Invalid id format', 400))
		}
	}
}

module.exports = OrdersController
