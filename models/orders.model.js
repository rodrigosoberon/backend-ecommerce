const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const ordersCollection = 'orders'

const orderSchema = new mongoose.Schema(
	{
		timestamp: { type: String },
		orderNumber: { type: Number },
		buyer: { type: String },
		items: { type: Array },
		status: { type: String }
	},
	{ versionKey: false } // skips adding '__v' to DB object
)

module.exports = mongoose.model(ordersCollection, orderSchema)
