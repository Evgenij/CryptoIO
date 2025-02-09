import { createBrowserRouter } from "react-router-dom";
import {
	AUTH_ROUTE,
	BASKET_ROUTE,
	DASHBOARD_ROUTE,
	EDIT_STATION_ROUTE,
	ERROR_ROUTE,
	MENU_ROUTE,
	MINING_AREA_ROUTE,
	ROOT_ROUTE,
	SHOP_ROUTE,
	STORAGE_ROUTE,
} from "../constants/routes.ts";
import { Menu } from "../pages/Menu.tsx";
import { AuthLayout } from "../pages/layouts/AuthLayout.tsx";
import { Root } from "../pages/auth/Root.tsx";
import { AuthPage } from "../pages/auth/Auth.tsx";

const router = createBrowserRouter([
	// {
	// 	path: ERROR_ROUTE,
	// 	element: <ErrorPage />,
	// },
	{
		path: MENU_ROUTE,
		Component: Menu,
	},
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
]);

export default router;
