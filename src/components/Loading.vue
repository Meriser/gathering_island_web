<script setup lang="ts">
  import { Spinner } from "@/components/ui/spinner";

// 定義 Loading Options 型別
interface LoadingProps {
  text?: string;
  className?: string;
}

// Props 預設值
const props = withDefaults(defineProps<LoadingProps>(), {
  text: "Loading...",
  className: "text-md text-gray-500",
});
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-2">
    <Spinner class="text-secondary size-10" />
    <p :class="props.className">{{ props.text }}</p>
  </div>
</template>

<style scoped></style>
