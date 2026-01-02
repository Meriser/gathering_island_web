<script setup lang="ts">
import { getFormatDay } from "@/utils/dayjsHelper";
import Button from "@/components/Button.vue";

const props = withDefaults(
  defineProps<{
    id: number;
    title: string;
    dateTime: string;
    imageUrl: string;
    buttonText?: string;
  }>(),
  {
    buttonText: "查看",
  }
);

// 事件
const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <el-card class="border border-gray-300 rounded-md group">
    <!-- 圖片 -->
    <figure class="overflow-hidden">
      <img
        :src="imageUrl"
        :alt="`${title} 圖片`"
        class="object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
      />
    </figure>
    <!-- 標題 -->
    <h3 class="text-lg font-bold mb-2">{{ title }}</h3>
    <!-- 時間 -->
    <p class="text-sm text-gray-500">{{ getFormatDay(dateTime) }}</p>
    <!-- 按鈕 -->
    <div class="flex justify-end">
      <Button
        type="primary"
        size="small"
        class="rounded-full text-sm"
        @click="emit('click')"
      >
        {{ buttonText }}
      </Button>
    </div>
  </el-card>
</template>
