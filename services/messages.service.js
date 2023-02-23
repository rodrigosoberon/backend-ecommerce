const { MessageDTO } = require('../models/dtos/message.dto')
const MessageDao = require('../models/daos/messages.dao')
const messageDao = new MessageDao()
const HttpError = require('../utils/http-error')

class MessageService {
	async getMessages() {
		let messages
		try {
			messages = await messageDao.getAll()
			return messages
		} catch (err) {
			console.log(err)
		}
	}

	async postMessage(message) {
		let newMessage
		try {
			newMessage = await messageDao.save(message)
		} catch (err) {
			console.log('Could not save message. ', err)
		}
		return newMessage
	}
}

module.exports = MessageService
