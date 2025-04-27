import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAvatarFromName(name: string) {
  const initials = name?.charAt(0)?.toUpperCase()

  const backgroundColor = "#808080"
  const textColor = "#1C1C1C"

  return {
    initials,
    backgroundColor,
    textColor,
  }
}
