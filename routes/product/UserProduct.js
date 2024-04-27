const express = require("express");
const userProductRouter = new express.Router();
const productModel = require("../../models/ProductSchema");

// search product
userProductRouter.get("/main/search-product", async (req, res) => {
	try {
		const search = req.query.search || "";

		const product = await productModel.find({ name: { $regex: search, $options: "i" } });
		res.status(200).json({ status: 200, body: product });
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

userProductRouter.get("/main/design-product", async (req, res) => {
	try {
		const search = req.query.search || "";

		const product = await productModel.find({ interior: { $regex: search, $options: "i" } });
		res.status(200).json({ status: 200, body: product });
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

// get product by category
userProductRouter.get("/main/sub-product/masonry", async (req, res) => {
	try {
		const getProductByNewStocks = await productModel.find({ category: "Masonry" });
		res.status(200).json(getProductByNewStocks);
	} catch (error) {
		res.status(404).json(error);
	}
});

userProductRouter.get("/main/sub-product/electrical", async (req, res) => {
	try {
		const getProductByNewStocks = await productModel.find({ category: "Electrical" });
		res.status(200).json(getProductByNewStocks);
	} catch (error) {
		res.status(404).json(error);
	}
});

userProductRouter.get("/main/sub-product/steel", async (req, res) => {
	try {
		const getProductByNewStocks = await productModel.find({ category: "Steel" });
		res.status(200).json(getProductByNewStocks);
	} catch (error) {
		res.status(404).json(error);
	}
});

userProductRouter.get("/main/sub-product/roofing", async (req, res) => {
	try {
		const getProductByNewStocks = await productModel.find({ category: "Roofing" });
		res.status(200).json(getProductByNewStocks);
	} catch (error) {
		res.status(404).json(error);
	}
});

userProductRouter.get("/main/sub-product/concreting", async (req, res) => {
	try {
		const getProductByNewStocks = await productModel.find({ category: "Concreting" });
		res.status(200).json(getProductByNewStocks);
	} catch (error) {
		res.status(404).json(error);
	}
});

userProductRouter.get("/main/sub-product/framing", async (req, res) => {
	try {
		const getProductByNewStocks = await productModel.find({ category: "Framing" });
		res.status(200).json(getProductByNewStocks);
	} catch (error) {
		res.status(404).json(error);
	}
});

userProductRouter.get("/main/sub-product/flooring", async (req, res) => {
	try {
		const getProductByNewStocks = await productModel.find({ category: "Flooring" });
		res.status(200).json(getProductByNewStocks);
	} catch (error) {
		res.status(404).json(error);
	}
});

// get product by sub category

userProductRouter.get("/main/sub-product/newstocks", async (req, res) => {
	try {
		const getProductByNewStocks = await productModel.find({ subcategory: "New Stocks" });
		res.status(200).json(getProductByNewStocks);
	} catch (error) {
		res.status(404).json(error);
	}
});

userProductRouter.get("/main/sub-product/discounted", async (req, res) => {
	try {
		const getProductByNewStocks = await productModel.find({ subcategory: "Discounted Items" });
		res.status(200).json(getProductByNewStocks);
	} catch (error) {
		res.status(404).json(error);
	}
});

userProductRouter.get("/main/sub-product/flash", async (req, res) => {
	try {
		const getProductByNewStocks = await productModel.find({ subcategory: "Flash Deals" });
		res.status(200).json(getProductByNewStocks);
	} catch (error) {
		res.status(404).json(error);
	}
});

// get all product
userProductRouter.get("/main/sub-product", async (req, res) => {
	try {
		const getProductByNewStocks = await productModel.find();
		res.status(200).json(getProductByNewStocks);
	} catch (error) {
		res.status(404).json(error);
	}
});

module.exports = userProductRouter;
