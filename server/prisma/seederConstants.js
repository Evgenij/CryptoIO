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

const manufacturers = [
	"Gigabate",
	"Axios",
	"Ziostar",
	"NSI",
	"Azrok",
	"Indell",
	"RaiseN",
	"Silence",
	"CoolMonster",
	"Arktik",
	"BSCooler",
	"PVLite",
	"Jirex",
	"GraphiX",
	"GamesKill",
	"Apacher",
	"Transent",
	"Kiozia",
	"Eastern",
	"Thermalite",
];

const specifications = [
	{
		name: "Capacity",
		label: "GB",
	},
	{
		name: "Socket",
		label: null,
	},
	{
		name: "RAM type",
		label: null,
	},
	{
		name: "Max RAM size",
		label: null,
	},
	{
		name: "Videocard slots",
		label: null,
	},
	{
		name: "RAM slots",
		label: null,
	},
	{
		name: "Frequency",
		label: "MHz",
	},
	{
		name: "Cores count",
		label: null,
	},
	{
		name: "Threads count",
		label: null,
	},
	{
		name: "TDP",
		label: "W",
	},
	{
		name: "Max temperature",
		label: "°C",
	},
	{
		name: "Max cooling TDP",
		label: "W",
	},
	{
		name: "Type",
		label: null,
	},
	{
		name: "Size",
		label: "GB",
	},
	{
		name: "Core frequency",
		label: "MHz",
	},
	{
		name: "Memory frequency",
		label: "MHz",
	},
	{
		name: "Power",
		label: "W",
	},
	{
		name: "Thermal condition",
		label: null,
	},
	{
		name: "Supply slots",
		label: null,
	},
	{
		name: "Temperature drop",
		label: "°C",
	},
];

module.exports = { types, manufacturers, specifications };
