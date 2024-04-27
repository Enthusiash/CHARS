const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	id: {
		type: Number,
		trimL: true,
	},
	discount: {
		type: Number,
		trimL: true,
	},
	imgpath: {
		type: String,
		required: true,
	},
	interior: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	supplier: {
		type: String,
		required: true,
	},
	supplierid: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		trimL: true,
	},
	quantity: {
		type: Number,
		trimL: true,
	},
	address: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	subcategory: {
		type: String,
		required: true,
	},
});

const productModel = new mongoose.model("product", ProductSchema);

module.exports = productModel;
