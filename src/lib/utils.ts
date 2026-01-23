import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// 合併多個 class 名稱並自動去除重複與衝突的 Tailwind class
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
