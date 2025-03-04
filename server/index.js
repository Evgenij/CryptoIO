require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/router");
const handlingError = require("./middleware/ErrorHandlingMiddleware");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = process.env.PORT || 7000;
app.use(
	cors({
		origin: ["http://localhost:5173", "http://localhost:5174"],
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
		//await sequelize.authenticate();
		//await sequelize.sync();
		app.listen(PORT, () => {
			console.log(`------ Server is started in ${PORT} port ------`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
