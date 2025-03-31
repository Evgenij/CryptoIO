require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./api/routes/router");
const handlingError = require("./api/middleware/ErrorHandlingMiddleware");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = process.env.PORT || 7000;
app.use(
	cors({
		origin: ["http://localhost:5173"],
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE"],
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({}));

app.use("/api", router);
app.use(handlingError);

const start = async () => {
	try {
		app.listen(PORT, () => {
			console.log(
				`------------ Server is started in ${PORT} port ------------ `
			);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
