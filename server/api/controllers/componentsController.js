const { responseStatuses } = require("../../consts");
const componentService = require("../services/componentService");

class ComponentController {
	async getAll(req, res, next) {
		try {
			const components = await componentService.getAll();

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
