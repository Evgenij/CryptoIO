const jwt = require("jsonwebtoken");
const { Token } = require("../models/models");

class TokenService {
	async generateTokens(payload) {
		try {
			const accessToken = jwt.sign(
				payload,
				process.env.JWT_ACCESS_SECRET,
				{ expiresIn: "30m" }
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

	async saveToken(userID, refreshToken) {
		try {
			const tokenData = await Token.findOne({
				where: { UserId: userID },
			});

			if (tokenData) {
				tokenData.refreshToken = refreshToken;
				return tokenData.save();
			}

			const newToken = await Token.create({
				UserId: userID,
				refreshToken,
			});
			return newToken;
		} catch (e) {
			console.log(e);
		}
	}

	async removeToken(refreshToken) {
		try {
			await Token.destroy({
				where: { refreshToken },
			});

			return { message: "RefreshToken is cleaned" };
		} catch (e) {
			console.log(e);
		}
	}

	async validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
			return userData;
		} catch (error) {
			return null;
		}
	}
	async validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
			return userData;
		} catch (error) {
			return null;
		}
	}

	async findToken(refreshToken) {
		try {
			const token = await Token.findOne({
				where: { refreshToken },
			});

			return token;
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new TokenService();
