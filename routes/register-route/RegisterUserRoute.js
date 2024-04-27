const express = require("express");
const RegisterUserRoute = new express.Router();
const UserRegistrationModel = require("../../models/UserRegistrationSchema");

RegisterUserRoute.post("/user/activate", async (req, res) => {
	const { activationcode, firstname, middlename, lastname, email, password, confirmpassword } = req.body;

	if (!activationcode || !firstname || !lastname || !email || !accounttype || !password || !confirmpassword) {
		res.status(422).json({ error: "Fill all the required details" });
	}

	try {
		const validate = await UserRegistrationModel.find({ activationcode: activationcode, email: email });
		if (!validate) {
			res.status(422).json({ error: "Email and Activation Code are not valid" });
		} else {
			const finaluser = new UserRegistrationModel({
				firstname,
				middlename,
				lastname,
				email,
				accounttype: validate.accounttype,
				password,
				confirmpassword,
			});

			const storedata = await finaluser.save();

			res.status(201).json({ storedata });
		}
	} catch (error) {
		res.status(422).json(error);
	}
});

module.exports = RegisterUserRoute;
