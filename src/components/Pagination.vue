<script setup lang="ts">
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
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="props.pageSize"
      :total="total"
      layout="prev, pager, next"
      background
    />
  </div>
</template>

<style scoped></style>
