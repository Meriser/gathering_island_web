export class GatheringsPath {
  // 聚會 API 基礎路徑
  public static readonly GATHERINGS = '/gatherings';
  // 根據 ID 取得聚會
  public static readonly GATHERINGS_ID = (id: number) => `${this.GATHERINGS}/${id}`;
  // 恢復軟刪除的聚會
  public static readonly GATHERINGS_ID_RESTORE = (id: number) => `${this.GATHERINGS}/${id}/restore`;
  // 設為已結束
  public static readonly GATHERINGS_ID_CLOSE = (id: number) => `${this.GATHERINGS}/${id}/close`;
}
