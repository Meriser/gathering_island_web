<script setup lang="ts">
  import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
  } from "@/components/ui/pagination";
  
  // Props
  interface Props {
    total: number; // 總筆數
    pageSize?: number; // 每頁顯示的筆數
  }
  const props = withDefaults(defineProps<Props>(), {
    pageSize: 10,
  });
  
  // defineModel 自動處理雙向綁定，無需額外定義 page prop
  const currentPage = defineModel<number>("page", {
    default: 1,
    required: true,
  });
  </script>
  
  <template>
    <div class="w-full flex justify-center">
      <Pagination
        v-model:page="currentPage"
        :items-per-page="props.pageSize"
        :total="total"
        class="w-fit border border-secondary rounded-full px-6 py-2 bg-white"
      >
        <template #default="{ page, pageCount }">
          <PaginationContent class="text-secondary">
            <PaginationPrevious />
            <template v-for="pageNum in pageCount" :key="pageNum">
              <PaginationItem :value="pageNum"
                v-if="pageNum === 1 || pageNum === pageCount || (pageNum >= page - 1 && pageNum <= page + 1)"
                :page="pageNum"
                :is-active="pageNum === page"
              />
              <PaginationEllipsis
                v-else-if="
                  pageNum === page - 2 || pageNum === page + 2
                "
              />
            </template>
            <PaginationNext />
          </PaginationContent>
        </template>
      </Pagination>
    </div>
  </template>
  
  <style scoped></style>