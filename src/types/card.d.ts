import type { Dispatch } from "react";
import type NEWS from "@/data/news";

type CardProps = typeof NEWS.articles[number] & {
	actions: Dispatch<"LIKE" | "DISLIKE">;
	z: number;
};
