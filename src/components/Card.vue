<script setup lang="ts">
import Button from "@/components/Button.vue";
import { Clock } from "lucide-vue-next";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

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
  <Card class="card-border group bg-white p-6">
    <!-- 圖片 -->
    <figure class="overflow-hidden rounded-md">
      <img :src="imageUrl" :alt="`${title} 圖片`"
        class="object-cover transition-transform duration-300 group-hover:scale-110" />
    </figure>
    <!-- 標題 -->
    <CardTitle class="mt-2">{{ title }}</CardTitle>
    <!-- 內容區域 -->
    <CardContent class="mt-4">
      <!-- 時間 -->
      <p class="text-sm text-secondary mt-2 flex items-center gap-2">
        <Clock />
        {{ dateTime }}
      </p>
      <!-- 按鈕 -->
      <div class="flex justify-end">
        <Button variant="secondary" class="rounded-full text-base" @click="emit('click')">
          {{ buttonText }}
        </Button>
      </div>
    </CardContent>
  </Card>
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
