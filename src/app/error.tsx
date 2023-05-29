"use client"

type Props = { error: Error }
const Error = ({ error }: Props) => (
  <div className="center absolute left-1/2 top-1/2 z-50 w-[68vw] max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col gap-6 text-center">
    <a
      href="/"
      title="Go back to the start"
      aria-label="Go back to the start"
      className="center rounded-full border border-neutral-500/30 p-4 px-5 duration-150 hover:scale-105 hover:bg-neutral-300/50 focus:ring-1 focus:ring-violet-500/80 focus:ring-offset-2 focus:ring-offset-neutral-100 dark:hover:bg-neutral-900/50 dark:focus:ring-offset-neutral-900">
      ♻️
    </a>

    <span className="font-light text-neutral-500">Something went wrong!</span>
    <span className="-mt-4 text-neutral-700">{error.message}</span>

    <div className="absolute left-1/2 top-1/2 -z-10 h-screen w-screen -translate-x-1/2 -translate-y-1/2 bg-neutral-100 dark:bg-neutral-900" />
  </div>
)

export default Error
