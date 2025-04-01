import React, { FC, useState, useEffect } from "react";
import { jc } from "../../../../utils/joinClasses";
import { Link } from "react-router-dom";

interface Props {
	to: string;
	outline?: boolean;
	icon: React.ReactNode;
	text: string;
	countItems?: number;
	className?: string;
}

interface IData {
	key: string;
}

export const NavigationButton: FC<Props> = ({
	className,
	outline = false,
	icon,
	text,
	countItems,
	to,
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
		<Link
			to={to}
			className={jc(
				className,
				"flex p-5 gap-1 font-medium group cursor-pointer",
				outline ? "" : "bg-white/5 hover:bg-white/10"
			)}
		>
			<div className="group-hover:text-lime-400">{icon}</div>

			<span className={jc(outline ? "group-hover:underline" : "")}>
				{text}
			</span>
			{countItems && <span className="text-primary">[{countItems}]</span>}
		</Link>
	);
};
