import { Button } from "primereact/button";
import { FC } from "react";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../constants/routes";

interface Props {
	className?: string;
}

export const Root: FC<Props> = () => {
	return (
		<form className="flex flex-col">
			<div className="flex gap-3 items-center text-white">
				<Link to={REGISTRATION_ROUTE}>
					<Button label="Sign up" outlined />
				</Link>
				<span className="opacity-30">or</span>
				<Link to={LOGIN_ROUTE}>
					<Button label="Login" outlined/>
				</Link>
			</div>
		</form>
	);
};
