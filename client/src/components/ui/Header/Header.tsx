import React, { FC, useState, useEffect } from "react";
import { jc } from "../../../utils/joinClasses";
import { CoinItem } from "./CoinItem";
import { formattingNumber } from "../../../utils/formattingNumber";
import { NavigationButton } from "./navigation/NavigationButton";
import {
	Cpu,
	FlaskConical,
	Package,
	ShoppingBasket,
	ShoppingCart,
} from "lucide-react";
import {
	CART_ROUTE,
	DASHBOARD_ROUTE,
	RESEARCH_ROUTE,
	SHOP_ROUTE,
	STORAGE_ROUTE,
} from "../../../router/routes";

interface Props {
	className?: string;
}

interface IData {
	key: string;
}

export const Header: FC<Props> = ({ className }) => {
	// state
	const [] = useState<IData>({ key: "data" });

	// inner functions
	const someFunc = () => {};

	// handlers
	const handlerChange: React.ChangeEventHandler<HTMLInputElement> = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {};

	// hooks
	useEffect(() => {}, []);

	return (
		<div className={jc(className, "bg-white/5 flex justify-between")}>
			<div className="coins flex bg-white/5 px-4 items-center gap-6">
				<CoinItem />
				<CoinItem />
				<CoinItem />
			</div>
			<div className="money px-4 flex gap-1 bg-white/5 items-center font-medium">
				Budget:
				<span className="text-primary">
					$ {formattingNumber(2050, 2)}
				</span>
			</div>
			<nav className="flex">
				<NavigationButton
					to={RESEARCH_ROUTE}
					outline
					text="Research"
					icon={<FlaskConical />}
				/>
				<NavigationButton
					to={STORAGE_ROUTE}
					outline
					text="Store"
					icon={<Package />}
				/>
				<menu className="flex divide-x-1 divide-white/10">
					<NavigationButton
						to={DASHBOARD_ROUTE}
						text="Mining area"
						icon={<Cpu />}
					/>
					<NavigationButton
						to={SHOP_ROUTE}
						text="Shop"
						icon={<ShoppingCart />}
					/>
					<NavigationButton
						to={CART_ROUTE}
						text="Cart"
						countItems={3}
						icon={<ShoppingBasket />}
					/>
				</menu>
			</nav>
		</div>
	);
};
