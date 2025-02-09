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
		<main className="h-screen flex flex-col items-center justify-center">
			<Logo className="w-[385px]" />
			<Button label="Submit" className="white" />
		</main>
	);
};
