const jwt = require("jsonwebtoken");
const { prisma } = require("../../prisma/prismaClient");

class TokenService {
	async generateTokens(payload) {
		try {
			const accessToken = jwt.sign(
				payload,
				process.env.JWT_ACCESS_SECRET,
				{ expiresIn: "15m" }
			);
			const refreshToken = jwt.sign(
				payload,
				process.env.JWT_REFRESH_SECRET,
				{ expiresIn: "30d" }
			);

			return {
				accessToken,
				refreshToken,
			};
		} catch (e) {
			console.log(e);
		}
	}

	async saveToken(userId, refreshToken) {
		try {
			const tokenData = await prisma.token.findFirst({
				where: { userId },
			});

			//console.log(tokenData);

			if (tokenData) {
				//tokenData.refreshToken = refreshToken;
				return await prisma.token.update({
					where: { id: tokenData.id },
					data: { refreshToken },
				});
			}

			return await prisma.token.create({
				data: {
					refreshToken,
					userId,
				},
			});
		} catch (e) {
			console.log(e);
		}
	}

	async removeToken(refreshToken) {
		try {
			if (!refreshToken) {
				throw ApiError.badRequest("No refresh token");
			}

			await prisma.token.delete({
				where: { refreshToken },
			});

			return { message: "RefreshToken is cleaned" };
		} catch (e) {
			console.log(e);
		}
	}

	async validateAccessToken(token) {
		try {
			return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
		} catch (error) {
			return null;
		}
	}
	async validateRefreshToken(token) {
		try {
			return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
		} catch (error) {
			return null;
		}
	}

	async findToken(refreshToken) {
		try {
			return await prisma.token.findFirst({
				where: { refreshToken },
			});
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new TokenService();
