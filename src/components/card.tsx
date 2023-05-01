"use client";

import { FC, memo, useEffect, useMemo, useReducer } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn, toInt, useColorScheme } from "@/lib/utils";
import { CardProps } from "@/types/card";
import Image from "next/image";

const clamp = (_: unknown, num: number) =>
	Math.min(Math.max(num * 0.1, -30), 30);

const CLASSNAME = cn(
	"m-8 max-w-[84vw] overflow-hidden md:w-[32rem] min-h-[28rem] h-[60vh] md:h-[80vh] backdrop-saturate-150 border border-neutral-200 backdrop-blur-md dark:border-neutral-900/30 absolute cursor-grab rounded-xl gap-4 flex flex-col bg-neutral-100 dark:bg-neutral-800 p-6 md:p-8",
);

const CONSTRAINTS = { left: 0, right: 0, top: 0, bottom: 0 };
const ELASTIC = {
	left: 0.25,
	right: 0.25,
	top: 0.15,
	bottom: 0.05,
};

export const Card: FC<CardProps> = ({
	title,
	description,
	urlToImage,
	url,
	author,
	source,
	actions,
	z,
}) => {
	const value = useMotionValue(0);
	const [rotate, setRotate] = useReducer(clamp, 0);

	const [leaveBy, setLeaveBy] = useReducer(
		(_: unknown, exit: "left" | "right") =>
			exit === "left" ? { x: -800 } : { x: 800 },
		{ x: 0 },
	);

	const scheme = useColorScheme();
	const states = ((s: typeof scheme) =>
		s === "dark"
			? [
					"linear-gradient(225deg, #ef4444a3 0%, #f43f5ea3 100%)",
					"linear-gradient(225deg, #262626a3 0%, #171717a3 100%)",
					"linear-gradient(225deg, #262626a3 0%, #171717a3 100%)",
					"linear-gradient(225deg, #262626a3 0%, #171717a3 100%)",
					"linear-gradient(225deg, #22c55ea3 0%, #a3e635a3 100%)",
			  ]
			: [
					"linear-gradient(225deg, #fca5a5a3 0%, #f43f5ea3 100%)",
					"linear-gradient(225deg, #fafafaa3 0%, #f5f5f5a3 100%)",
					"linear-gradient(225deg, #fafafaa3 0%, #f5f5f5a3 100%)",
					"linear-gradient(225deg, #fafafaa3 0%, #f5f5f5a3 100%)",
					"linear-gradient(225deg, #86efaca3 0%, #bef264a3 100%)",
			  ])(scheme);

	const input = [-100, -30, 0, 30, 100];
	const background = useTransform(value, input, states);

	useEffect(() => {
		const update = () => setRotate(value.get());
		const unsubscribe = value.on("change", update);

		return () => unsubscribe();
	}, [value]);

	const className = cn(
		CLASSNAME,
		"shadow-xl dark:shadow-neutral-950/50",
		`z-${z}`,
	);

	return (
		<motion.div
			drag={true}
			style={{ rotate, background }}
			className={className}
			dragElastic={ELASTIC}
			dragTransition={{
				min: 10,
				max: 100,
				bounceDamping: 10,
				bounceStiffness: 10,
				power: 10,
			}}
			dragSnapToOrigin={true}
			dragConstraints={CONSTRAINTS}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, y: 100, ...leaveBy }}
			onDragEnd={(_, { point }) => {
				if (point.y < -20) window.open(url, "_blank");

				if (point.x < 400) {
					setLeaveBy("left");
					actions("DISLIKE");
				}

				if (point.x > 600) {
					setLeaveBy("right");
					actions("LIKE");
				}
			}}
			onUpdate={(latest) => value.updateAndNotify(Number(latest.x ?? 0))}
		>
			<section className="prose prose-sm prose-neutral flex h-[-webkit-fill-available] flex-col dark:prose-invert">
				<h1 className="text-base md:text-2xl">{title} </h1>
				<div className="-mt-2 flex gap-2 text-xs text-neutral-400 md:-mt-4 md:text-sm">
					{author && (
						<>
							<span>{author}</span>
							<span>·</span>
						</>
					)}
					<span className="text-violet-500">{source.name}</span>
				</div>
				<p>{description}</p>
				{urlToImage && (
					<motion.div className="relative h-full w-full">
						<Image
							src={urlToImage}
							alt="Picture related to the article"
							priority={z === 10}
							className="pointer-events-none m-0 rounded-md border border-neutral-200 object-cover shadow-md dark:border-neutral-900/30 dark:shadow-neutral-950/30"
							loading="eager"
							fill
							sizes="(max-width: 1200px) 66vw, 33vw"
						/>
					</motion.div>
				)}
			</section>
		</motion.div>
	);
};

const change = (old: { title: string }, current: { title: string }) =>
	old.title.length === current.title.length;

type PlaceholderProps = Pick<CardProps, "title">;
export const Placeholder = memo(function Placeholder({
	title,
}: PlaceholderProps) {
	const int = useMemo(() => {
		return toInt(title);
	}, [title]);

	return (
		<>
			{console.log("Placeholder was rendered")}
			<motion.div
				className={`${CLASSNAME} z-1 min-w-[84vw] border border-neutral-200 shadow-md shadow-neutral-500/5 dark:border-neutral-900/30 dark:shadow-neutral-900/30 md:w-[32rem] md:min-w-0`}
				style={{ rotate: int }}
				transition={{ delay: int * 0.15 }}
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
			/>
		</>
	);
}, change);
