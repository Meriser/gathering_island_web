import type { CreateGatheringsRequest, GetGatheringsResponse, SearchGatheringsRequest, SearchGatheringsResponse, UpdateGatheringsRequest } from "@/types/gatherings";
import type { AxiosResponse } from "axios";
import { AXIOS } from "@/stores/setupAxios";
import { GatheringsPath } from "./path";
import ApiHandleError from "@/utils/apiHandleError";

// 搜尋聚會 GET /gatherings
export async function getSearchGatherings (params: SearchGatheringsRequest) {
  try {
    const res: AxiosResponse<SearchGatheringsResponse> = await AXIOS.get(
      GatheringsPath.GATHERINGS,
      {
        params,
      }
    );
    return res.data;
  } catch (error) {
    ApiHandleError(error, getSearchGatherings.name);
  }
}

// 新增聚會 POST /gatherings
export async function postCreateGatherings (req: CreateGatheringsRequest) {
  try {
    const res: AxiosResponse<GetGatheringsResponse> = await AXIOS.post(
      GatheringsPath.GATHERINGS,
      req
    );
    return res.data;
  } catch (error) {
    ApiHandleError(error, postCreateGatherings.name);
  }
}

// 取得單筆聚會 GET /gatherings/:id
export async function getGatheringsById (id: number) {
  try {
    const res: AxiosResponse<GetGatheringsResponse> = await AXIOS.get(
      GatheringsPath.GATHERINGS_ID(id)
    );
    return res.data;
  } catch (error) {
    ApiHandleError(error, getGatheringsById.name);
  }
}

// 更新聚會 PATCH /gatherings/:id
export async function patchUpdateGatherings (id: number, req: UpdateGatheringsRequest) {
  try {
    const res: AxiosResponse<GetGatheringsResponse> = await AXIOS.patch(
      GatheringsPath.GATHERINGS_ID(id),
      req
    );
    return res.data;
  } catch (error) {
    ApiHandleError(error, patchUpdateGatherings.name);
  }
}

// 刪除聚會 (軟刪除，不會實際刪除資料) DELETE /gatherings/:id
export async function deleteGatherings (id: number) {
  try {
    const res: AxiosResponse<GetGatheringsResponse> = await AXIOS.delete(
      GatheringsPath.GATHERINGS_ID(id)
    );
    return res.data;
  } catch (error) {
    ApiHandleError(error, deleteGatherings.name);
  }
}

// 恢復刪除的聚會 POST /gatherings/:id/restore
export async function postRestoreGatherings (id: number) {
  try {
    const res: AxiosResponse<GetGatheringsResponse> = await AXIOS.post(
      GatheringsPath.GATHERINGS_ID_RESTORE(id)
    );
    return res.data;
  } catch (error) {
    ApiHandleError(error, postRestoreGatherings.name);
  }
}

// 聚會設為已結束 POST /gatherings/:id/close
export async function postCloseGatherings (id: number) {
  try {
    const res: AxiosResponse<GetGatheringsResponse> = await AXIOS.post(
      GatheringsPath.GATHERINGS_ID_CLOSE(id)
    );
    return res.data;
  } catch (error) {
    ApiHandleError(error, postCloseGatherings.name);
  }
}