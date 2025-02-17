const { responseStatuses } = require("../consts");
const ApiError = require("../error/ApiError");
const sendResponse = require("../helpers/sendResponse");
const { User } = require("../models/models");
const userService = require("../service/userService");

class UserController {
	async get(req, res, next) {
		const { id } = req.body;

		if (!id) {
			return next(ApiError.badRequest("Id don't set"));
		} else {
			try {
				const user = await User.findOne({ where: { id } });
			} catch (error) {
				return ApiError.badRequest(error.message);
			}
			sendResponse(responseStatuses.OK, res, { id });
		}
	}

	async registration(req, res, next) {
		try {
			const { email, password, nickname } = req.body;

			if (!email || !password || !nickname) {
				return next(ApiError.badRequest("Incorrect data"));
			} else {
				const data = await userService.registration(
					nickname,
					email,
					password
				);

				res.cookie("refreshToken", data.refreshToken, {
					maxAge: 30 * 24 * 60 * 60 * 1000,
					httpOnly: true,
				});

				sendResponse(responseStatuses.OK, res, { data });
			}
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	async login(req, res, next) {
		try {
		} catch (e) {}
	}
	async logout(req, res, next) {
		try {
		} catch (e) {}
	}
	async activateToken(req, res, next) {
		try {
		} catch (e) {}
	}
	async refreshToken(req, res, next) {
		try {
		} catch (e) {}
	}
}

module.exports = new UserController();
