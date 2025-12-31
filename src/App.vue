<script setup lang="ts">
import { RouterView } from "vue-router";
import Layout from "@/views/Layout.vue";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";

// 定義開發環境變數，用於模板中判斷是否顯示 Devtools
const isDev = import.meta.env.DEV;
</script>

<template>
  <!-- 僅於登入頁時顯示登入畫面，不使用 Layout -->
  <template v-if="$route.name === 'Login'">
    <RouterView />
  </template>

  <!-- 後台管理介面，套用 Layout 通用頁面布局 -->
  <template v-else>
    <Layout />
  </template>

  <!-- Vue Query Devtools (僅在開發環境顯示) -->
  <VueQueryDevtools v-if="isDev" />
</template>

<style scoped></style>
