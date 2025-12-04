/**
 * 根據傳入的 value，從 options 陣列中找到對應的 option 並回傳其 label。
 * 若未找到，則回傳空字串。
 *
 * @param options - 選項陣列，元素需包含 { value, label }
 * @param value - 需查找的 value 值
 * @returns 對應 value 的 label 字串，若查無則回傳 ""
 */

import type { OptionType } from "@/types/option";

// 取得選項標籤
export function getOptionLabel(
  options: OptionType<string | number>[],
  value: string | number
) {
  const label = options.find((option) => option.value === value)?.label ?? "";
  return label as string;
}
