const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
	orderId: {
		type: String,
		required: true,
	},
	supplier: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	supplierid: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	imgpath: {
		type: String,
		required: true,
	},
	ptotalprice: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	qty: {
		type: Number,
		required: true,
	},
	year: {
		type: String,
		required: true,
	},
	month: {
		type: String,
		required: true,
	},
	timeAndDate: {
		type: String,
		required: true,
	},
	count: {
		type: Number,
		required: true,
	},
	counts: {
		type: Number,
		required: true,
	},
});

const transactionModel = new mongoose.model("transaction", TransactionSchema);

module.exports = transactionModel;
