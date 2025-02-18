const sequelize = require("../DB");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	nickname: { type: DataTypes.STRING, unique: true },
	isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
	activationLink: { type: DataTypes.STRING },
	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
});

const Token = sequelize.define("Token", {
	refreshToken: { type: DataTypes.TEXT, unique: true },
	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
});

const Cart = sequelize.define("Cart", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
});

const Order = sequelize.define("Order", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	date: { type: DataTypes.DATE },
	totalAmount: { type: DataTypes.DOUBLE },
	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
});

const OrderComponent = sequelize.define("OrderComponent", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
});

const SupportingComponents = sequelize.define("SupportingComponents", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	supportCompID: { type: DataTypes.INTEGER },
	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
});

const Type = sequelize.define("Type", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: { type: DataTypes.STRING },
	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
});

const Manufacturer = sequelize.define("Manufacturer", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: { type: DataTypes.STRING },
	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
});

const Component = sequelize.define("Component", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
});

const Station = sequelize.define("Station", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: { type: DataTypes.STRING },
	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
});

const ComponentStation = sequelize.define("ComponentStation", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: { type: DataTypes.STRING },
	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
});

const Characteristic = sequelize.define("Characteristic", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: { type: DataTypes.STRING, unique: true },
	label: { type: DataTypes.STRING },
	value: { type: DataTypes.REAL, defaultValue: 0 },
	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
});

const CharactComponent = sequelize.define("CharactComponent", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: { type: DataTypes.STRING, unique: true },
	label: { type: DataTypes.STRING },
	value: { type: DataTypes.REAL, defaultValue: 0 },
	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
});

//1:M
User.hasMany(Order);
Order.belongsTo(User);

//1:M
User.hasMany(Token);
Token.belongsTo(User);

//1:M
Cart.hasMany(Order);
Order.belongsTo(Cart);

//1:1
Cart.hasOne(User, {
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
});
User.belongsTo(Cart);

//1:M
Component.hasMany(SupportingComponents);
SupportingComponents.belongsTo(Component);

//1:M
Type.hasMany(Component);
Component.belongsTo(Type);

//1:M
Manufacturer.hasMany(Component);
Component.belongsTo(Manufacturer);

//1:M
Order.hasMany(OrderComponent);
OrderComponent.belongsTo(Order);

//1:M
Component.hasMany(OrderComponent);
OrderComponent.belongsTo(Component);

//1:M
Station.hasMany(ComponentStation);
ComponentStation.belongsTo(Station);

//1:M
Component.hasMany(ComponentStation);
ComponentStation.belongsTo(Component);

//1:M
Characteristic.hasMany(CharactComponent);
CharactComponent.belongsTo(Characteristic, {
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
});

//1:M
Component.hasMany(CharactComponent);
CharactComponent.belongsTo(Component);

module.exports = { User, Cart, Order, Component, Manufacturer, Type, Token };
