import React, { FC, useState, useEffect } from "react";
import { jc } from "../../utils/joinClasses";
import { Button } from "primereact/button";

interface Props {
	value: number;
	setCount: React.Dispatch<React.SetStateAction<number>>;
	minValue?: number;
	className?: string;
}

enum ECounter {
	plus = "plus",
	minus = "minus",
}

export const Counter: FC<Props> = ({
	className,
	value,
	setCount,
	minValue = 0,
}) => {
	// handlers
	const handlerClick = (typeEvent: ECounter) => {
		if (typeEvent === ECounter.plus) {
			setCount((prev) => prev + 1);
		} else {
			setCount((prev) => prev - 1);
		}
	};

	return (
		<div className={jc(className, "flex bg-white/5")}>
			<Button
				type="button"
				outlined
				label="-"
				size="small"
				className="w-[40px]"
				name="minus"
				disabled={value === minValue}
				onClick={() => handlerClick(ECounter.minus)}
			/>
			<span className="flex items-center justify-center w-[40px]">
				{value}
			</span>
			<Button
				type="button"
				outlined
				label="+"
				size="small"
				name="plus"
				className="w-[40px]"
				onClick={() => handlerClick(ECounter.plus)}
			/>
		</div>
	);
};
