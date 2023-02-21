const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const messsagesCollection = 'messages'

const messagesSchema = new mongoose.Schema(
	{
		timestamp: { type: String },
		author: { type: String },
		text: { type: String }
	},
	{ versionKey: false } // skips adding '__v' to DB object
)

const messages = mongoose.model(messsagesCollection, messagesSchema)

module.exports = messages
