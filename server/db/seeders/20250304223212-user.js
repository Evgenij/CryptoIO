module.exports = {
	up: (queryInterface, Sequelize) => {
		const bcrypt = require("bcrypt");
		const uuid = require("uuid");

		const hashPassword = bcrypt.hashSync("pass", 7);
		const activationLink = uuid.v4();

		return queryInterface.bulkInsert("Users", [
			{
				nickname: "user",
				password: hashPassword,
				email: "example@example.com",
				activationLink: activationLink,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Users", null, {});
	},
};
