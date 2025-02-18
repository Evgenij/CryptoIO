const { User } = require("../models/models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./MailService");
const { generateTokens, saveToken } = require("./TokenService");
const UserDTO = require("../DTOs/userDTO");
const ApiError = require("../error/ApiError");

class UserService {
	async registration(nickname, email, password) {
		const candidate = await User.findOne({
			where: { [Op.or]: [{ email }, { nickname }] },
		});

		if (candidate) {
			throw ApiError.badRequest(
				`A user with mail address ${email} or nickname ${nickname} already exists`
			);
		}

		const hashPassword = bcrypt.hashSync(password, 7);
		const activationLink = uuid.v4();

		const user = await User.create({
			email,
			password: hashPassword,
			nickname,
			activationLink,
		});

		await mailService.sendActivationMail(
			email,
			`${process.env.API_URL}/api/user/activate/${activationLink}`
		);

		const userDTO = new UserDTO(user); // id, nickname, email, isActivated
		const tokens = await generateTokens({ ...userDTO });

		await saveToken(userDTO.id, tokens.refreshToken);

		return {
			tokens,
			user,
		};
	}

	async activate(activationLink) {
		const user = await User.findOne({ where: { activationLink } });

		if (!user) {
			throw ApiError.badRequest("User don't found");
		}

		user.isActivated = true;

		await user.save();
	}

	async login(nickname, password) {
		const user = await User.findOne({ where: { nickname } });

		if (!user) {
			throw ApiError.badRequest("User don't found");
		}

		const isPassEquals = await bcrypt.compare(password, user.password);

		if (!isPassEquals) {
			throw ApiError.badRequest("Wrong password");
		}

		const userDTO = new UserDTO(user);
		const tokens = await generateTokens({ ...userDTO });

		await saveToken(userDTO.id, tokens.refreshToken);

		return {
			tokens,
			user,
		};
	}
}

module.exports = new UserService();
