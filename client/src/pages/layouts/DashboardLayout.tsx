import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROOT_ROUTE } from "../../router/routes";
import { Header } from "../../components/ui";
import { PageHeader } from "../dashboard/PageHeader";

interface Props {
	className?: string;
}

export const DashboardLayout: FC<Props> = () => {
	// state
	const isAuth = useSelector((state: any) => state.user.isAuth);
	const route = useLocation();

	// inner functions
	const namePage = route.pathname.split("/").pop()?.toUpperCase();

	// handlers

	// hooks

	return !isAuth ? (
		<div className="">
			<Header />
			<main className="p-4">
				<PageHeader title={namePage} />
				<section className="mt-4">
					<Outlet />
				</section>
			</main>
		</div>
	) : (
		<Navigate to={ROOT_ROUTE} replace />
	);
};
