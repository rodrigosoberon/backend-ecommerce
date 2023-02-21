class MessageDTO {
	constructor(data) {
		this.timestamp = data.timestamp || new Date().toLocaleString()
		this.author = data.author
		this.text = data.text
	}
}

module.exports = { MessageDTO }
