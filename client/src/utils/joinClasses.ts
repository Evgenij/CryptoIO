import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function jc(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
