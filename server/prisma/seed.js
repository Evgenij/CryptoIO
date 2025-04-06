const { prisma } = require("./prismaClient");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

async function main() {
	const hashPassword = bcrypt.hashSync("pass", 7);
	const activationLink = uuid.v4();

	// user
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

	const types = [
		"RIGs",
		"Motherboards",
		"CPUs",
		"Thermal greases",
		"FANs",
		"GPUs",
		"RAMs",
		"SSDs",
		"Power supplies",
	];

	//types
	types.forEach(async (type) => {
		await prisma.type.upsert({
			where: { name: type },
			update: {},
			create: {
				name: type,
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
