const { responseStatuses } = require("../../consts");
const ApiError = require("../../error/ApiError");
const { validationResult } = require("express-validator");
const userService = require("../services/userService");

class UserController {
	async get(req, res, next) {
		const { id } = req.params;

		if (!id) {
			next(ApiError.badRequest("Id don't set"));
		} else {
			try {
				const user = await userService.getData(+id);

				if (user) {
					return res.status(responseStatuses.OK).json(user);
				} else {
					next(ApiError.badRequest("User don't found"));
				}
			} catch (error) {
				next(error);
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
					maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
					httpOnly: true,
				});

				return res.status(responseStatuses.OK).json({ ...data });
			}
		} catch (error) {
			next(error);
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
		} catch (error) {
			next(error);
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			console.log(refreshToken);

			if (
				refreshToken !== undefined &&
				refreshToken !== null &&
				refreshToken !== ""
			) {
				const token = await userService.logout(refreshToken);
				res.clearCookie("refreshToken");
				return res.json(token);
			}

			return res.json({
				message: "RefreshToken don't exist",
			});
		} catch (error) {
			next(error);
		}
	}

	async activate(req, res, next) {
		try {
			const activationLink = req.params.link;
			await userService.activate(activationLink);

			return res.redirect(process.env.CLIENT_URL);
		} catch (error) {
			next(error);
		}
	}

	async refreshToken(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const data = await userService.refresh(refreshToken);
			res.cookie("refreshToken", data.tokens.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(data);
		} catch (error) {
			next(error);
		}
	}

	async getAllUsers(req, res, next) {
		try {
			return res.json(await userService.getAllUsers());
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new UserController();
