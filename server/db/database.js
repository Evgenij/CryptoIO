const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("./config");

const sequelize = new Sequelize(config[env]);

sequelize
	.authenticate()
	.then(() => {
		console.log(
			"------ Connection to the database has been established successfully. ------"
		);
	})
	.catch((err) => {
		console.error("!!! Unable to connect to the database:", err);
	});
// const User = require("./models/user");
// User.hasMany(User, { as: "friends", foreignKey: "friendId" });

module.exports = sequelize;
