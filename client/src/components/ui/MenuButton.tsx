import React, { FC } from "react";
import { jc } from "../../utils/joinClasses";
import { Link } from "react-router-dom";

interface Props {
	header: string;
	to: string;
	disabled?: boolean;
	children?: React.ReactNode;
	className?: string;
}

export const MenuButton: FC<Props> = ({
	className,
	to,
	header,
	children,
	disabled = false,
}) => {
	return (
		<button
			className={jc(
				className,
				"group flex flex-col bg-white/5 border-white/5 text-left w-full hover:bg-white/10 hover:border-white/10"
			)}
		>
			{disabled ? (
				<header className="bg-white/5 font-medium p-2 px-3 hover:bg-white hover:text-black">
					{header}
				</header>
			) : (
				<Link to={to} className="h-full flex flex-col">
					{header && (
						<header className="bg-white/5 font-medium p-2 px-3 group-hover:bg-white group-hover:text-black">
							{header}
						</header>
					)}
					{children}
				</Link>
			)}
		</button>
	);
};
