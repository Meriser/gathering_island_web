<script setup lang="ts">
import { ref, computed } from "vue";
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
import { getFormatTimeAndWeek } from "@/utils/dayjsHelper";
import FadeInDiv from "@/components/motion/FadeInDiv.vue";
import Pagination from "@/components/Pagination.vue";

// 搜尋聚會 Request
const request = ref<SearchGatheringsRequest>({
  page: 1,
  limit: 12,
  sortBy: "startTime",
  sortOrder: SortOrderEnum.ASC,
  // status: GatheringsStatusEnum.OPEN,
  // type: GatheringsTypeEnum.PARTY,
});

// 搜尋聚會 API 串接
const { data, isLoading, refetch } = useGetSearchGatherings(request.value);

// 判斷有資料
const hasData = computed(() => {
  return data.value?.gatheringData && data.value?.gatheringData.length > 0;
});

// 處理分頁
const handlePageChange = (page: number) => {
  request.value.page = page;
  refetch();
};
</script>

<template>
  <div class="bg-coffee_bg min-h-screen px-4">
    <div class="container mx-auto py-6">
      <h2 class="text-3xl font-bold text-center text-secondary mb-6">
        活動一覽
      </h2>
      <!-- 載入中 -->
      <Loading v-if="isLoading" />
      <!-- 顯示資料區域 -->
      <div
        v-else-if="hasData"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <FadeInDiv
          v-for="(item, index) in data?.gatheringData"
          :key="`${item.id}_${index}`"
          :delay="index * 0.05"
        >
          <Card
            :id="item.id"
            :title="item.title"
            :date-time="getFormatTimeAndWeek(item.startTime)"
            :image-url="GatheringsTypeImageEnum[item.type]"
          />
        </FadeInDiv>
      </div>
      <!-- 分頁 -->
      <div class="mt-8">
        <Pagination
          v-if="hasData"
          :total="data?.total || 0"
          :page-size="request.limit"
          :page="request.page"
          @update:page="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>
