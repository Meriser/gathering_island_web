<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { HomeFilled, User } from "@element-plus/icons-vue";
import dayjs from "dayjs";

const router = useRouter();

// Menu 配置，導航至對應頁面
const menuItems = ref([
  {
    title: "首頁",
    icon: HomeFilled,
    to: "/",
  },
  {
    title: "用戶管理",
    icon: User,
    to: "/users",
  },
]);

// 取得當前年份
const currentYear = ref<number>(dayjs().year());

// 處理菜單選擇
const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- 頂部 Header -->
    <header
      class="min-h-[64px] bg-primary text-white flex items-center justify-between px-4 shadow-md"
    >
      <!-- Header: 左側 Logo / 右側選單導航 -->
      <div class="flex items-center w-full justify-between">
        <!-- 左側 Logo -->
        <div
          class="flex items-center cursor-pointer hover-opacity"
          @click="navigateTo('/')"
        >
          <img src="/public/logo.svg" alt="Logo" class="w-[48px]" />
          <h1 class="flex gap-3 leading-tight text-xl">
            <span class="font-extrabold text-[#37c6d0]">GATHER</span>
            <span class="font-extrabold text-[#05223d]">ISLAND</span>
          </h1>
        </div>
        <!-- 右側選單導航 -->
        <nav class="flex items-center gap-6">
          <button
            v-for="item in menuItems"
            :key="item.to"
            @click="navigateTo(item.to)"
            class="bg-transparent text-white hover:text-yellow-300 px-3 py-2 rounded transition-colors flex items-center gap-1"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span>{{ item.title }}</span>
          </button>
        </nav>
      </div>
    </header>

    <!-- 主要內容區域，flex-1 讓內容區域自動撐滿高度 -->
    <el-main class="bg-gray-100 overflow-auto flex-1">
      <RouterView />
    </el-main>

    <!-- 底部 Footer -->
    <footer class="bg-secondary flex justify-center items-center">
      <strong class="text-white py-4">
        Copyright © {{ currentYear }} Gathering Island All Rights Reserved
      </strong>
    </footer>
  </div>
</template>

<style scoped></style>
