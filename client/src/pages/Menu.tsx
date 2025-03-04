import { FC, useState, useEffect } from "react";
import { Button } from "primereact/button";
import { jc } from "../utils/joinClasses";
import { Logo } from "../components/Logo";

export const Menu: FC = () => {
	// state
	const [] = useState();

	// inner functions
	// const someFunc = () => {}

	// handlers
	// const handlerChange: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {}

	// hooks
	useEffect(() => {}, []);

	return (
		<main
			className={jc(
				"h-screen flex flex-col space-y-20 items-center justify-center pattern-dots-md text-zinc-900/60"
			)}
		>
			<Logo />
		</main>
	);
};
