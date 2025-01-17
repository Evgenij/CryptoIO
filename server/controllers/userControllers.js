const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");
const { User } = require("../models/models");

class UserController {
	async get(req, res, next) {
		res.status(200).json({ message: "!!!!!!" });
	}
	async create(req, res, next) {
		const { img } = req.files;
		let filename = uuid.v4() + ".png";
		img.mv(path.resolve(__dirname, "..", "static", filename));

		const user = await User.create({});

		// if (!id) {
		// 	return next(ApiError.badRequest("ID don't set"));
		// }

		// res.status(200).json({ id });
	}
}

module.exports = new UserController();
