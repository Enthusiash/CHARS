const jwt = require("jsonwebtoken");
const UserRegistrationModel = require("../models/UserRegistrationSchema");
const VendorUserRegistrationModel = require("../models/VendorRegistrationSchema");
const AdminUserRegistrationModel = require("../models/AdminRegistrationSchema");
const keys = require("../config/keys");

const authenticateuser = async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		const verifyToken = jwt.verify(token, keys.cookieKey);

		const rootuser = await UserRegistrationModel.findOne({ _id: verifyToken._id });

		if (!rootuser) {
			throw new Error("Unauthorized Access");
		}

		req.token = token;
		req.rootuser = rootuser;
		req.userId = rootuser._id;

		next();
	} catch (error) {
		res.status(401).json({ message: "Unauthorize User, no token provided" });
	}
};

const authenticatesupplier = async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		const verifyToken = jwt.verify(token, keys.cookieKey);

		const rootuser = await VendorUserRegistrationModel.findOne({ _id: verifyToken._id });

		if (!rootuser) {
			throw new Error("Unauthorized Access");
		}

		req.token = token;
		req.rootuser = rootuser;
		req.userId = rootuser._id;

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({ message: "Unauthorize User, no token provided" });
	}
};

const authenticateadmin = async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		const verifyToken = jwt.verify(token, keys.cookieKey);

		const rootuser = await AdminUserRegistrationModel.findOne({ _id: verifyToken._id });

		if (!rootuser) {
			throw new Error("Unauthorized Access");
		}

		req.token = token;
		req.rootuser = rootuser;
		req.userId = rootuser._id;

		next();
	} catch (error) {
		res.status(401).json({ message: "Unauthorize User, no token provided" });
	}
};

module.exports = [authenticateuser, authenticatesupplier, authenticateadmin];
