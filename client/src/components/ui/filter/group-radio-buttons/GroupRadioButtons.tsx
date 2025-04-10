import React, { FC, useEffect } from "react";
import { jc } from "../../../../utils/joinClasses";
import { RadioButton } from "./RadioButton/RadioButton";
import { Type } from "../../../../api/models/Type";

interface Props {
	sourceData: Type[];
	selectedItem: Type;
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
			{sourceData &&
				sourceData.map((type) => (
					<RadioButton
						key={type.id}
						onSelectItem={(selectedItem) =>
							onSelectItem(selectedItem)
						}
						checked={selectedItem?.id === type?.id}
						name="type"
						type={type}
					/>
				))}
		</div>
	);
};
