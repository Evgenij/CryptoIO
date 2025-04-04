import React, { FC, useState, useEffect } from "react";
import { jc } from "../../../utils/joinClasses";
import styles from "./ProductImageDisplay.module.scss";

interface Props {
	image: string;
	level: number;
	className?: string;
}

interface IData {
	key: string;
}

const colorOfLevel: { [key: number]: string } = {
	1: "#525354",
	2: "#094DCA",
	3: "#3B8E07",
	4: "#FD900D",
	5: "#B00D0D",
	6: "#FDC527",
	7: "#FDFDFD",
};

export const ProductImageDisplay: FC<Props> = ({ className, image, level }) => {
	// state
	const [] = useState<IData>({ key: "data" });
	const borderColor = colorOfLevel[level];

	console.log(borderColor);

	// inner functions
	const hexToRGB = (hex: string, alpha: number): string => {
		let r = parseInt(hex.slice(1, 3), 16),
			g = parseInt(hex.slice(3, 5), 16),
			b = parseInt(hex.slice(5, 7), 16);

		return alpha
			? "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")"
			: "rgb(" + r + ", " + g + ", " + b + ")";
	};

	// handlers

	// hooks
	useEffect(() => {}, []);

	return (
		<div
			style={{
				borderImage: `linear-gradient(145deg, ${borderColor} 0%, ${hexToRGB(
					borderColor,
					0.1
				)} 25%,${hexToRGB(
					borderColor,
					0.1
				)} 75%, ${borderColor} 100%) 1`,
			}}
			className={[
				styles.ProductImageDisplay,
				"flex items-center justify-center",
			].join(" ")}
		>
			<div
				style={{
					background: `linear-gradient(145deg, ${hexToRGB(
						borderColor,
						0.15
					)} 0%, ${hexToRGB(borderColor, 0.05)} 30%, ${hexToRGB(
						borderColor,
						0.05
					)} 70%, ${hexToRGB(borderColor, 0.15)} 100%`,
				}}
				className={jc("flex w-full items-center justify-center")}
			>
				<img
					className={"p-5 h-48 w-full object-contain"}
					src={image}
					alt={image}
				/>
			</div>
		</div>
	);
};
