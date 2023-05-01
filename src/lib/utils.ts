import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const toInt = (x: string = "") =>
	Number(
		x
			.split("")
			.reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0)
			.toFixed()
			.slice(1, 2),
	) || 0;

export const useColorScheme = () =>
	typeof window !== "undefined"
		? window?.matchMedia?.("(prefers-color-scheme:dark)")?.matches
			? "dark"
			: "light"
		: "dark";
