"use strict";
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database");

const User = sequelize.define(
	"User",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		email: { type: DataTypes.STRING, unique: true },
		password: { type: DataTypes.STRING },
		nickname: { type: DataTypes.STRING, unique: true },
		isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
		activationLink: { type: DataTypes.STRING },
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
	},
	{
		sequelize,
		modelName: "User",
	}
);

module.exports = User;
