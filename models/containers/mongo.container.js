const { mongoose } = require('mongoose')
const { remoteConfig } = require('../../config')

class MongoContainer {
	constructor(model) {
		this.model = model
		this.connect()
	}

	connect() {
		try {
			mongoose.connect(remoteConfig.cnxStr, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				dbName: remoteConfig.client
			})
		} catch (err) {
			console.log(err)
		}
	}

	async getAll() {
		try {
			return await this.model.find()
		} catch (err) {
			console.log(err)
		}
	}

	async getById(id) {
		try {
			return await this.model.findOne({ _id: id })
		} catch (err) {
			console.log(err)
		}
	}

	async getByEmail(email) {
		try {
			return await this.model.findOne({ email: email })
		} catch (err) {
			console.log(err)
		}
	}

	async save(object) {
		const newObject = new this.model(object)
		try {
			await newObject.save()
			return newObject._id
		} catch (err) {
			console.log(err)
		}
	}

	async updateById(id, fields) {
		try {
			await this.model.updateOne({ _id: id }, fields)
		} catch (err) {
			console.log(err)
		}
	}

	async updateByEmail(email, fields) {
		try {
			await this.model.updateOne({ email: email }, fields)
		} catch (err) {
			console.log(err)
		}
	}

	async deleteById(id) {
		try {
			await this.model.deleteOne({ _id: id })
		} catch (err) {
			console.log(err)
		}
	}
}

module.exports = MongoContainer
