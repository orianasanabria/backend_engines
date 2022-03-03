const express = require('express')
const Container = require('./main.js')
const app = express();

const PORT = 4040;
const products = new Container("./productos.json")

const server = app.listen(PORT, () => {
	console.log(`Server running | Port ${server.address().port}`)
})

app.get('/', (req, res) => {
	res.send(`Server running | Port ${server.address().port}`)
})

app.get('/products', (req, res) => {
	const productList = products.getAll()
	res.json(productList)
})

app.get('/randomProduct', (req, res) => {
	const randomProd = products.getRandom()
	res.json(randomProd)
})