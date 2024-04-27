const mongoose = require("mongoose");

const OrderSuccessSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	orderId: {
		type: String,
		required: true,
	},
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
	paymentstatus: {
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
});

const orderSuccessModel = new mongoose.model("orderSuccess", OrderSuccessSchema);

module.exports = orderSuccessModel;
