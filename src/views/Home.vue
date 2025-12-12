<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { User, Setting, Document, SwitchButton } from "@element-plus/icons-vue";

const dialog = reactive({
  user: false,
  settings: false,
  reports: false,
});

const router = useRouter();
const authStore = useAuthStore();

function openDialog(type: "user" | "settings" | "reports") {
  dialog[type] = true;
}

function logout() {
  authStore.clearToken();
  router.push("/login");
}
</script>

<template>
  <div
    class="min-h-screen bg-[url('/images/island_bg.jpg')] bg-cover bg-center bg-fixed"
  >
  <!-- 介紹卡片 -->
    <section class="max-w-5xl mx-auto py-6 px-3 sm:px-8">
      <el-card shadow="hover" class="bg-white/90 backdrop-blur">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
          <!-- Banner / Illustration -->
          <div class="flex-1 flex justify-center md:justify-start mb-6 md:mb-0">
            <img
              src="/images/events/MUSIC.jpg"
              alt="聚會島主題插畫"
              class="w-full drop-shadow-lg"
            />
          </div>
          <!-- 內容 -->
          <div class="flex-1 min-w-0">
            <h2 class="font-bold text-2xl sm:text-3xl text-[#37c6d0] mb-2 tracking-tight">
              歡迎來到聚會島 Gathering Island
            </h2>
            <p class="text-base sm:text-lg text-gray-700 mb-4">
              聚會島是一個專為活動、聚會、共學而設計的線上平台，讓你輕鬆創建、邀請、協作與管理不同形式的活動。
              <br class="hidden sm:block" />
              無論是團隊討論、社群聚會還是主題講座，都能在這裡找到最適合你的空間。
            </p>
            <div class="grid gap-3 mb-6 sm:grid-cols-2">
              <div class="flex items-start gap-3">
                <el-icon class="text-[#37c6d0] w-7 h-7"><User /></el-icon>
                <div>
                  <div class="font-semibold">多元活動管理</div>
                  <div class="text-gray-600 text-sm">簡單創建、瀏覽與管理各類聚會活動</div>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <el-icon class="text-[#ffd666] w-7 h-7"><Setting /></el-icon>
                <div>
                  <div class="font-semibold">自由設定</div>
                  <div class="text-gray-600 text-sm">豐富設定、權限管控，滿足不同會議需求</div>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <el-icon class="text-[#4bdb74] w-7 h-7"><Document /></el-icon>
                <div>
                  <div class="font-semibold">即時資源分享</div>
                  <div class="text-gray-600 text-sm">活動文檔、報表即時上傳與下載</div>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <el-icon class="text-[#fb4747] w-7 h-7"><SwitchButton /></el-icon>
                <div>
                  <div class="font-semibold">安全登入登出</div>
                  <div class="text-gray-600 text-sm">保障資料安全，確保每位用戶隱私</div>
                </div>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-4">
              <el-button
                type="primary"
                size="large"
                @click="$router.push('/event/list')"
                class="w-full sm:w-auto"
              >
                <el-icon class="mr-1"><Document /></el-icon>
                活動列表
              </el-button>
              <el-button
                type="info"
                size="large"
                @click="logout"
                class="w-full sm:w-auto"
              >
                <el-icon class="mr-1"><SwitchButton /></el-icon>
                登出
              </el-button>
            </div>
          </div>
        </div>
      </el-card>
      <div class="mt-8 text-gray-500 text-center text-xs">
        本服務目前處於測試階段，歡迎各位夥伴體驗與回饋建議，讓聚會島更好用！
      </div>
    </section>
  </div>
</template>
