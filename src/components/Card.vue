<script setup lang="ts">
import Button from "@/components/Button.vue";
import { Calendar } from "@element-plus/icons-vue";

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
  <el-card class="card-border group bg-white">
    <!-- 圖片 -->
    <figure class="overflow-hidden rounded-md">
      <img
        :src="imageUrl"
        :alt="`${title} 圖片`"
        class="object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </figure>
    <!-- 內容區域 -->
    <div class="mt-4">
      <!-- 標題 -->
      <h3 class="text-2xl font-bold text-secondary-dark">{{ title }}</h3>
      <!-- 時間 -->
      <p class="text-sm text-secondary mt-2 flex items-center gap-2">
        <Calendar class="w-[20px] text-primary" />
        {{ dateTime }}
      </p>
      <!-- 按鈕 -->
      <div class="flex justify-end">
        <Button
          class="rounded-full text-base bg-info text-white"
          @click="emit('click')"
        >
          {{ buttonText }}
        </Button>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.card-border {
  border-radius: 16px;
  /* 透明化 border，改用 background-image 作為漸層邊框*/
  border: 4px solid transparent;
  background-image: linear-gradient(white, white),
    linear-gradient(135deg, #ffe7c7, #c89850);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
</style>
