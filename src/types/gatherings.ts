import type { ApiResponse } from "./api";
import type {
  GatheringsStatusEnum,
  GatheringsTypeEnum,
} from "@/enum/gatheringsEnum";
import type { SortOrderEnum } from "@/enum/sortEnum";

// 聚會類型
export type GatheringsType = {
  userId: number;
  title: string;
  description: string;
  location: string;
  participantNumbers: number;
  price: number;
  status: GatheringsStatusEnum;
  type: GatheringsTypeEnum;
  startTime: string;
  dueDate: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  id: number;
  tags?: string[];
};

// 搜尋聚會 Request
export type SearchGatheringsRequest = {
  page: number; // 頁數
  limit: number; // 每頁筆數
  sortBy?: string; // 排序欄位
  sortOrder?: SortOrderEnum; // 排序方式
  status?: GatheringsStatusEnum; // 聚會狀態
  type?: GatheringsTypeEnum; // 聚會類型
  isArchived?: boolean; // 是否已刪除
  tags?: string[]; // 標籤
};
// 搜尋聚會 Response
export type SearchGatheringsResponse = ApiResponse & {
  gatheringData: GatheringsType[]; // 聚會資料
  page: number; // 頁數
  limit: number; // 每頁筆數
  total: number; // 總筆數
};

// 新增聚會 Request
export type CreateGatheringsRequest = Omit<
  GatheringsType,
  "id" | "userId" | "isArchived" | "createdAt" | "updatedAt"
>;

// 更新聚會 Request
export type UpdateGatheringsRequest = CreateGatheringsRequest;

// 取得聚會 Response
export type GetGatheringsResponse = ApiResponse & {
  gatheringData: GatheringsType;
};