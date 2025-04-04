import React, { FC, useState, useEffect } from "react";
import { jc } from "../../utils/joinClasses";
import { Product } from "../../components/ui";

interface Props {
	className?: string;
}

interface IData {
	key: string;
}

export const MiningArea: FC<Props> = ({ className }) => {
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

	return <div className={jc(className, "text-white")}></div>;
};
