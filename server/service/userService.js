// const { User,  Cart} = require("../models/models");

const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const UserDTO = require("../DTOs/userDTO");
const ApiError = require("../error/ApiError");
const tokenService = require("./tokenService");
const mailService = require("./mailService");
const User = require("../db/models/user");

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

		//await Cart.create({ UserId: user.id });

		await mailService.sendActivationMail(
			email,
			`${process.env.API_URL}/api/user/activate/${activationLink}`
		);

		const userDTO = new UserDTO(user); // id, nickname, email, isActivated
		const tokens = await tokenService.generateTokens({ ...userDTO });

		await tokenService.saveToken(userDTO.id, tokens.refreshToken);

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
			throw ApiError.badRequest(
				`User with nickname "${nickname}" don't found`
			);
		}

		const isPassEquals = await bcrypt.compare(password, user.password);

		if (!isPassEquals) {
			throw ApiError.badRequest("Wrong password");
		}

		const userDTO = new UserDTO(user);
		const tokens = await tokenService.generateTokens({ ...userDTO });

		await tokenService.saveToken(userDTO.id, tokens.refreshToken);

		return {
			tokens,
			user,
		};
	}

	async logout(refreshToken) {
		try {
			const token = await tokenService.removeToken(refreshToken);

			return token;
		} catch (error) {
			throw ApiError.badRequest(error.message);
		}
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.forbidden("No refresh token");
		}

		const userData = await tokenService.validateRefreshToken(refreshToken);
		const tokenFromDB = await tokenService.findToken(refreshToken);

		if (!userData || !tokenFromDB) {
			throw ApiError.forbidden("Tokens are not valid ");
		}

		const user = await User.findOne({ where: { id: userData.id } });
		const userDTO = new UserDTO(user); // id, nickname, email, isActivated
		const tokens = await tokenService.generateTokens({ ...userDTO });

		await tokenService.saveToken(userDTO.id, tokens.refreshToken);

		return {
			tokens,
			user,
		};
	}

	async getAllUsers() {
		const users = await User.findAll();
		return users;
	}
}

module.exports = new UserService();
