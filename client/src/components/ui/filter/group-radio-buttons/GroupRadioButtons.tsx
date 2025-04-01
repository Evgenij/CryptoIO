import React, { FC, useState, useEffect } from "react";
import { jc } from "../../../../utils/joinClasses";
import { RadioButton } from "./RadioButton/RadioButton";

interface Props {
	selectedValue: number;
	onSelectItem: (id: number) => void;
	className?: string;
}

interface IData {
	key: string;
}

export const GroupRadioButtons: FC<Props> = ({
	className,
	selectedValue,
	onSelectItem,
}) => {
	// state
	const [] = useState<IData>({ key: "data" });
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

	// hooks
	useEffect(() => {}, []);

	return (
		<div className={jc(className, "flex flex-col gap-2")}>
			{categories.map((category) => (
				<RadioButton
					key={category.id}
					onSelectItem={(selectedValue) =>
						onSelectItem(selectedValue)
					}
					checked={selectedValue === category.id}
					name="category"
					category={category}
				/>
			))}
		</div>
	);
};
