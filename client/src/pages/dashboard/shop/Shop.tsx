import React, { FC, useState, useEffect } from "react";
import { jc } from "../../../utils/joinClasses";
import { GroupRadioButtons, Product } from "../../../components/ui";
import { MultiSelect } from "primereact/multiselect";

interface Props {
	className?: string;
}

interface IData {
	key: string;
}

export const Shop: FC<Props> = ({ className }) => {
	// state
	const [] = useState<IData>({ key: "data" });
	const [selectedCategory, setSelectedCategory] = useState<{
		id: number;
		name: string;
	}>({
		id: 1,
		name: "RIGs",
	});
	const [selectedLevels, setSelectedLevels] = useState(null);

	const levels = [
		{ name: "Gen.1", value: 1 },
		{ name: "Gen.2", value: 2 },
		{ name: "Gen.3", value: 3 },
		{ name: "Gen.4", value: 4 },
		{ name: "Gen.5", value: 5 },
		{ name: "Gen.6", value: 6 },
		{ name: "Gen.7", value: 7 },
	];

	const products = [
		{
			id: 1,
			name: "Some name",
			image: new URL(
				"../../../images/components/cpu/cpu1-lvl1.png",
				import.meta.url
			).href,
			level: 1,
		},
		{
			id: 2,
			name: "Some name",
			image: new URL(
				"../../../images/components/cpu/cpu1-lvl2.png",
				import.meta.url
			).href,
			level: 2,
		},
		{
			id: 3,
			name: "Some name",
			image: new URL(
				"../../../images/components/cpu/cpu1-lvl3.png",
				import.meta.url
			).href,
			level: 3,
		},
		{
			id: 4,
			name: "Some name",
			image: new URL(
				"../../../images/components/cpu/cpu1-lvl4.png",
				import.meta.url
			).href,
			level: 4,
		},
		{
			id: 5,
			name: "Some name",
			image: new URL(
				"../../../images/components/cpu/cpu1-lvl5.png",
				import.meta.url
			).href,
			level: 5,
		},
		{
			id: 6,
			name: "Some name",
			image: new URL(
				"../../../images/components/cpu/cpu1-lvl6.png",
				import.meta.url
			).href,
			level: 6,
		},
		{
			id: 7,
			name: "Some name",
			image: new URL(
				"../../../images/components/cpu/cpu1-lvl7.png",
				import.meta.url
			).href,
			level: 7,
		},
	];

	const categories = [
		{
			id: 1,
			name: "RIGs",
		},
		{
			id: 2,
			name: "Motherboards",
		},
		{
			id: 3,
			name: "CPUs",
		},
		{
			id: 4,
			name: "Thermal grease",
		},
		{
			id: 5,
			name: "FANs",
		},
		{
			id: 6,
			name: "GPUs",
		},
		{
			id: 7,
			name: "RAMs",
		},
		{
			id: 8,
			name: "SSDs",
		},
		{
			id: 9,
			name: "Power sup-s",
		},
	];

	// inner functions
	const someFunc = () => {};

	// handlers
	const handlerChange: React.ChangeEventHandler<HTMLInputElement> = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {};
	const handleSelectCategory = (item: { id: number; name: string }) => {
		setSelectedCategory(item);
	};

	// hooks
	useEffect(() => {
		console.log(selectedLevels);
	}, [selectedLevels]);

	return (
		<div className={jc(className, "flex gap-7")}>
			<aside className="min-w-1/6 bg-white/5">
				<h2 className="bg-white/10 text-xl font-medium px-3 p-2">
					Filters
				</h2>
				<div className="py-3 flex flex-col gap-3">
					<section className="px-3">
						<GroupRadioButtons
							sourceData={categories}
							selectedItem={selectedCategory}
							onSelectItem={handleSelectCategory}
						/>
					</section>
					<section className="px-3 flex flex-col gap-1">
						<h3 className="text-sm ">Levels</h3>
						<MultiSelect
							value={selectedLevels}
							onChange={(e: any) => setSelectedLevels(e.value)}
							options={levels}
							optionLabel="name"
							display="chip"
							placeholder="select levels"
							maxSelectedLabels={3}
							className="w-full"
						/>
					</section>
				</div>
			</aside>
			<section className="w-full flex flex-col gap-4">
				<h3 className="text-2xl font-bold">
					<span className="text-primary">{"> "}</span>
					{selectedCategory.name}
				</h3>
				<div className="products-list grid grid-cols-4 gap-4">
					{products.map((product) => (
						<Product
							key={product.id}
							environment="shop"
							data={product}
						/>
					))}
				</div>
			</section>
		</div>
	);
};
