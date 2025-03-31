const ApiError = require("../../error/ApiError");
const tokenService = require("../services/tokenService");
module.exports = async function (req, res, next) {
	try {
		if (req.headers.authorization) {
			const accessToken = req.headers.authorization.split(" ")[1];

			if (accessToken) {
				const decoded = await tokenService.validateAccessToken(
					accessToken
				);

				if (!decoded) {
					return next(ApiError.forbidden("Unauthorized"));
				}

				req.user = decoded;
				next();
			} else {
				return next(ApiError.forbidden("Unauthorized"));
			}
		} else {
			return next(ApiError.forbidden("Unauthorized"));
		}
	} catch (error) {
		return next(ApiError.forbidden("Unauthorized"));
	}
};
