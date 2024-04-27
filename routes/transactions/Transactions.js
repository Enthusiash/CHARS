const express = require("express");
const transactionRouter = new express.Router();
const transactionModel = require("../../models/TransactionSchema");
const deliveryModel = require("../../models/DeliverySchema");
const orderSuccessModel = require("../../models/OrderSuccessSchema");

transactionRouter.post("/main/add-order", async (req, res) => {
	const orderCount = await transactionModel.find().count();

	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	console.log(req.body);
	const items = req.body;

	let x = 0;

	items.map(async (item) => {
		try {
			const finalorder = new transactionModel({
				orderId: `TRANSACTION-00${orderCount + 1}`,
				supplier: item.supplier,
				userId: item.userId,
				address: item.address,
				supplierid: item.supplierid,
				name: item.name,
				username: item.username,
				imgpath: item.imgpath,
				ptotalprice: item.ptotalprice,
				price: item.price,
				qty: item.qty,
				timeAndDate: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
				year: `${new Date().getFullYear()}`,
				month: months[new Date().getMonth()],
				count: orderCount + 1,
				counts: orderCount + 1,
			});

			await finalorder.save({});

			// delivery transaction
			const newOrder = await transactionModel.find({ supplierid: item.supplierid, userId: item.userId, count: orderCount + 1 });

			const deliverCount = await deliveryModel.find().count();

			const finalDeliver = new deliveryModel({
				deliverId: `ORDER-00${deliverCount + 1}`,
				count: deliverCount + 1,
				supplier: item.supplier,
				userId: item.userId,
				username: item.username,
				supplierid: item.supplierid,
				address: item.address,
				items: newOrder,
				totalPrice: item.totalPrice,
				deliverystatus: "Pending",
				paymentmethod: "Cash on Delivery",
				timeAndDate: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
			});

			x++;
			if (x === items.length) {
				await finalDeliver.save();
			}
		} catch (error) {
			console.log(error);
			res.status(422).json(error);
		}
	});
});

transactionRouter.get("/main/get-individutal-order/:userId", async (req, res) => {
	try {
		const userId = req.params.userId;
		const getIndividualOrder = await deliveryModel.find({ userId: userId }).sort({ count: -1 });

		res.status(200).json({ status: 200, body: getIndividualOrder });
	} catch (error) {
		res.status(404).json(error);
	}
});

transactionRouter.get("/main/get-supplier-order/:supplierid", async (req, res) => {
	try {
		const supplierid = req.params.supplierid;
		const getIndividualOrder = await deliveryModel.find({ supplierid: supplierid }).sort({ count: -1 });

		res.status(200).json({ status: 200, body: getIndividualOrder });
	} catch (error) {
		res.status(404).json(error);
	}
});

transactionRouter.patch("/main/update-supplier-order/:_id", async (req, res) => {
	try {
		const id = req.params._id;
		const { deliverystatus } = req.body;

		const getOrder = await deliveryModel.findOne({ _id: id });

		if (!getOrder) {
			res.status(422).json({ error: `No complaint match with ${id}` });
		} else {
			if (deliverystatus) getOrder.deliverystatus = deliverystatus;
			if (deliverystatus === "Delivered") {
				getOrder.deliverytime = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
			}

			const updatedData = await getOrder.save();

			res.status(201).json({ status: 201, updatedData });

			if (deliverystatus === "Delivered") {
				const getOrderSuccess = await orderSuccessModel.findOne({ orderId: updatedData.deliverId });
				if (!getOrderSuccess) {
					const orderCount = await orderSuccessModel.find().count();

					const finalOrder = new orderSuccessModel({
						id: orderCount + 1,
						orderId: updatedData.deliverId,
						userId: updatedData.userId,
						username: updatedData.username,
						supplierid: updatedData.supplierid,
						deliverystatus: updatedData.deliverystatus,
						deliverytime: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
						paymentmethod: updatedData.paymentmethod,
						paymentstatus: "Paid",
					});

					await finalOrder.save();
				}
			}
		}
	} catch (error) {
		console.log(error);
		res.status(404).json(error);
	}
});

transactionRouter.get("/main/get-order-successful/:supplierid", async (req, res) => {
	try {
		const supplierid = req.params.supplierid;
		const getIndividualOrder = await orderSuccessModel.find({ supplierid: supplierid }).sort({ id: -1 });

		res.status(200).json({ status: 200, body: getIndividualOrder });
	} catch (error) {
		res.status(404).json(error);
	}
});

module.exports = transactionRouter;
