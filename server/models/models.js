// const User = {
// 	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// 	email: { type: DataTypes.STRING, unique: true },
// 	password: { type: DataTypes.STRING },
// 	nickname: { type: DataTypes.STRING, unique: true },
// 	isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
// 	activationLink: { type: DataTypes.STRING },
// 	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
// 	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
// };

// const Career = sequelize.define("Career", {
// 	lastEnter: { type: DataTypes.DATE, defaultValue: new Date(), unique: true },
// 	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
// 	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
// });

// const Token = sequelize.define("Token", {
// 	refreshToken: { type: DataTypes.TEXT, unique: true },
// 	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
// 	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
// });

// const Cart = {
// 	id: {
// 		type: DataTypes.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true,
// 	},
// 	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
// 	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
// };

// const Order = {
// 	id: {
// 		type: DataTypes.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true,
// 	},
// 	date: { type: DataTypes.DATE },
// 	totalAmount: { type: DataTypes.DOUBLE },
// 	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
// 	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
// };

// const OrderComponent = {
// 	id: {
// 		type: DataTypes.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true,
// 	},
// 	quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
// 	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
// 	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
// };

// const SupportingComponents = {
// 	id: {
// 		type: DataTypes.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true,
// 	},
// 	supportCompID: { type: DataTypes.INTEGER },
// 	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
// 	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
// };

// const Type = {
// 	id: {
// 		type: DataTypes.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true,
// 	},
// 	name: { type: DataTypes.STRING },
// 	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
// 	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
// };

// const Manufacturer = {
// 	id: {
// 		type: DataTypes.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true,
// 	},
// 	name: { type: DataTypes.STRING },
// 	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
// 	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
// };

// const Component = {
// 	id: {
// 		type: DataTypes.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true,
// 	},
// 	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
// 	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
// };

// const Station = {
// 	id: {
// 		type: DataTypes.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true,
// 	},
// 	name: { type: DataTypes.STRING },
// 	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
// 	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
// };

// const ComponentStation = {
// 	id: {
// 		type: DataTypes.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true,
// 	},
// 	name: { type: DataTypes.STRING },
// 	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
// 	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
// };

// const Characteristic = {
// 	id: {
// 		type: DataTypes.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true,
// 	},
// 	name: { type: DataTypes.STRING, unique: true },
// 	label: { type: DataTypes.STRING },
// 	value: { type: DataTypes.REAL, defaultValue: 0 },
// 	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
// 	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
// };

// const CharactComponent = sequelize.define("CharactComponent", {
// 	id: {
// 		type: DataTypes.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true,
// 	},
// 	name: { type: DataTypes.STRING, unique: true },
// 	label: { type: DataTypes.STRING },
// 	value: { type: DataTypes.REAL, defaultValue: 0 },
// 	createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
// 	updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
// });
