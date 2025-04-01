import { FC, useEffect } from "react";
import { Logo } from "../../components/Logo";
import { Navigate, Outlet } from "react-router-dom";
import { jc } from "../../utils/joinClasses";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { checkAuth } from "../../store/slices/userSlice";
import router from "../../router";
import { MENU_ROUTE, ROOT_ROUTE } from "../../router/routes";

export const AuthLayout: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const isAuth = useSelector((state: any) => state.user.isAuth);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(checkAuth());
		} else {
			router.navigate(ROOT_ROUTE);
		}
	}, []);

	if (isAuth) {
		return <Navigate to={MENU_ROUTE} />;
	}

	return (
		<main
			className={jc(
				"h-screen flex flex-col space-y-20 items-center justify-center pattern-dots-md text-zinc-900/60"
			)}
		>
			<Logo />
			<Outlet />
			<footer className="flex flex-col items-center gap-10 text-zinc-700">
				<p>version 0.0.01</p>
				<p>
					by{" "}
					<a
						className="underline"
						href="https://uixer.netlify.app/"
						target="_blank"
					>
						Yevhenii Yermolenko [UIXER]
					</a>
				</p>
			</footer>
		</main>
	);
};
