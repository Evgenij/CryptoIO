const bcrypt = require("bcrypt");
const uuid = require("uuid");
const UserDTO = require("../../DTOs/userDTO");
const tokenService = require("./tokenService");
const mailService = require("./mailService");
const { prisma } = require("../../prisma/prismaClient");
const ApiError = require("../../error/ApiError");

class UserService {
	async registration(nickname, email, password) {
		const candidate = await prisma.user.findFirst({
			where: { OR: [{ email }, { nickname }] },
		});

		if (candidate) {
			throw ApiError.badRequest(
				`A user with mail address ${email} or nickname ${nickname} already exists`
			);
		}

		const hashPassword = bcrypt.hashSync(password, 7);
		const activationLink = uuid.v4();

		const user = await prisma.user.create({
			data: {
				email,
				password: hashPassword,
				nickname,
				activationLink,
			},
		});

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
		const user = await prisma.user.findFirst({
			where: { activationLink },
		});

		if (!user) {
			throw ApiError.badRequest("User don't found");
		}

		await prisma.user.update({
			where: { id: user.id },
			data: { isActivated: true },
		});
	}

	async login(nickname, password) {
		const user = await prisma.user.findFirst({
			where: { nickname },
		});

		if (!user) {
			throw ApiError.badRequest(
				`User with nickname '${nickname}' don't found`
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

		//console.log(userData, tokenFromDB);

		if (!userData || !tokenFromDB) {
			throw ApiError.forbidden("Tokens are not valid");
		}

		const user = await prisma.user.findFirst({
			where: { id: userData.id },
		});
		const userDTO = new UserDTO(user); // id, nickname, isActivated
		const tokens = await tokenService.generateTokens({ ...userDTO });

		await tokenService.saveToken(userDTO.id, tokens.refreshToken);

		return {
			tokens,
			user,
		};
	}

	async getAllUsers() {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				nickname: true,
				isActivated: true,
			},
		});
		return users;
	}

	async getData(id) {
		return await prisma.user.findUnique({ where: { id: id } });
	}
}

module.exports = new UserService();
