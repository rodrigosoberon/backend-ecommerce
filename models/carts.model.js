const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const cartsCollection = 'carts'

const cartsSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		timestamp: { type: String },
		productsInCart: [{ qty: String, productId: String }],
		address: { type: String, required: true }
	},
	{ versionKey: false }
) // skips adding '__v' to DB object

const carts = mongoose.model(cartsCollection, cartsSchema)

module.exports = carts
