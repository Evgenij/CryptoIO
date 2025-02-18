const { responseStatuses } = require("../consts");
const ApiError = require("../error/ApiError");
const sendResponse = require("../helpers/sendResponse");
const { User } = require("../models/models");
const userService = require("../service/UserService");
const { validationResult } = require("express-validator");

class UserController {
	async get(req, res, next) {
		const { id } = req.body;

		if (!id) {
			next(ApiError.badRequest("Id don't set"));
		} else {
			try {
				const user = await User.findOne({ where: { id } });

				if (user) {
					sendResponse(res, { user });
				} else {
					next(ApiError.badRequest("User don't found"));
				}
			} catch (e) {
				next(e);
			}
		}
	}

	async registration(req, res, next) {
		try {
			const { email, password, nickname } = req.body;
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return next(
					ApiError.badRequest(
						"Errors from validation",
						errors.array()
					)
				);
			}

			if (!email || !password || !nickname) {
				next(ApiError.badRequest("Incorrect data"));
			} else {
				const data = await userService.registration(
					nickname,
					email,
					password
				);

				res.cookie("refreshToken", data.tokens.refreshToken, {
					maxAge: 30 * 24 * 60 * 60 * 1000,
					httpOnly: true,
				});

				return res.status(responseStatuses.OK).json({ ...data });
			}
		} catch (e) {
			next(e);
		}
	}

	async login(req, res, next) {
		try {
			const { nickname, password } = req.body;
			const data = await userService.login(nickname, password);
			res.cookie("refreshToken", data.tokens.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.status(responseStatuses.OK).json(data);
		} catch (e) {
			next(e);
		}
	}
	async logout(req, res, next) {
		try {
		} catch (e) {}
	}
	async activateToken(req, res, next) {
		try {
			const activationLink = req.params.link;
			await userService.activate(activationLink);

			return res.redirect(process.env.CLIENT_URL);
		} catch (e) {
			next(e);
		}
	}
	async refreshToken(req, res, next) {
		try {
		} catch (e) {}
	}
}

module.exports = new UserController();
