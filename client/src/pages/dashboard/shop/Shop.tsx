import React, { FC, useState, useEffect } from "react";
import { jc } from "../../../utils/joinClasses";
import { GroupRadioButtons } from "../../../components/ui";

interface Props {
	className?: string;
}

interface IData {
	key: string;
}

export const Shop: FC<Props> = ({ className }) => {
	// state
	const [] = useState<IData>({ key: "data" });
	const [selectedCategory, setSelectedCategory] = useState<number>(1);

	// inner functions
	const someFunc = () => {};

	// handlers
	const handlerChange: React.ChangeEventHandler<HTMLInputElement> = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {};
	const handleSelectCategory = (id: number) => {
		setSelectedCategory(id);
	};

	// hooks
	useEffect(() => {}, []);

	return (
		<div className={jc(className, "flex gap-4")}>
			<aside className="w-1/8 bg-white/5">
				<h2 className="bg-white/10 text-xl font-medium px-3 p-2">
					Filters
				</h2>
				<div className="pt-3">
					<section className="px-3">
						<GroupRadioButtons
							selectedValue={selectedCategory}
							onSelectItem={handleSelectCategory}
						/>
					</section>
				</div>
			</aside>{" "}
			<section>2321</section>
		</div>
	);
};
