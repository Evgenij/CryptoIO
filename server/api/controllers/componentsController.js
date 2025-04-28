const { responseStatuses } = require("../../consts");
const componentService = require("../services/componentService");

class ComponentController {
	async create(req, res, next) {
		const { name, typeId } = req.body;

		try {
			const component = await componentService.create(name, typeId);

			return res.status(responseStatuses.OK).json({ data: component });
		} catch (error) {
			next(error);
		}
	}
	async getAll(req, res, next) {
		const { type } = req.query;

		try {
			let components = await componentService.getAll(+type);

			return res.status(responseStatuses.OK).json({ data: components });
		} catch (error) {
			next(error);
		}
	}
	async getOne(req, res, next) {
		const { id } = req.params;
		try {
			const component = await componentService.findOne(+id);

			return res.status(responseStatuses.OK).json({ data: component });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new ComponentController();
