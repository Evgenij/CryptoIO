require("dotenv").config();
const express = require("express");
const sequelize = require("./DB");

const app = express();
const PORT = process.env.PORT || 7000;

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
