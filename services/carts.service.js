const CartContainer = require('../models/daos/carts.dao')
const cartContainer = new CartContainer()
const ProductContainer = require('../models/daos/products.dao')
const productContainer = new ProductContainer()
const HttpError = require('../utils/http-error')

class CartsService {
	async getCartByEmail(email, res, next) {
		let cart
		try {
			cart = await cartContainer.getByEmail(email)
			if (cart) {
				return res.json(cart)
			}
		} catch (err) {
			return next(new HttpError('Something went wrong, try again later.', 500))
		}
		if (!cart) {
			return next(new HttpError('Cart not found', 404))
		}
	}

	async newCart(cart, res, next) {
		let newCart
		try {
			newCart = await cartContainer.save({ ...cart, timestamp: new Date().toLocaleString() })
		} catch (err) {
			return next(new HttpError('Something went wrong, could not save cart.', 500))
		}
		return res.json(newCart)
	}

	async addProductToCart(req, res, next) {
		const id = req.params.id
		const { productId, qty } = req.body
		let cart
		try {
			cart = await cartContainer.getById(id)
		} catch (err) {
			return next(new HttpError('Something went wrong, could not update cart.', 500))
		}
		if (!cart) {
			return next(new HttpError('Cart not found', 404))
		}

		let productAdd
		try {
			productAdd = await productContainer.getById(productId)
		} catch (err) {
			return next(new HttpError('Something went wrong, could not update cart.', 500))
		}
		if (!productAdd) {
			return next(new HttpError('Product not found', 404))
		}

		cart.productsInCart.push({ qty: qty, productId: productAdd.id })
		try {
			await cartContainer.updateById(cart._id, cart)
		} catch (err) {
			return next(new HttpError('Something went wrong, could not update cart.', 500))
		}
		return res.json({ message: 'Product added to cart successfully' })
	}

	async deleteProductFromCart(req, res, next) {
		let cart
		try {
			cart = await cartContainer.getById(req.params.id)
		} catch (err) {
			return next(new HttpError('Something went wrong, could not update cart.', 500))
		}
		if (!cart) {
			return next(new HttpError('Cart not found', 404))
		}

		cart.productsInCart.forEach(element => {
			console.log(element._id.valueOf())
		})

		const productDelete = cart.productsInCart.find(p => p.productId == req.body.productId)

		if (!productDelete) {
			return next(new HttpError('Product not found', 404))
		}

		cart.productsInCart = cart.productsInCart.filter(p => p.productId != req.body.productId)

		try {
			await cartContainer.updateById(cart._id, cart)
		} catch (err) {
			return next(new HttpError('Something went wrong, could not update cart.', 500))
		}
		return res.json({ message: 'Product removed to cart successfully' })
	}

	async deleteCart(email, res, next) {
		let cart
		try {
			cart = await cartContainer.getByEmail(email)
		} catch (err) {
			return next(new HttpError('Something went wrong, could not update cart.', 500))
		}
		if (!cart) {
			return next(new HttpError('Cart not found', 404))
		}

		try {
			await cartContainer.deleteById(cart._id)
		} catch (err) {
			return next(new HttpError('Something went wrong, could not update cart.', 500))
		}
		return res.json({ message: 'Cart deleted successfully' })
	}
}

module.exports = CartsService
