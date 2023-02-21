const socket = io()

function showMessagges(data) {
	const html = data
		.map((elem, index) => {
			return `<div>
                <strong style="color: blue;">${elem.author}</strong> 
                <span style="color: red;">[${elem.timestamp}]</span>: 
                <em style="color: green;">${elem.text}</em>
              </div>`
		})
		.join(' ')
	document.getElementById('messages').innerHTML = html
}

function addMessage() {
	const username = document.getElementById('username')
	const message = document.getElementById('message')
	const now = new Date()
	const timestamp = now.toLocaleString()
	const mensaje = {
		author: username.value,
		text: message.value,
		timestamp: timestamp
	}
	message.value = ''
	socket.emit('newMessage', mensaje)
	return false
}

socket.on('messages', data => {
	showMessagges(data)
})
