import { FC, useState, useEffect } from "react";
import { jc } from "../utils/joinClasses";
import { Logo } from "../components/Logo";
import { MenuButton } from "../components/ui";
import { DASHBOARD_ROUTE } from "../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../store/slices/userSlice";
import { AppDispatch } from "../store";
import router from "../router";

export const Menu: FC = () => {
	// state
	const [] = useState();
	let user = useSelector((state: any) => state.user.userData);
	const dispatch = useDispatch<AppDispatch>();

	// inner functions
	// const someFunc = () => {}

	// handlers
	// const handlerChange: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {}

	// hooks
	useEffect(() => {
		if (user) {
		} else {
			dispatch(getUserData(1)); // Hardcode - user id for testing after reload page
		}
	}, []);

	return (
		<main
			className={jc(
				"h-screen flex flex-col space-y-20 items-center justify-center pattern-dots-md text-zinc-900/60"
			)}
		>
			<Logo />
			<section className="flex menu gap-5 text-white">
				<div className="menu_col flex flex-col gap-5">
					<div className="menu_row">
						<MenuButton
							header="Continue career"
							to={DASHBOARD_ROUTE}
						>
							<main className="flex flex-col h-50 w-100 justify-end p-3 relative overflow-hidden">
								<img
									className="absolute -top-5 -right-30 group-hover:scale-105"
									src="/images/components_group.png"
									alt="components_group"
									srcSet="/images/components_group.png"
								/>
								<h3 className="text-xl">{user?.nickname}</h3>
								<span className="font-light">
									last session 04.02.2025 14:23
								</span>
							</main>
						</MenuButton>
					</div>
					<div className="menu_row">
						<MenuButton header="New career" to={DASHBOARD_ROUTE}>
							<main className="flex flex-col h-30 w-100 justify-center items-center p-3 relative overflow-hidden">
								<img
									className="absolute left-5 scale-80 opacity-0 group-hover:scale-100 group-hover:opacity-100"
									src="/images/components_group_career.png"
									alt="components_group"
									srcSet="/images/components_group_career.png"
								/>
								<div className="plus w-10 h-10 text-lg leading-0 flex justify-center items-center bg-white/10 rounded-full group-hover:bg-green-600 group-hover:scale-110">
									+
								</div>
							</main>
						</MenuButton>
					</div>
					<div className="menu_row">
						<MenuButton
							header="Log out"
							to={DASHBOARD_ROUTE}
						></MenuButton>
					</div>
				</div>
				<div className="menu_col">
					<MenuButton
						className="h-full"
						header="Partners"
						to={DASHBOARD_ROUTE}
					>
						<main className="flex-1 w-60 p-3 relative overflow-hidden">
							<img
								className="absolute bottom-0 left-0 scale-120 group-hover:scale-125"
								src="/images/partners.svg"
								alt="partners"
								srcSet="/images/partners.svg"
							/>
							<p>You have 2 partners</p>
						</main>
					</MenuButton>
				</div>
				<div className="menu_col">
					<MenuButton
						className="h-full"
						header="Players"
						to={DASHBOARD_ROUTE}
					>
						<main className="flex-1 w-60 p-3 relative overflow-hidden">
							<img
								className="absolute bottom-12 -left-20 scale-170 group-hover:scale-175"
								src="/images/players.svg"
								alt="players"
								srcSet="/images/players.svg"
							/>
							<p>123 player(s)</p>
						</main>
					</MenuButton>
				</div>
			</section>
		</main>
	);
};
