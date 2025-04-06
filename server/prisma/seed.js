const { prisma } = require("./prismaClient");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { types, manufacturers } = require("./seederConstants");

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

	//const typesFromDB = await prisma.type.findMany();

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
