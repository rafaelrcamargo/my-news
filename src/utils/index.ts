import { clsx, type ClassValue } from "clsx"

export const cn = (...inputs: ClassValue[]) => clsx(inputs)

// ? This code is used to convert a string to a unique integer (0 - 9).
export const toInt = (x = "") =>
  Number(
    x // Input string
      .split("") // Split string into array of characters
      .reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0) // Convert each character to a number and hash it
      .toFixed() // Convert to an integer
      .slice(1, 2) // Get the second digit
  ) || 0 // If NaN, return 0
