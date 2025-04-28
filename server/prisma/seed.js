const { prisma } = require("./prismaClient");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { types, manufacturers, specifications } = require("./seederConstants");

const { getRandomInt } = require("../utils/getRandomInt");

async function main() {
	const hashPassword = bcrypt.hashSync("pass", 7);
	const activationLink = uuid.v4();

	//---------- user
	await prisma.user.upsert({
		where: { email: "mail@gmail.com" },
		update: {},
		create: {
			email: "mail@gmail.com",
			password: hashPassword,
			nickname: "uixer",
			activationLink,
			isActivated: false,
		},
	});

	//---------- types
	types.forEach(async (type) => {
		await prisma.type.upsert({
			where: { name: type },
			update: {},
			create: {
				name: type,
			},
		});
	});

	//---------- manufacturers
	manufacturers.forEach(async (manufacturerItem) => {
		await prisma.manufacturer.upsert({
			where: { name: manufacturerItem },
			update: {},
			create: {
				name: manufacturerItem,
			},
		});
	});

	const typesFromDB = await prisma.type.findMany();
	const manufacturersFromDB = await prisma.manufacturer.findMany();

	typesFromDB.forEach(async (type) => {
		for (let i = 1; i <= 2; i++) {
			await prisma.component.upsert({
				where: {
					name: `${type.name}-${
						manufacturersFromDB[manufacturersFromDB.length - 1].name
					}`,
				},
				update: {},
				create: {
					name: `${type.name}-${
						manufacturersFromDB[
							getRandomInt(0, manufacturersFromDB.length - 1)
						].name
					} ${getRandomInt(0, 10000)}`,
					model: `Model: ${type.name}-${
						manufacturersFromDB[
							getRandomInt(0, manufacturersFromDB.length - 1)
						].name
					} ${getRandomInt(0, 10000)}`,
					price:
						100 * getRandomInt(0, manufacturersFromDB.length - 1),
					image: "img",
					level: getRandomInt(1, 7),
					electricConsumption: Math.random(),
					watt: Math.random(),
					typeId: typesFromDB[getRandomInt(0, typesFromDB.length - 1)]
						.id,
					manufacturerId:
						manufacturersFromDB[
							getRandomInt(0, manufacturersFromDB.length - 1)
						].id,
				},
			});
		}
	});

	const componentsFromDB = await prisma.component.findMany();

	//---------- specifications
	specifications.forEach(async (specification) => {
		await prisma.specification.upsert({
			where: { name: specification.name },
			update: {},
			create: {
				name: specification.name,
				label: specification.label,
			},
		});
	});

	const specificationsFromDB = await prisma.specification.findMany();

	console.log(specificationsFromDB.length, componentsFromDB.length);

	//---------- specifications for components
	componentsFromDB.forEach(async (component) => {
		specificationsFromDB.forEach(async (specification) => {
			await prisma.specificComponent.create({
				data: {
					componentId: component.id,
					specificationId: specification.id,
					value: `${component.name} sp[${specification.name}]`,
					isKey: Math.random() < 0.5, // random boolean
				},
			});
		});
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
