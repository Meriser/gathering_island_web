<script setup lang="ts">
import { ref } from "vue";
import type {
  SearchGatheringsRequest,
  SearchGatheringsResponse,
} from "@/types/gatherings";
import { useGetSearchGatherings } from "@/api/gatherings/hook";
import { SortOrderEnum } from "@/enum/sortEnum";
import {
  GatheringsStatusEnum,
  GatheringsTypeEnum,
  GatheringsTypeImageEnum,
} from "@/enum/gatheringsEnum";
import Loading from "@/components/Loading.vue";
import Card from "@/components/Card.vue";
import { getFormatTime } from "@/utils/dayjsHelper";

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
const { data, isLoading } = useGetSearchGatherings(request.value);
</script>

<template>
  <div class="container mx-auto">
    <h2 class="text-3xl font-bold text-center text-primary my-6">
      活動一覽
    </h2>
    <!-- 載入中 -->
    <Loading v-if="isLoading" />
    <!-- 顯示資料區域 -->
    <div
      v-else-if="data?.gatheringData && data?.gatheringData.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <Card
        v-for="item in data?.gatheringData"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :date-time="getFormatTime(item.startTime, 'YYYY/MM/DD HH:mm')"
        :image-url="GatheringsTypeImageEnum[item.type]"
      />
    </div>
  </div>
</template>
