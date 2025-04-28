const { prisma } = require("../../prisma/prismaClient");

class ComponentService {
	async getAll() {
		return await prisma.component.findMany();
	}

	async findOne(componentId) {
		return await prisma.component.findUnique({
			where: { id: componentId },
			include: {
				Manufacturer: { include: true },
				Type: { include: true },
				specificComponent: {
					include: { Specification: true },
				},
				// SpecificComponent: {
				// 	include: {
				// 		Specification: true,
				// 	},
				// },
			},
		});

		// SpecificComponent: {
		// 	include: {
		// 		Specification: true,
		// 	},
		// },
	}
}

module.exports = new ComponentService();
