class ProductDto {
	constructor(data) {
		this.id = data.id
		this.name = data.name
		this.description = data.description
		this.code = data.code
		this.thumbnail = data.thumbnail
		this.price = data.price
		this.stock = data.stock
		this.timestamp = data.timestamp || new Date().toLocaleString()
	}
}

module.exports = { ProductDto }