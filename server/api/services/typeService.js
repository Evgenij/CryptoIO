const ApiError = require("../../error/ApiError");
const { prisma } = require("../../prisma/prismaClient");

class TypeService {
	async create(name) {
		const typeForCreate = await prisma.type.findFirst({
			where: { name },
		});

		if (typeForCreate) {
			throw ApiError.badRequest(`The type '${name}' already exists`);
		}

		return await prisma.type.create({
			data: {
				name,
			},
		});
	}

	async getAll() {
		return await prisma.type.findMany();
	}
}

module.exports = new TypeService();
