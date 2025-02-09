import { FC } from "react";
interface Props {
	className?: string;
}

export const Logo: FC<Props> = ({ className }) => {
	return <img src="/logo.svg" alt="logo" className={className} />;
};
