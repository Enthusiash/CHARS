const express = require("express");
const SigninRouter = new express.Router();
const UserRegistrationModel = require("../../models/UserRegistrationSchema");
const VendorRegistrationModel = require("../../models/VendorRegistrationSchema");
const AdminUserRegistrationModel = require("../../models/AdminRegistrationSchema");
const [authenticateuser, authenticatesupplier, authenticateadmin] = require("../../middleware/authenticate");
const bycrpt = require("bcryptjs");

// -------------- ADMIN --------------------
SigninRouter.post("/main/admin-login", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(422).json({ error: "Fill all the details" });
	}

	try {
		const userValid = await AdminUserRegistrationModel.findOne({ email: email });

		if (userValid) {
			const isMatch = await bycrpt.compare(password, userValid.password);
			if (!isMatch) {
				res.status(422).json({ error: "Invalid Email or Password" });
			} else {
				const token = await userValid.generateAuthToken();

				// generate cookie
				res.cookie("admincookie", token, {
					expires: new Date(Date.now() + 90000000),
					httpOnly: true,
				});

				const result = {
					userValid,
					token,
				};

				res.status(201).json({ status: 201, result });
			}
		} else {
			res.status(404).json({ error: "Invalid User" });
		}
	} catch (error) {
		res.status(404).json(error);
	}
});

SigninRouter.get("/validadmin", authenticateadmin, async (req, res) => {
	try {
		const validuser = await AdminUserRegistrationModel.findOne({ _id: req.userId });
		res.status(201).json({ validuser });
	} catch (error) {
		res.status(401).json(error);
	}
});

// logout admin routes
SigninRouter.get("/main/admin-logout", authenticateadmin, async (req, res) => {
	try {
		req.rootuser.tokens = req.rootuser.tokens.filter((currElem) => {
			return currElem.token != req.token;
		});

		res.clearCookie("admincookie", { path: "/" });

		req.rootuser.save();

		res.status(201).json({ status: 201 });
	} catch (error) {
		res.status(401).json({ status: 401, error });
	}
});

// -------------- USER ----------------------

// for user login
SigninRouter.post("/main/user-login", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(422).json({ error: "Fill all the details" });
	}

	try {
		const userValid = await UserRegistrationModel.findOne({ email: email });

		if (userValid) {
			const isMatch = await bycrpt.compare(password, userValid.password);
			if (!isMatch) {
				res.status(422).json({ error: "Invalid Email or Password" });
			} else {
				const token = await userValid.generateAuthToken();

				// generate cookie
				res.cookie("usercookie", token, {
					expires: new Date(Date.now() + 90000000),
					httpOnly: true,
				});

				const result = {
					userValid,
					token,
				};

				res.status(201).json({ status: 201, result });
			}
		} else {
			res.status(404).json({ error: "Invalid User" });
		}
	} catch (error) {
		res.status(404).json(error);
	}
});

//validate user routes
SigninRouter.get("/validuser", authenticateuser, async (req, res) => {
	try {
		const validuser = await UserRegistrationModel.findOne({ _id: req.userId });
		res.status(201).json({ validuser });
	} catch (error) {
		res.status(401).json(error);
	}
});

// logout user routes
SigninRouter.get("/main/user-logout", authenticateuser, async (req, res) => {
	try {
		req.rootuser.tokens = req.rootuser.tokens.filter((currElem) => {
			return currElem.token != req.token;
		});

		res.clearCookie("usercookie", { path: "/" });

		req.rootuser.save();

		res.status(201).json({ status: 201 });
	} catch (error) {
		res.status(401).json({ status: 401, error });
	}
});

// ------------ SUPPLIER ---------
SigninRouter.post("/main/supplier-login", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(422).json({ error: "Fill all the details" });
	}

	try {
		const userValid = await VendorRegistrationModel.findOne({ email: email });

		if (userValid) {
			const isMatch = await bycrpt.compare(password, userValid.password);
			if (!isMatch) {
				res.status(422).json({ error: "Invalid Email or Password" });
			} else {
				const token = await userValid.generateAuthToken();

				// generate cookie
				res.cookie("suppliercookie", token, {
					expires: new Date(Date.now() + 90000000),
					httpOnly: true,
				});

				const result = {
					userValid,
					token,
				};

				res.status(201).json({ status: 201, result });
			}
		} else {
			res.status(404).json({ error: "Invalid User" });
		}
	} catch (error) {
		res.status(404).json(error);
	}
});

//validate supplier routes
SigninRouter.get("/validsupplier", authenticatesupplier, async (req, res) => {
	try {
		const validuser = await VendorRegistrationModel.findOne({ _id: req.userId });
		res.status(201).json({ validuser });
	} catch (error) {
		res.status(401).json(error);
	}
});

// logout supplier routes
SigninRouter.get("/main/supplier-logout", authenticatesupplier, async (req, res) => {
	try {
		req.rootuser.tokens = req.rootuser.tokens.filter((currElem) => {
			return currElem.token != req.token;
		});

		res.clearCookie("suppliercookie", { path: "/supplier-login" });

		req.rootuser.save();

		res.status(201).json({ status: 201 });
	} catch (error) {
		res.status(401).json({ status: 401, error });
	}
});

module.exports = SigninRouter;
