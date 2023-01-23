const initServer = require("./server");
require('dotenv').config()


const app = initServer()
const port = process.env.PORT || 3000

try {
    app.listen(port)
    console.log(`Listening on port ${port}`)
} catch (error) {
    console.log(error)
}
