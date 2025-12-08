<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { User, Lock } from "@element-plus/icons-vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import VeeInput from "@/components/vee/VeeInput.vue";
import useAlert from "@/hooks/useAlert";
import { login } from "@/api/auth/api";
import type { LoginRequest, LoginResponse } from "@/types/auth";
import Button from "@/components/Button.vue";

// 使用 alert 提示
const { showAlert } = useAlert();

const loading = ref(false);
const error = ref<string | null>(null);

const router = useRouter();
const authStore = useAuthStore();

// 使用 vee-validate + zod
const { handleSubmit } = useForm<LoginFormData>({
  initialValues: {
    email: "",
    password: "",
  },
  validationSchema: toTypedSchema(loginSchema),
});

// 回首頁
const handleGoHome = () => {
  router.push("/");
};

// 登入邏輯
const handleLogin = handleSubmit(async (values: LoginFormData) => {
  // login 請求參數
  const req: LoginRequest = { ...values };
  // 錯誤訊息
  error.value = null;
  // 載入中
  loading.value = true;

  try {
    // 登入 API 呼叫
    const res: LoginResponse = await login(req);
    // 登入成功
    if (res.result === "success" && res.accessToken) {
      // 設置 token
      authStore.setToken(res.accessToken);
      // 導向首頁
      router.push("/");
      // 顯示登入成功訊息
      showAlert({
        title: "登入成功",
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
        toast: true,
        position: "bottom-end",
        showCloseButton: true,
        showConfirmButton: false,
        showCancelButton: false,
      });
    }
  } catch (e: any) {
    error.value = e.message || "登入失敗，請稍後再試";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <!-- 外層：背景圖片容器 -->
  <div
    class="min-h-screen bg-[url('/images/island_bg.jpg')] bg-cover bg-center relative"
  >
    <!-- 漸層覆蓋層：半透明 -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <!-- 內容層 -->
    <div
      class="min-h-screen flex items-center justify-center p-4 relative z-10"
    >
      <div class="w-full max-w-[440px]">
        <el-card shadow="always" class="rounded-xl">
          <template #header>
            <figure>
              <!-- 回首頁圖片 -->
              <img
                @click="handleGoHome"
                class="cursor-pointer w-[220px] mx-auto"
                src="/logo_title.svg"
                alt="Logo"
              />
            </figure>
          </template>

          <el-form @submit.prevent="handleLogin" class="py-4 px-8">
            <VeeInput
              name="email"
              label="信箱"
              placeholder="請輸入信箱"
              type="email"
              size="large"
              inputClass="w-full"
              :prefix-icon="User"
              required
            />

            <VeeInput
              name="password"
              label="密碼"
              placeholder="請輸入密碼"
              type="password"
              size="large"
              inputClass="w-full"
              :prefix-icon="Lock"
              required
            />

            <el-alert
              v-if="error"
              :title="error"
              type="error"
              :closable="true"
              show-icon
            />

            <!-- 操作按鈕區域 -->
            <div class="flex gap-4 mt-8">
              <!-- 探索按鈕 -->
              <Button
                type="primary"
                size="large"
                class="w-full rounded-full text-xl"
                plain
              >
                探索
              </Button>
              <!-- 登入按鈕 -->
              <Button
                type="primary"
                size="large"
                native-type="submit"
                :loading="loading"
                class="w-full rounded-full text-xl"
              >
                {{ loading ? "登入中..." : "登入" }}
              </Button>
            </div>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>
