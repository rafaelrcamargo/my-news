import { Repeat } from "lucide-react"

export const Outro = () => (
  <div className="center absolute left-1/2 top-1/2 w-[68vw] max-w-sm -translate-x-1/2 -translate-y-1/2 animate-fade-in flex-col gap-6 text-center opacity-0">
    <a
      href="/"
      title="Go back to the start"
      aria-label="Go back to the start"
      className="center rounded-full border border-neutral-500/30 p-4 duration-150 hover:scale-105 hover:bg-neutral-300/50 focus:ring-1 focus:ring-violet-500/80 focus:ring-offset-2 focus:ring-offset-neutral-100 dark:hover:bg-neutral-900/50 dark:focus:ring-offset-neutral-900">
      <Repeat className="stroke-neutral-500" />
    </a>

    <span className="font-light text-neutral-500">
      That is the end of this &quot;collection&quot;. I hope you enjoyed and I
      see you guys again, very, very soon.
    </span>

    <span className="-mt-2 text-neutral-700">Later!</span>
  </div>
)
