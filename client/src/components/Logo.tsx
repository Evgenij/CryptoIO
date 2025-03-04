import { FC } from "react";
import { jc } from "../utils/joinClasses";
interface Props {
	className?: string;
}

export const Logo: FC<Props> = ({ className }) => {
	return (
		<img
			src="/logo.svg"
			alt="logo"
			className={jc("w-[385px]", className)}
		/>
	);
};
