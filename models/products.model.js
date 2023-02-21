const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const productsCollection = 'products'

const productSchema = new mongoose.Schema(
	{
		timestamp: { type: String },
		name: { type: String },
		description: { type: String },
		code: { type: String },
		thumbnail: { type: String },
		price: { type: Number },
		stock: { type: Number }
	},
	{ versionKey: false }
) // skips adding '__v' to DB object

const products = mongoose.model(productsCollection, productSchema)

module.exports = products
