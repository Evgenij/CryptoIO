import React, { FC, useState, useEffect } from "react";
import styles from "./RadioButton.module.scss";
import { jc } from "../../../../../utils/joinClasses";

interface Props {
	category: { id: number; name: string };
	checked: boolean;
	name: string;
	className?: string;
	onSelectItem: (id: number) => void;
}

interface IData {
	key: string;
}

export const RadioButton: FC<Props> = ({
	className,
	category,
	name,
	checked,
	onSelectItem,
}) => {
	// state
	const [] = useState<IData>({ key: "data" });

	// inner functions
	const someFunc = () => {};

	// handlers
	const handlerChange: React.ChangeEventHandler<HTMLInputElement> = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {};

	// hooks
	useEffect(() => {}, []);

	return (
		<div className={jc(className, styles.RadioButton, "")}>
			<input
				type="radio"
				checked={checked}
				name={name}
				id={category.name}
				className="hidden"
				onChange={() => onSelectItem?.(category.id)}
			/>
			<label
				className={jc(
					"block p-1 px-2 bg-white/5 cursor-pointer font-medium"
				)}
				htmlFor={category.name}
			>
				{category.name}
			</label>
		</div>
	);
};
