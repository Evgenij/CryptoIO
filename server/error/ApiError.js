const { responseStatuses } = require("../consts");

class ApiError extends Error {
	constructor(status, message, errors = []) {
		super(message);
		this.status = status;
		this.message = message;
		if (errors.length !== 0) {
			this.errors = errors;
		}
	}

	static badRequest(message, errors = []) {
		return new ApiError(responseStatuses.RESPONSE_ERROR, message, errors);
	}
	static internal(message) {
		return new ApiError(responseStatuses.SERVER_ERROR, message);
	}
	static forbidden(message) {
		return new ApiError(responseStatuses.UNAUTHORIZED, message);
	}
}

module.exports = ApiError;
