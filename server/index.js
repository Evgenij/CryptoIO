require("dotenv").config();
const express = require("express");
const sequelize = require("./DB");
const cors = require("cors");
const router = require("./routes/router");
const handlingError = require("./middleware/ErrorHandlingMiddleware");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = process.env.PORT || 7000;
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));

app.use("/api", router);
app.use(handlingError);

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
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
