const express = require("express");
require("./db/conn");
require("dotenv").config();
const path = require("path");

//Admin
const AdminUserRegistrationRoute = require("./routes/register-route/AdminUserRegisterRoute");

//User
const RegisterUserRoute = require("./routes/register-route/RegisterUserRoute");
const SigninRouter = require("./routes/sign-in/SignInRoute");
const userProductRouter = require("./routes/product/UserProduct");
const transactionRouter = require("./routes/transactions/Transactions");

//Supplier
const productRouter = require("./routes/product/ProductList");
const recommenderRouter = require("./routes/recommender/Recommender");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//admin
app.use(AdminUserRegistrationRoute);

//user
app.use(RegisterUserRoute);
app.use(SigninRouter);
app.use(userProductRouter);
app.use(transactionRouter);

// supplier
app.use(productRouter);
app.use(recommenderRouter);

app.use("/uploads", express.static("./uploads"));

// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "client/build")));

// 	app.get("*", function (req, res) {
// 		res.sendFile(path.join(__dirname, "client/build", "index.html"));
// 	});
// }

app.listen(port, () => {
	console.log(`Server is running at port: ${port}`);
});
