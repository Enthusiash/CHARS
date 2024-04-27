const express = require("express");
const recommenderRouter = new express.Router();
const multer = require("multer");
const recommenderModel = require("../../models/RecommenderSchema");

const imgconfig = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./uploads");
	},
	filename: (req, file, callback) => {
		callback(null, `${Date.now()}. ${file.originalname}`);
	},
});

const isImage = (req, file, callback) => {
	if (file.mimetype.startsWith("image")) {
		callback(null, true);
	} else {
		callback(new Error("Only image is allowed"));
	}
};

const upload = multer({
	storage: imgconfig,
	fileFilter: isImage,
});

recommenderRouter.post("/main/add-recommendation", upload.single("photo"), async (req, res) => {
	const { filename } = req.file;
	const { name, category, size } = req.body;

	const recommendationCount = await recommenderModel.find().count();

	try {
		const finalRecommendation = new recommenderModel({
			id: recommendationCount + 1,
			name,
			category,
			imgpath: filename,
			size,
		});

		const storeData = await finalRecommendation.save();

		res.status(201).json({ status: 201, storeData });
	} catch (error) {
		res.status(422).json(error);
		console.log(error);
		console.log("catch block error");
	}
});

module.exports = recommenderRouter;