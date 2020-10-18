const products = require('../data/products.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils/utils');

function findAll() {
	//return all product
	return new Promise((resolve, reject) => {
		resolve(products);
	});
}

function findById(id) {
	//return all product
	return new Promise((resolve, reject) => {
		const product = products.find((p) => p.id === id);
		resolve(product);
	});
}

function create(product) {
	//create a new product
	return new Promise((resolve, reject) => {
		const newProduct = { id: uuidv4(), ...product };
		products.push(newProduct);
		writeDataToFile('./data/products.json', products);
		resolve(newProduct);
	});
}

function update(id, productData) {
	//update props of product
	return new Promise((resolve, reject) => {
		const index = products.findIndex((p) => p.id === id);
		products[index] = { id, ...productData };

		writeDataToFile('./data/products.json', products);
		resolve(productData);
	});
}

function remove(id) {
	//update props of product
	return new Promise((resolve, reject) => {
		const index = products.findIndex((p) => p.id === id);
		const deletedProduct = products.splice(index, 1);

		writeDataToFile('./data/products.json', products);
		resolve(deletedProduct);
	});
}

module.exports = {
	findAll,
	findById,
	create,
	update,
	remove,
};
