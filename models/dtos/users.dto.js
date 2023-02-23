class UserDto {
	constructor(data) {
		this.id = data.id
		this.name = data.name
		this.email = data.email
		this.admin = data.amin || false
	}
}

module.exports = { UserDto }
