import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//styles and icons
import "./tailwindStyles.css";
import "./styles/index.scss";
import "primeicons/primeicons.css";
import "primereact/resources/themes/viva-dark/theme.css";

//router
import router from "./router";
import { RouterProvider } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

//app entry
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}></RouterProvider>
		</Provider>
	</StrictMode>
);
