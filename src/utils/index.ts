import { clsx, type ClassValue } from "clsx"

export const cn = (...inputs: ClassValue[]) => clsx(inputs)

export const toInt = (x = "") =>
  Number(
    x
      .split("")
      .reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0)
      .toFixed()
      .slice(1, 2)
  ) || 0
