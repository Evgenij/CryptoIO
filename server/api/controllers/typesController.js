const { responseStatuses } = require("../../consts");
const ApiError = require("../../error/ApiError");
const typeService = require("../services/typeService");

class TypeController {
	async create(req, res, next) {
		const { name } = req.body;

		if (!name) {
			next(ApiError.badRequest("Name is required"));
		} else {
			try {
				const newType = await typeService.create(name);

				return res.status(responseStatuses.OK).json({ data: newType });
			} catch (error) {
				next(error);
			}
		}
	}

	async getAll(req, res, next) {
		try {
			const types = await typeService.getAll();

			return res.status(responseStatuses.OK).json({ data: types });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new TypeController();
