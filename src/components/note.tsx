import { Repeat } from "@/components/icons"

export const Note = () => (
  <div className="center middle absolute w-[68vw] max-w-sm flex-col gap-6 text-center opacity-0 fade-in">
    <a
      href="/"
      className="center rounded-full border border-neutral-500/30 p-4"
    >
      <Repeat />
    </a>
    <span className="font-light text-neutral-500">
      That is the end of this &quot;collection&quot;. I hope you enjoyed and I
      see you guys again, very, very soon.
    </span>
    <span className="-mt-2 text-neutral-700">Later!</span>
  </div>
)
