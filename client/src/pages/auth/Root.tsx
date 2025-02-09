import { Button } from "primereact/button";
import { FC } from "react";
import { Link } from "react-router-dom";
import { AUTH_ROUTE } from "../../constants/routes";

interface Props {
	className?: string;
}

export const Root: FC<Props> = () => {
	return (
		<form className="flex flex-col">
			<div className="flex gap-3 items-center text-2xl text-white">
				<Link to={AUTH_ROUTE}>
					<Button label="Sign up" outlined />
				</Link>

				<span className="opacity-30">/</span>
				<Link to={AUTH_ROUTE}>
					<Button label="Login" outlined />
				</Link>
			</div>
		</form>
	);
};
