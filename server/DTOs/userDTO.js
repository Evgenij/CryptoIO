module.exports = class UserDTO {
	id;
	nickname;
	isActivated;

	constructor(model) {
		this.id = model.id;
		this.nickname = model.nickname;
		this.isActivated = model.isActivated;
	}
};
