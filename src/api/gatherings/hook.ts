import { useQuery, useMutation } from "@tanstack/vue-query";
import { createQueryKey } from "@/utils/createQueryKey";
import { GatheringsPath } from "./path";
import {
  getSearchGatherings,
  postCreateGatherings,
  getGatheringsById,
  patchUpdateGatherings,
  deleteGatherings,
  postRestoreGatherings,
  postCloseGatherings,
} from "./api";
import type {
  SearchGatheringsRequest,
  CreateGatheringsRequest,
  GetGatheringsResponse,
  UpdateGatheringsRequest,
} from "@/types/gatherings";

// 搜尋聚會
export const useGetSearchGatherings = (params: SearchGatheringsRequest) => {
  const paramsKey = createQueryKey(params);
  return useQuery({
    queryKey: [GatheringsPath.GATHERINGS, paramsKey],
    queryFn: () => getSearchGatherings(params),
  });
};

// 新增聚會
export const usePostCreateGatherings = (
  successCB: (res: GetGatheringsResponse) => void
) => {
  return useMutation({
    mutationFn: (req: CreateGatheringsRequest) => postCreateGatherings(req),
    onSuccess: successCB,
  });
};

// 取得單筆聚會
export const useGetGatheringsById = (id: number) => {
  return useQuery({
    queryKey: [GatheringsPath.GATHERINGS_ID(id)],
    queryFn: () => getGatheringsById(id),
    enabled: !!id, // 如果 id 為空，則不執行查詢
    refetchOnWindowFocus: false, // 在視窗重新聚焦時不重新查詢
  });
};

// 更新聚會
export const usePatchUpdateGatherings = (
  id: number,
  successCB: (res: GetGatheringsResponse) => void
) => {
  return useMutation({
    mutationFn: (req: UpdateGatheringsRequest) =>
      patchUpdateGatherings(id, req),
    onSuccess: (res) => res && successCB(res),
  });
};

// 刪除聚會 (軟刪除，不會實際刪除資料)
export const useDeleteGatherings = (
  id: number,
  successCB: (res: GetGatheringsResponse) => void
) => {
  return useMutation({
    mutationFn: () => deleteGatherings(id),
    onSuccess: (res) => res && successCB(res),
  });
};

// 恢復刪除的聚會
export const usePostRestoreGatherings = (
  id: number,
  successCB: (res: GetGatheringsResponse) => void
) => {
  return useMutation({
    mutationFn: () => postRestoreGatherings(id),
    onSuccess: (res) => res && successCB(res),
  });
};

// 聚會設為已結束
export const usePostCloseGatherings = (
  id: number,
  successCB: (res: GetGatheringsResponse) => void
) => {
  return useMutation({
    mutationFn: () => postCloseGatherings(id),
    onSuccess: (res) => res && successCB(res),
  });
};
