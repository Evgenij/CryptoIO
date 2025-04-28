const { prisma } = require("../../prisma/prismaClient");

class ComponentService {
	async create(data) {
		const component = await prisma.component.create({
			data: {
				...data,
				// specificComponent: {
				// 	create: {
				// 		...data.specificComponent,
				// 	},
				// },
			},
			// include: {
			// 	Manufacturer: { include: true },
			// 	Type: { include: true },
			// 	specificComponent: {
			// 		include: { Specification: true },
			// 	},
			// },
		});

		return component;
	}

	async getAll(typeId) {
		if (!typeId) {
			return await prisma.component.findMany({
				include: {
					Manufacturer: { include: true },
					Type: { include: true },
					specificComponent: {
						include: { Specification: true },
					},
				},
			});
		}

		return await prisma.component.findMany({
			where: { typeId },
			include: {
				Manufacturer: { include: true },
				Type: { include: true },
				specificComponent: {
					include: { Specification: true },
				},
			},
		});
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
