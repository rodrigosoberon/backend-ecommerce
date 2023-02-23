const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const uniqueValidator = require('mongoose-unique-validator')

const usersCollection = 'users'

const userSchema = new mongoose.Schema(
	{
		name: { type: String, require: true },
		email: { type: String, require: true, unique: true },
		password: { type: String, require: true, minLength: 6 },
		admin: { type: Boolean }
	},
	{ versionKey: false }
)
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model(usersCollection, userSchema)
