import React, { FC, useState, useEffect } from "react";
import styles from "./RadioButton.module.scss";
import { jc } from "../../../../../utils/joinClasses";
import { Type } from "../../../../../api/models/Type";

interface Props {
	type: Type;
	checked: boolean;
	name: string;
	className?: string;
	onSelectItem: (item: Props["type"]) => void;
}

export const RadioButton: FC<Props> = ({
	className,
	type,
	name,
	checked,
	onSelectItem,
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
		<div className={jc(className, styles.RadioButton, "")}>
			<input
				type="radio"
				checked={checked}
				name={name}
				id={type.name}
				className="hidden"
				onChange={() => onSelectItem?.(type)}
			/>
			<label
				className={jc(
					"block p-2 bg-white/5 cursor-pointer hover:bg-white/10"
				)}
				htmlFor={type.name}
			>
				{type.name}
			</label>
		</div>
	);
};
