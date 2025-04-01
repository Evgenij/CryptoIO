import { FC } from "react";
import { formattingNumber } from "../../../utils/formattingNumber";
import { jc } from "../../../utils/joinClasses";

interface Props {
	className?: string;
}

export const CoinItem: FC<Props> = ({ className }) => {
	// state

	// inner functions

	// handlers

	// hooks

	return (
		<div className={jc(className, "flex flex-col")}>
			<div className="flex space-x-2">
				<span className="text-sm ">Bitcoin</span>
				<span className="text-sm text-green-400">
					+{formattingNumber(0.00346455543465, 8)} Mh/h
				</span>
			</div>

			<p className="text-lg font-light">
				{formattingNumber(0.000054345, 8)}
			</p>
		</div>
	);
};
