import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROOT_ROUTE } from "../../constants/routes";

interface Props {
	className?: string;
}

export const DashboardLayout: FC<Props> = () => {
	// state
	const isAuth = useSelector((state: any) => state.user.isAuth);
	// inner functions

	// handlers

	// hooks

	return !isAuth ? (
		<div className="">
			<header>header</header>
			<Outlet />
			<footer>footer</footer>
		</div>
	) : (
		<Navigate to={ROOT_ROUTE} replace />
	);
};
