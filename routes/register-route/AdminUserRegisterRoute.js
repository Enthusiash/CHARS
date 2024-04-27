const express = require("express");
const AdminUserRegistrationRoute = new express.Router();
const UserRegistrationSchema = require("../../models/UserRegistrationSchema");
const VendorUserRegistrationSchema = require("../../models/VendorRegistrationSchema");
const AdminUserRegistrationSchema = require("../../models/AdminRegistrationSchema");
const bcrypt = require("bcryptjs");

// Admin POST
AdminUserRegistrationRoute.post("/main/admin-registration", async (req, res) => {
	const { activationcode, email } = req.body;

	const adminCount = await AdminUserRegistrationSchema.find().count();

	try {
		const preuser = await AdminUserRegistrationSchema.findOne({
			email: email,
		});
		if (preuser) {
			res.status(422).json({ error: "Email is already exist" });
		} else {
			const finaluser = new AdminUserRegistrationSchema({
				adminId: `ADMIN-${adminCount + 1}`,
				activationcode,
				email,
				accounttype: "ADMIN",
				accountstatus: "NOT ACTIVATED",
			});
			const storeuser = await finaluser.save();

			res.status(201).json({ status: 201, storeuser });
		}
	} catch (error) {
		console.log(error);
		res.status(422).json(error);
	}
});

// User POST
AdminUserRegistrationRoute.post("/main/user-registration", async (req, res) => {
	const { activationcode, email } = req.body;

	const userCount = await UserRegistrationSchema.find().count();

	if (!activationcode || !email) {
		res.status(422).json({ error: "Something is missing." });
	}

	try {
		const preuser = await UserRegistrationSchema.findOne({
			email: email,
		});
		if (preuser) {
			res.status(422).json({ error: "Email is already exist" });
		} else {
			const finaluser = new UserRegistrationSchema({
				userId: `USER-${userCount + 1}`,
				activationcode,
				email,
				accounttype: "USER",
				accountstatus: "NOT ACTIVATED",
			});

			const storeuser = await finaluser.save();

			res.status(201).json({ status: 201, storeuser });
		}
	} catch (error) {
		console.log(error);
		res.status(422).json(error);
	}
});

// Supplier POST
AdminUserRegistrationRoute.post("/main/vendor-registration", async (req, res) => {
	const { activationcode, email } = req.body;

	const userCount = await VendorUserRegistrationSchema.find().count();

	if (!activationcode || !email) {
		res.status(422).json({ error: "Something is missing." });
	}

	try {
		const preuser = await VendorUserRegistrationSchema.findOne({
			email: email,
		});
		if (preuser) {
			res.status(422).json({ error: "Email is already exist" });
		} else {
			const finaluser = new VendorUserRegistrationSchema({
				vendoruserid: `SUPPLIER-${userCount + 1}`,
				activationcode,
				email,
				accounttype: "SUPPLIER",
				accountstatus: "NOT ACTIVATED",
			});

			const storeuser = await finaluser.save();

			res.status(201).json({ status: 201, storeuser });
		}
	} catch (error) {
		console.log(error);
		res.status(422).json(error);
	}
});

//admin activate
AdminUserRegistrationRoute.patch("/main/activate-admin", async (req, res) => {
	try {
		const { activationcode, firstname, middlename, lastname, email, password, confirmpassword, birthdate, gender, age } = req.body;

		const validate = await AdminUserRegistrationSchema.findOne({ activationcode: activationcode, email, email });
		if (!validate) {
			res.status(422).json({ error: "Email and Activation Code are not valid" });
		} else {
			if (firstname) validate.firstname = firstname;
			if (middlename) validate.middlename = middlename;
			if (lastname) validate.lastname = lastname;
			if (birthdate) validate.birthdate = birthdate;
			if (gender) validate.gender = gender;
			if (age) validate.age = age;
			if (password) validate.password = password;
			if (confirmpassword) validate.confirmpassword = confirmpassword;

			await validate.updateOne({ accountstatus: "VALIDATED" });

			const updatedData = await validate.save();

			res.status(201).json({ status: 201, updatedData });
		}
	} catch (error) {
		console.log(error);
		res.status(404).json(error);
	}
});

//user activate
AdminUserRegistrationRoute.patch("/main/activate-user", async (req, res) => {
	try {
		const {
			activationcode,
			firstname,
			middlename,
			lastname,
			email,
			password,
			confirmpassword,
			birthdate,
			gender,
			contact,
			age,
			streetaddress,
			province,
			postal,
			country,
		} = req.body;

		const validate = await UserRegistrationSchema.findOne({ activationcode: activationcode, email, email });
		if (!validate) {
			res.status(422).json({ error: "Email and Activation Code are not valid" });
		} else {
			if (firstname) validate.firstname = firstname;
			if (middlename) validate.middlename = middlename;
			if (lastname) validate.lastname = lastname;
			if (password) validate.password = password;
			if (confirmpassword) validate.confirmpassword = confirmpassword;
			if (birthdate) validate.birthdate = birthdate;
			if (gender) validate.gender = gender;
			if (contact) validate.contact = contact;
			if (age) validate.age = age;
			if (streetaddress) validate.streetaddress = streetaddress;
			if (province) validate.province = province;
			if (postal) validate.postal = postal;
			if (country) validate.country = country;

			await validate.updateOne({ accountstatus: "VALIDATED" });

			const updatedData = await validate.save();

			res.status(201).json({ status: 201, updatedData });
		}
	} catch (error) {
		console.log(error);
		res.status(404).json(error);
	}
});

//vendor activate
AdminUserRegistrationRoute.patch("/main/activate-vendor", async (req, res) => {
	try {
		const {
			activationcode,
			businessname,
			firstname,
			middlename,
			lastname,
			email,
			password,
			confirmpassword,
			birthdate,
			gender,
			contact,
			age,
			streetaddress,
			province,
			postal,
			country,
		} = req.body;

		const validate = await VendorUserRegistrationSchema.findOne({ activationcode: activationcode, email, email });
		if (!validate) {
			res.status(422).json({ error: "Email and Activation Code are not valid" });
		} else {
			if (businessname) validate.businessname = businessname;
			if (firstname) validate.firstname = firstname;
			if (middlename) validate.middlename = middlename;
			if (lastname) validate.lastname = lastname;
			if (password) validate.password = password;
			if (confirmpassword) validate.confirmpassword = confirmpassword;
			if (birthdate) validate.birthdate = birthdate;
			if (gender) validate.gender = gender;
			if (contact) validate.contact = contact;
			if (age) validate.age = age;
			if (streetaddress) validate.streetaddress = streetaddress;
			if (province) validate.province = province;
			if (postal) validate.postal = postal;
			if (country) validate.country = country;

			await validate.updateOne({ accountstatus: "VALIDATED" });

			const updatedData = await validate.save();

			res.status(201).json({ status: 201, updatedData });
		}
	} catch (error) {
		console.log(error);
		res.status(404).json(error);
	}
});

AdminUserRegistrationRoute.get("/main/admin", async (req, res) => {
	try {
		const listOfUsers = await AdminUserRegistrationSchema.find();
		res.status(200).json({ status: 200, body: listOfUsers });
	} catch (error) {
		res.status(422).json(error);
	}
});

AdminUserRegistrationRoute.get("/main/users", async (req, res) => {
	try {
		const listOfUsers = await UserRegistrationSchema.find();
		res.status(200).json({ status: 200, body: listOfUsers });
	} catch (error) {
		res.status(422).json(error);
	}
});

AdminUserRegistrationRoute.get("/main/vendors", async (req, res) => {
	try {
		const listOfUsers = await VendorUserRegistrationSchema.find();
		res.status(200).json({ status: 200, body: listOfUsers });
	} catch (error) {
		res.status(422).json(error);
	}
});

module.exports = AdminUserRegistrationRoute;
