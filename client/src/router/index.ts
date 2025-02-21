import { createBrowserRouter } from "react-router-dom";
import {
	AUTH_ROUTE,
	DASHBOARD_ROUTE,
	ROOT_ROUTE,
} from "../constants/routes.ts";
import { AuthLayout } from "../pages/layouts/AuthLayout.tsx";
import { Root } from "../pages/auth/Root.tsx";
import { AuthPage } from "../pages/auth/Auth.tsx";
import { DashboardLayout } from "../pages/layouts/DashboardLayout.tsx";
import { Dashboard } from "../pages/dashboard/Dashboard.tsx";

const router = createBrowserRouter([
	//public routes
	{
		path: ROOT_ROUTE,
		Component: AuthLayout,
		children: [
			{
				path: ROOT_ROUTE,
				Component: Root,
			},
			{
				path: AUTH_ROUTE,
				Component: AuthPage,
			},
		],
	},
	//protected routes
	{
		path: DASHBOARD_ROUTE,
		Component: DashboardLayout,
		children: [
			{
				path: DASHBOARD_ROUTE,
				Component: Dashboard,
			},
		],
	},
]);

export default router;
