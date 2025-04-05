import React, { FC, useEffect } from "react";
import { jc } from "../../../../utils/joinClasses";
import { RadioButton } from "./RadioButton/RadioButton";

interface Props {
	sourceData: { id: number; name: string }[];
	selectedItem: { id: number; name: string };
	onSelectItem: (item: Props["selectedItem"]) => void;
	className?: string;
}

export const GroupRadioButtons: FC<Props> = ({
	className,
	selectedItem,
	onSelectItem,
	sourceData,
}) => {
	// state

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
			{sourceData.map((category) => (
				<RadioButton
					key={category.id}
					onSelectItem={(selectedItem) => onSelectItem(selectedItem)}
					checked={selectedItem?.id === category?.id}
					name="category"
					category={category}
				/>
			))}
		</div>
	);
};
