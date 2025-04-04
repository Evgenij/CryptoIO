import React, { FC, useState, useEffect } from "react";
import { jc } from "../../utils/joinClasses";
import { Counter } from "./Counter";
import { ProductImageDisplay } from "./ProductImageDisplay/ProductImageDisplay";
import { Button } from "primereact/button";
import { formattingNumber } from "../../utils/formattingNumber";

interface Props {
	data: {
		id: number;
		name: string;
		image: string;
		level: number;
	};
	environment: "shop" | "storage";
	className?: string;
}

interface IData {
	key: string;
}

export const Product: FC<Props> = ({
	className,
	environment = "shop",
	data,
}) => {
	// state
	const [] = useState<IData>({ key: "data" });
	const [count, setCount] = useState<number>(1);

	// inner functions
	const someFunc = () => {};

	// handlers
	const handlerChange: React.ChangeEventHandler<HTMLInputElement> = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {};

	// hooks
	useEffect(() => {}, []);

	return (
		<div className={jc(className, "w-full flex flex-col bg-white/5")}>
			<ProductImageDisplay image={data.image} level={data.level} />
			<header className="flex p-2 px-3 bg-white text-black font-semibold text-base">
				<p>{data.name}</p>
			</header>
			<main className="flex p-2 gap-2">
				<div className="characteristic w-full bg-white/5 p-2 flex flex-col items-center">
					<p className="text-primary font-semibold">DDR3</p>
					<span className="text-xs">RAM type</span>
				</div>
				<div className="characteristic w-full bg-white/5 p-2 flex flex-col items-center">
					<p className="text-primary font-semibold">AND3+</p>
					<span className="text-xs w-max">CPU socket</span>
				</div>
			</main>
			<footer className="p-2 flex justify-between items-center bg-white/5">
				<p className="price text-xl pl-1 font-medium">
					${formattingNumber(count * 320)}
				</p>
				<div className="actions flex gap-2">
					<Counter value={count} setCount={setCount} minValue={1} />
					<Button label={`Buy`} />
				</div>
			</footer>
		</div>
	);
};
