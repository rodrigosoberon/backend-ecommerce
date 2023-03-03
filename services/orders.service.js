const OrdersDao = require('../models/daos/orders.dao')
const ordersDao = new OrdersDao()
const CartsDato = require('../models/daos/carts.dao')
const cartsDao = new CartsDato()
const ProductDao = require('../models/daos/products.dao')
const productDao = new ProductDao()
const HttpError = require('../utils/http-error')
const sendMailTo = require('../utils/nodemailer')

class OrdersService {
	async getOrders(req, res, next) {
		let orders
		try {
			orders = await ordersDao.getAll()
		} catch (err) {
			return next(new HttpError('Something went wrong, could not get orders.', 500))
		}
		return res.json(orders)
	}

	async postOrder(req, res, next) {
		//* get cart
		const cartId = req.params.cartId
		let cart
		try {
			cart = await cartsDao.getById(cartId)
		} catch (err) {
			return next(new HttpError('Something went wrong, could not create order.', 500))
		}
		if (!cart) {
			return next(new HttpError('Cart not found', 404))
		}

		//* get cart items and prices
		let items = []
		try {
			for (const p of cart.productsInCart) {
				try {
					const product = await productDao.getById(p.productId)
					items.push({ qty: p.qty, productId: p.productId, price: product.price })
				} catch (err) {
					return next(new HttpError(`Could not process item ${p.productId}.`, 500))
				}
			}
		} catch (err) {
			return next(new HttpError('Something went wrong, could not create order.', 500))
		}

		//* get last order number
		let orderNumber = 1
		try {
			const orders = await ordersDao.getAll()
			if (orders.length) {
				const orderNumbers = orders.map(order => order.orderNumber)
				orderNumber = Math.max(...orderNumbers) + 1
			}
		} catch (err) {
			return next(new HttpError('Something went wrong, could not create order.', 500))
		}

		//* create new order
		let newOrder = {
			timestamp: new Date().toLocaleString(),
			orderNumber: orderNumber,
			buyer: cart.email,
			items: items,
			status: 'pending'
		}
		try {
			await ordersDao.save(newOrder)
		} catch (err) {
			return next(new HttpError('Something went wrong, could not save order.', 500))
		}
		return res.json(newOrder)
	}

	async confirmOrder(req, res, next) {
		//* get order
		let order
		try {
			order = await ordersDao.getById(req.params.orderId)
		} catch (err) {
			return next(new HttpError('Something went wrong, could not confirm order.', 500))
		}

		if (!order) {
			return next(new HttpError('Order not found', 404))
		}

		//* update order status
		order.status = 'confirmed'
		try {
			await ordersDao.save(order)
		} catch (err) {
			return next(new HttpError('Something went wrong, could not confirm order.', 500))
		}

		//* send email
		const subject = `Order ${order.orderNumber} confirmed`
		const text = `Your order # ${order.orderNumber} has been confirmed.`
		try {
			sendMailTo(order.buyer, subject, text)
		} catch (err) {}

		return res.json({ message: 'Order confirmed.' })
	}

	async cancelOrder(req, res, next) {
		//* get order
		let order
		try {
			order = await ordersDao.getById(req.params.orderId)
		} catch (err) {
			return next(new HttpError('Something went wrong, could not confirm order.', 500))
		}

		if (!order) {
			return next(new HttpError('Order not found', 404))
		}

		//* update order status
		order.status = 'cancelled'
		try {
			await ordersDao.save(order)
		} catch (err) {
			return next(new HttpError('Something went wrong, could not confirm order.', 500))
		}

		return res.json({ message: 'Order cancelled.' })
	}
}

module.exports = OrdersService
