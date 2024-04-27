const express = require("express");
const productRouter = new express.Router();
const multer = require("multer");
const productModel = require("../../models/ProductSchema");

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

productRouter.post("/main/add-product", upload.single("photo"), async (req, res) => {
	const { filename } = req.file;
	const { discount, name, description, supplier, supplierid, price, quantity, address, interior, category, subcategory } = req.body;

	const productCount = await productModel.find().count();

	try {
		const finalProduct = new productModel({
			id: productCount + 1,
			discount: discount === "undefined" ? 0 : discount,
			imgpath: filename,
			name,
			description,
			supplier,
			supplierid,
			price,
			quantity,
			address,
			interior,
			category,
			subcategory,
		});

		const storeData = await finalProduct.save();

		res.status(201).json({ status: 201, storeData });
	} catch (error) {
		res.status(422).json(error);
		console.log("catch block error");
	}
});

productRouter.patch("/main/update-product/:_id", async (req, res) => {
	try {
		const productId = req.params._id;
		const { name, description, price, quantity, interior, category, subcategory, discount } = req.body;

		const getProduct = await productModel.findOne({ _id: productId });

		if (!getProduct) {
			res.status(422).json({ error: `No complaint match with ${complaintid}` });
		} else {
			if (name) getProduct.name = name;
			if (description) getProduct.description = description;
			if (price) getProduct.price = price;
			if (quantity) getProduct.quantity = quantity;
			if (interior) getProduct.interior = interior;
			if (category) getProduct.category = category;
			if (subcategory) getProduct.subcategory = subcategory;
			if (discount) getProduct.discount = discount;

			const updatedData = await getProduct.save();

			res.status(201).json({ status: 201, updatedData });
		}
	} catch (error) {
		res.status(404).json(error);
	}
});

productRouter.get("/main/get-product/:supplierid", async (req, res) => {
	try {
		const getProductBySupplierId = await productModel.find({ supplierid: req.params.supplierid }).sort({ id: -1 });
		res.status(200).json({ status: 200, body: getProductBySupplierId });
	} catch (error) {
		res.status(404).json(error);
	}
});

module.exports = productRouter;
