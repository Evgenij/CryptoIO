import React, { FC, useState, useEffect } from "react";
import { jc } from "../../../utils/joinClasses";
import { GroupRadioButtons } from "../../../components/ui";
import { MultiSelect } from "primereact/multiselect";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { getAllTypes, setSelectedType } from "../../../store/slices/typesSlice";
import { Type } from "../../../api/models/Type";
import { Skeleton } from "primereact/skeleton";

export const Shop: FC = () => {
	// state
	const dispatch = useDispatch<AppDispatch>();
	const selectedType: Type = useSelector(
		(state: any) => state.types.selectedType
	);
	const loadingTypes = useSelector((state: any) => state.types.loading);
	const errorTypes = useSelector((state: any) => state.types.error);
	const types: Type[] = useSelector((state: any) => state.types.items.data);
	//const [selectedType, setSelectedType] = useState<TypeComponent | null>();
	const [selectedLevels, setSelectedLevels] = useState([]);

	const levels = [
		{ name: "Gen n.1", value: 1 },
		{ name: "Gen n.2", value: 2 },
		{ name: "Gen n.3", value: 3 },
		{ name: "Gen n.4", value: 4 },
		{ name: "Gen n.5", value: 5 },
		{ name: "Gen n.6", value: 6 },
		{ name: "Gen n.7", value: 7 },
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

	// inner functions
	const someFunc = () => {};

	// handlers
	const handlerChange: React.ChangeEventHandler<HTMLInputElement> = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {};
	const handleSelectType = (item: Type) => {
		dispatch(setSelectedType(item));
	};

	// hooks
	useEffect(() => {
		dispatch(getAllTypes());
	}, []);

	// setting default type
	useEffect(() => {
		if (types) {
			dispatch(setSelectedType(types[0]));
		}
	}, [types]);

	return (
		<div className={jc("flex gap-7")}>
			<aside className="min-w-1/6 bg-white/5">
				<h2 className="bg-white/10 text-xl font-medium px-3 p-2">
					Filters
				</h2>
				<div className="py-3 flex flex-col gap-3">
					<section className="px-3">
						{!loadingTypes ? (
							<GroupRadioButtons
								sourceData={types}
								selectedItem={selectedType}
								onSelectItem={handleSelectType}
							/>
						) : (
							<div className="flex flex-col gap-2">
								<Skeleton width="full"></Skeleton>
								<Skeleton width="full"></Skeleton>
								<Skeleton width="full"></Skeleton>
								<Skeleton width="full"></Skeleton>
								<Skeleton width="full"></Skeleton>
							</div>
						)}
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
					{selectedType?.name}
				</h3>
				<div className="products-list grid grid-cols-4 gap-4">
					{/* {products.map((product) => (
						<Product
							key={product.id}
							environment="shop"
							data={product}
						/>
					))} */}
				</div>
			</section>
		</div>
	);
};
