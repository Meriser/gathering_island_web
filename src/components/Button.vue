<script setup lang="ts">
import { computed } from "vue";
import Button from "@/components/ui/button/Button.vue";
import Spinner from "@/components/ui/spinner/Spinner.vue";

// 定義 Props
interface Props {
  loading?: boolean;
  loadingIndicator?: any;
}

// Props 預設值
const props = withDefaults(defineProps<Props>(), {
  loading: false,
  loadingIndicator: Spinner,
});

// 計算 disabled 狀態
const isDisabled = computed(() => props.loading);

// 計算 LoadingIndicator
const LoadingIndicator = computed(() => props.loadingIndicator);
</script>

<template>
  <Button :disabled="isDisabled" v-bind="$attrs">
    <template v-if="loading">
      <span class="flex items-center gap-2">
        <component :is="LoadingIndicator" />
        <slot name="loading">載入中...</slot>
      </span>
    </template>
    <slot v-else />
  </Button>
</template>