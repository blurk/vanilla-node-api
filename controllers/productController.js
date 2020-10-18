const Product = require('../models/productModel');
const { getPostData } = require('../utils/utils');

/**
 * @desc GET all products
 * @route GET /api/products
 */

async function getProducts(req, res) {
	try {
		const products = await Product.findAll();

		res.writeHead(200, {
			'Content-Type': 'application/json',
		});
		res.end(JSON.stringify(products));
	} catch (error) {
		console.error(error);
	}
}

/**
 * @desc GET one product by id
 * @route GET /api/products/:id
 */

async function getProduct(req, res, id) {
	try {
		const product = await Product.findById(id);

		if (!product) {
			res.writeHead(404, {
				'Content-Type': 'application/json',
			});
			res.end(JSON.stringify({ message: 'Product not found' }));
		} else {
			res.writeHead(200, {
				'Content-Type': 'application/json',
			});
			res.end(JSON.stringify({ product }));
		}
	} catch (error) {
		console.error(error);
	}
}

/**
 * @desc CREATE one product
 * @route POST /api/products/
 */

async function createProduct(req, res) {
	try {
		const body = await getPostData(req);

		const { name, description, price } = JSON.parse(body);
		const product = {
			name,
			description,
			price,
		};

		const newProduct = await Product.create(product);

		res.writeHead(201, { 'Content-Type': 'application/json' });
		return res.end(
			JSON.stringify({
				message: `Product added`,
				data: newProduct,
			})
		);
	} catch (error) {
		console.error(error);
	}
}

/**
 * @desc UPDATE one product by id
 * @route PUT /api/products/
 */

async function updateProduct(req, res, id) {
	try {
		//find the product

		const product = await Product.findById(id);

		if (!product) {
			res.writeHead(404, {
				'Content-Type': 'application/json',
			});
			res.end(JSON.stringify({ message: 'Product not found' }));
		} else {
			const body = await getPostData(req);

			const { name, description, price } = JSON.parse(body);
			const productData = {
				//if the field is empty, not update
				name: name || product.name,
				description: description || product.description,
				price: price || product.price,
			};

			const updatedProduct = await Product.update(id, productData);

			res.writeHead(201, { 'Content-Type': 'application/json' });
			return res.end(
				JSON.stringify({
					message: `Product ${id} updated`,
					data: updatedProduct,
				})
			);
		}
	} catch (error) {
		console.error(error);
	}
}

/**
 * @desc DELETE one product by id
 * @route DELETE /api/products/
 */

async function deleteProduct(req, res, id) {
	try {
		//find the product

		const product = await Product.findById(id);

		if (!product) {
			res.writeHead(404, {
				'Content-Type': 'application/json',
			});
			res.end(JSON.stringify({ message: 'Product not found' }));
		} else {
			const deletedProduct = await Product.remove(id);

			res.writeHead(201, { 'Content-Type': 'application/json' });
			return res.end(
				JSON.stringify({
					message: `Product ${id} removed`,
					data: deletedProduct,
				})
			);
		}
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
