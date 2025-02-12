import { FC } from "react";
import { Logo } from "../../components/Logo";
import { Outlet } from "react-router-dom";
import { jc } from "../../utils/joinClasses";

export const AuthLayout: FC = () => {
	return (
		<main
			className={jc(
				"h-screen flex flex-col space-y-20 items-center justify-center pattern-dots-md text-zinc-900/60"
			)}
		>
			<Logo className="w-[385px]" />
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
