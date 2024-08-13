import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 格式化价格的工具
export const centsToDollars = (cents: number) => {
  return (cents / 100).toFixed(2); // $19.99
};
