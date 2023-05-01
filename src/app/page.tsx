import { Deck } from "@/components/deck";

export default function Home() {
	return (
		<div className="bg-pattern">
			<Deck />
			<div className="absolute center middle w-[68vw] max-w-sm text-center flex-col gap-4">
				<span className="text-neutral-500 font-light">
					That is the end of this &quot;collection&quot;. I hope you enjoyed and
					I see you guys again, very, very soon.
				</span>
				<span className="text-neutral-700">Later!</span>
			</div>
		</div>
	);
}
