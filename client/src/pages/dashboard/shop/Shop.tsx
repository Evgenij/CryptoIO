import React, { FC, useState, useEffect } from "react";
import { jc } from "../../../utils/joinClasses";
import { GroupRadioButtons, Product } from "../../../components/ui";

interface Props {
	className?: string;
}

interface IData {
	key: string;
}

export const Shop: FC<Props> = ({ className }) => {
	// state
	const [] = useState<IData>({ key: "data" });
	const [selectedCategory, setSelectedCategory] = useState<number>(1);

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
	];

	// inner functions
	const someFunc = () => {};

	// handlers
	const handlerChange: React.ChangeEventHandler<HTMLInputElement> = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {};
	const handleSelectCategory = (id: number) => {
		setSelectedCategory(id);
	};

	// hooks
	useEffect(() => {}, []);

	return (
		<div className={jc(className, "flex gap-4")}>
			<aside className="w-1/8 bg-white/5">
				<h2 className="bg-white/10 text-xl font-medium px-3 p-2">
					Filters
				</h2>
				<div className="pt-3">
					<section className="px-3">
						<GroupRadioButtons
							selectedValue={selectedCategory}
							onSelectItem={handleSelectCategory}
						/>
					</section>
				</div>
			</aside>{" "}
			<section className="w-full">
				<div className="products-list grid grid-cols-4 gap-3">
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
