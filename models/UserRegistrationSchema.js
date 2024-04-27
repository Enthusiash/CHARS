const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const UserRegistrationSchema = new mongoose.Schema({
	userId: {
		type: String,
		trim: true,
	},
	firstname: {
		type: String,
		// required: true,
		trim: true,
	},
	middlename: {
		type: String,
		trim: true,
	},
	lastname: {
		type: String,
		// required: true,
		trim: true,
	},
	activationcode: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		validator(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Not Valid Email");
			}
		},
	},
	birthdate: {
		type: String,
		trim: true,
	},
	gender: {
		type: String,
		trim: true,
	},
	contact: {
		type: String,
		trim: true,
	},
	age: {
		type: String,
		trim: true,
	},
	streetaddress: {
		type: String,
		trim: true,
	},
	province: {
		type: String,
		trim: true,
	},
	postal: {
		type: String,
		trim: true,
	},
	country: {
		type: String,
		trim: true,
	},
	accountstatus: {
		type: String,
		trim: true,
	},
	accounttype: {
		type: String,
		trim: true,
	},
	password: {
		type: String,
		minLength: 8,
	},
	confirmpassword: {
		type: String,
		minLength: 8,
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

// hashing password
UserRegistrationSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 12);
		this.confirmpassword = await bcrypt.hash(this.confirmpassword, 12);
	}
	next();
});

// generate auth token
UserRegistrationSchema.methods.generateAuthToken = async function () {
	try {
		let token25 = jwt.sign({ _id: this._id }, keys.cookieKey, { expiresIn: "1d" });

		this.tokens = this.tokens.concat({ token: token25 });
		await this.save();
		return token25;
	} catch (error) {
		console.log(error);
	}
};

const UserRegistrationModel = new mongoose.model("UserRegistration", UserRegistrationSchema);

module.exports = UserRegistrationModel;
