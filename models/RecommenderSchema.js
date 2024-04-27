const mongoose = require("mongoose");

const RecommenderSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	size: {
		type: Number,
		trimL: true,
	},
	imgpath: {
		type: String,
		required: true,
	},
});

const recommenderModel = new mongoose.model("recommender", RecommenderSchema);

module.exports = recommenderModel;
