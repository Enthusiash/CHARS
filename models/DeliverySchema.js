const mongoose = require("mongoose");

const DeliverSchema = new mongoose.Schema({
	deliverId: {
		type: String,
		required: true,
	},
	supplier: {
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
	address: {
		type: String,
		required: true,
	},
	supplierid: {
		type: String,
		required: true,
	},
	items: [],
	deliverystatus: {
		type: String,
		required: true,
	},
	deliverytime: {
		type: String,
	},
	paymentmethod: {
		type: String,
		required: true,
	},
	timeAndDate: {
		type: String,
		required: true,
	},
	totalPrice: {
		type: Number,
		required: true,
	},
	count: {
		type: Number,
		required: true,
	},
});

const deliveryModel = new mongoose.model("delivery", DeliverSchema);

module.exports = deliveryModel;
