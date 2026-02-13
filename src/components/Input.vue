<script setup lang="ts">
import { ref, computed } from "vue";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { LucideIcon } from 'lucide-vue-next';

// 定義組件 props 的類型
interface Props {
  type?: string;                         // 輸入框型態（如 text、password）
  inputClass?: string;                  // 輸入框 class 樣式
  prefixIcon?: LucideIcon;              // 前綴 icon 元件
  suffixIcon?: LucideIcon;              // 後綴 icon 元件
}

// 設定 props 預設值
const props = withDefaults(defineProps<Props>(), {
  type: "text",
});

// 聲明父組件 v-model 綁定的值（支持 undefined，因為清空時會是 undefined）
const modelValue = defineModel<string | number | undefined>();

// 控制密碼顯示/隱藏的狀態
const isShowPassword = ref(false);

// 動態計算輸入框類型，若為密碼欄則依 isShowPassword 顯示密文或明文
const inputType = computed(() => {
  if (props.type === "password") {
    return isShowPassword.value ? "text" : "password";
  }
  return props.type;
});

// 計算是否有前綴 icon
const hasPrefixIcon = computed(() => !!props.prefixIcon);

// 計算是否有後綴 icon（包括密碼切換 icon）
const hasSuffixIcon = computed(() => !!props.suffixIcon);

// 計算輸入框的 padding 類別
const inputPaddingClass = computed(() => {
  let paddingClass = "";
  if (hasPrefixIcon.value) {
    paddingClass += " pl-10 ";
  }
  if (hasSuffixIcon.value) {
    paddingClass += " pr-10 ";
  }
  return paddingClass;
});
</script>

<template>
  <!-- 使用相對定位的容器包裹 Input，讓 icon 可以絕對定位在輸入框內 -->
  <div class="relative w-full">
    <!-- 前綴 icon -->
    <div v-if="hasPrefixIcon"
      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none z-10">
      <component :is="prefixIcon" class="w-4 h-4" />
    </div>

    <!-- Input 元件 -->
    <Input v-bind="$attrs" v-model="modelValue" :type="inputType" :class="cn(
      'w-full',
      inputPaddingClass,
      inputClass
    )" />

    <!-- 後綴 icon -->
    <div v-if="hasSuffixIcon"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none z-10">
      <component :is="suffixIcon" class="w-4 h-4" />
    </div>
  </div>
</template>