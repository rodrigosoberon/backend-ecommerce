const MessagesService = require('../services/messages.service')
const messages = new MessagesService()

const initSocket = io => {
	io.on('connection', async socket => {
		socket.emit('messages', await messages.getMessages())
		socket.on('newMessage', async data => {
			await messages.postMessage(data)
			io.sockets.emit('messages', await messages.getMessages())
		})
	})
}

module.exports = initSocket
