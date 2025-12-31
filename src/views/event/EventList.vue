<script setup lang="ts">
  import { ref } from "vue";
  import type { SearchGatheringsRequest, SearchGatheringsResponse} from "@/types/gatherings";
import { useGetSearchGatherings } from "@/api/gatherings/hook";
import { SortOrderEnum } from "@/enum/sortEnum";
import { GatheringsStatusEnum, GatheringsTypeEnum } from "@/enum/gatheringsEnum";
import Loading from "@/components/Loading.vue";
import Button from "@/components/Button.vue";

// 搜尋聚會 Request
const request = ref<SearchGatheringsRequest>({
  page: 1,
  limit: 10,
  sortBy: "createdAt",
  sortOrder: SortOrderEnum.DESC,
  // status: GatheringsStatusEnum.OPEN,
  // type: GatheringsTypeEnum.PARTY,
});

// 搜尋聚會 API 串接
const { data, isLoading, error } = useGetSearchGatherings(request.value);

</script>

<template>
  <div class="container mx-auto">
    <h2 class="text-2xl font-bold text-center mb-4">活動一覽</h2>
    <Loading v-if="isLoading" />
    <div v-else-if="data?.gatheringData && data?.gatheringData.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="item in data?.gatheringData" :key="item.id" class="border border-gray-300 rounded-md p-4">
        <h3 class="text-lg font-bold mb-2">{{ item.title }}</h3>
        <p class="text-sm text-gray-500 mb-4">{{ item.description }}</p>
        <p class="text-sm text-gray-500">地點： {{ item.location }}</p>
        <p class="text-sm text-gray-500">參加人數： {{ item.participantNumbers }}</p>
        <p class="text-sm text-gray-500">價格： {{ item.price }}</p>
        <!-- 操作按鈕 -->
        <div class="flex justify-end">
          <Button type="primary" size="small" class="rounded-full text-sm">查看</Button>
        </div>
      </div>
    </div>
  </div>
</template>