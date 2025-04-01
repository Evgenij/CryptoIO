import React, { FC, useState, useEffect } from "react";
import { jc } from "../../utils/joinClasses";

interface Props {
	title: string | undefined;
	className?: string;
}

interface IData {
	key: string;
}

export const PageHeader: FC<Props> = ({ className, title }) => {
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
		<header className={jc(className, "font-semibold text-4xl")}>
			<span className="text-primary">[</span>
			{title}
			<span className="text-primary">]</span>
		</header>
	);
};
