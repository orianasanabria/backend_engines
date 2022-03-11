const fs = require('fs');

class Container {
	constructor(fileName) {
		this.fileName = fileName;
	}

	save(item) {
		try {
			const data = fs.readFileSync(this.fileName, "utf-8");
			const parsedData = JSON.parse(data);
			item["id"] = parsedData[parsedData.length - 1].id + 1;
			fs.writeFileSync(this.fileName, JSON.stringify([...parsedData, item], null, 2), "utf-8")
			console.log(`Item id: ${item.id}`)
		} catch (error) {
			fs.writeFileSync(this.fileName, JSON.stringify([{ ...item, id: 0 }], null, 2), "utf-8")
		}
	}
	getById(id) {
		try {
			const data = this.getAll();
			return data.find(item => item.id === id)
		} catch (error) {
			console.log(error)
		}
	}
	getAll() {
		try {
			const data = fs.readFileSync(this.fileName, "utf-8")
			const parsedData = JSON.parse(data);
			return parsedData;
		} catch (error) {
			console.log(error)
		}
	}
	deleteById(id) {
		try {
			const data = fs.readFileSync(this.fileName, "utf-8");
			const parsedData = JSON.parse(data);
			const filteredData = parsedData.filter(item => item.id !== id)
			fs.writeFileSync(this.fileName, JSON.stringify(filteredData, null, 2), "utf-8");
		} catch (error) {
			console.log(error)
		}
	}
	deleteAll() {
		try {
			fs.truncateSync(this.fileName, 0);
		} catch (error) {
			console.log(error)
		}
	}
	getRandom() {
		try {
			const productList = this.getAll();
			const id = Math.floor(Math.random() * (productList.length - 1 + 1) + 1);
			return this.getById(id);
		} catch (error) {
			console.log(error)
		}
	}


	updateProduct(id) {
		try {
			const productList = this.getAll();
			const filteredProduct = productList.find(el => el.id === id)
			if(!filteredProduct) return;

			filteredProduct.name = name;
			filteredProduct.price = price;
			filteredProduct.image = image;

			fs.writeFileSync(this.fileName, JSON.stringify(productList, null, 2), "utf-8")
		} catch (error) {
			console.log(error)
		}
	}
}

const productList = new Container("./products.json")

// productList.save(
// 	{
// 		title: 'Whatever',
// 		price: 345.67,
// 		thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
// 	}
// )

// console.log(productList.updateProduct(1))

// console.log(productList.getById(1))

// productList.deleteById(2)

// productList.deleteAll()

module.exports = Container;