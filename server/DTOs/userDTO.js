module.exports = class UserDTO {
	email;
	id;
	nickname;
	isActivated;

	constructor(model) {
		this.email = model.email;
		this.id = model.id;
		this.nickname = model.nickname;
		this.isActivated = model.isActivated;
	}
};
