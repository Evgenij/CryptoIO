import { createBrowserRouter } from "react-router-dom";
import {
	LOGIN_ROUTE,
	MENU_ROUTE,
	ROOT_DASHBOARD_ROUTE,
	REGISTRATION_ROUTE,
	ROOT_ROUTE,
	SHOP_ROUTE,
	MINING_ROUTE,
} from "./routes.ts";
import { AuthLayout } from "../pages/layouts/AuthLayout.tsx";
import { Root } from "../pages/auth/Root.tsx";
import { AuthPage } from "../pages/auth/Auth.tsx";
import { DashboardLayout } from "../pages/layouts/DashboardLayout.tsx";
import { MiningArea } from "../pages/dashboard/MiningArea.tsx";
import { Menu } from "../pages/Menu.tsx";
import { Shop } from "../pages/dashboard/shop/Shop.tsx";

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
				path: LOGIN_ROUTE,
				Component: AuthPage,
			},
			{
				path: REGISTRATION_ROUTE,
				Component: AuthPage,
			},
		],
	},
	//protected routes
	{
		path: MENU_ROUTE,
		Component: Menu,
	},

	{
		path: ROOT_DASHBOARD_ROUTE,
		Component: DashboardLayout,
		children: [
			{
				path: MINING_ROUTE,
				Component: MiningArea,
			},
			{
				path: SHOP_ROUTE,
				Component: Shop,
			},
		],
	},
]);

export default router;
