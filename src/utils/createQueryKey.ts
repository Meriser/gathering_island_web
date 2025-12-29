/**
 * 建立唯一查詢鍵（query key）
 * - 排除空值（undefined、null、""、-1）
 * - 支援陣列，會轉為逗號分隔
 * - 物件屬性排序以保證 key 一致性
 * 
 * @param params 查詢參數物件
 * @returns 查詢鍵
 */

export const createQueryKey = <T extends Record<string, any>>(params: T): string => {
  // 如果參數不是物件，則返回空字串
  if (!params || typeof params !== "object") return "";
  
  // 取得所有 key，排序後確保 key 一致性
  const sortedEntries = Object.entries(params).sort(([a], [b]) => a.localeCompare(b));

  return sortedEntries
    // 過濾掉空值、null、undefined、空字串、-1
    .filter(([, val]) => val !== undefined && val !== null && val !== "" && val !== -1)
    .map(([key, val]) => {
      if (Array.isArray(val)) {
        // 陣列值以逗號連結
        return `${key}:${val.join(",")}`;
      }
      return `${key}:${val}`;
    })
    .join("/");
}