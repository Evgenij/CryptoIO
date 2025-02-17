const { User } = require("../models/models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mailService");
const { generateTokens, saveToken } = require("./tokenService");
const UserDTO = require("../DTOs/userDTO");
const ApiError = require("../error/ApiError");

class UserService {
	async registration(nickname, email, password) {
		try {
			const candidate = await User.findOne({
				where: { [Op.or]: [{ email }, { nickname }] },
			});

			if (candidate) {
				return ApiError.badRequest(
					`A user with mail address ${email} or nickname ${nickname} already exists`
				);
			}

			const hashPassword = bcrypt.hashSync(password, 7);
			const activationLink = uuid.v4();

			const user = await User.create({
				email,
				password: hashPassword,
				nickname,
			});

			console.log("!candidate =", user, hashPassword, activationLink);

			await mailService.sendActivationMail(
				email,
				activationLink
				// `${process.env.API_URL}/api/activate/${link}`
			);

			const userDTO = new UserDTO(user); // id, nickname, email, isActivated
			const tokens = await generateTokens({ ...userDTO });

			console.log("userDTO", userDTO);

			await saveToken(userDTO.id, tokens.refreshToken);

			return {
				tokens,
				user,
			};
		} catch (e) {
			throw new Error(e.message);
		}
	}
}

module.exports = new UserService();
