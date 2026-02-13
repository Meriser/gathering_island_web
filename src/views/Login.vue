<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import VeeInputLabel from "@/components/vee/VeeInputLabel.vue";
import useAlert from "@/hooks/useAlert";
import type { LoginResponse } from "@/types/auth";
import Button from "@/components/Button.vue";
import { useLogin } from "@/api/auth/hook";
import { Mail, Lock } from 'lucide-vue-next';

// 路由
const router = useRouter();
// 回首頁
const handleGoHome = () => {
  router.push("/");
};

// 認證 store
const authStore = useAuthStore();
// 使用 alert 提示
const { showAlert } = useAlert();

// 登入成功
const successLogin = (res: LoginResponse) => {
  // API 回應成功，並且帶有 token
  if (res.result === "success" && res.accessToken) {
    // 設置 token
    authStore.setToken(res.accessToken);
    // 顯示成功提示
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
    // 導向首頁
    handleGoHome();
  }
};

// 使用 vee-validate + zod
const { handleSubmit } = useForm<LoginFormData>({
  initialValues: { email: "", password: "" },
  validationSchema: toTypedSchema(loginSchema),
});

// 使用 TanStack Query Hook 登入
const { mutate, isPending } = useLogin(successLogin);

// 處理登入表單提交
const handleLogin = handleSubmit((values) => {
  mutate(values);
});
</script>

<template>
  <!-- 外層：背景圖片容器 -->
  <div class="min-h-screen bg-island_bg bg-cover bg-center relative">
    <!-- 漸層覆蓋層：半透明 -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <!-- 內容層 -->
    <div class="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div class="w-full max-w-[440px] bg-white rounded-xl px-4 py-8">
        <figure>
          <!-- 回首頁圖片 -->
          <img @click="handleGoHome" class="cursor-pointer w-[220px] mx-auto" src="/logo_title.svg" alt="Logo" />
        </figure>

        <el-form @submit.prevent="handleLogin" class="py-4 px-8 mt-4">
          <!-- 信箱 -->
          <VeeInputLabel name="email" label="信箱" placeholder="請輸入信箱" type="email" :prefix-icon="Mail" />
          <!-- 密碼 -->
          <VeeInputLabel name="password" label="密碼" placeholder="請輸入密碼" type="password" :show-password="true"
            :prefix-icon="Lock" />

          <!-- 操作按鈕區域 -->
          <div class="flex gap-4 mt-8">
            <!-- 探索按鈕 -->
            <Button class="w-full rounded-full text-xl" variant="outline">
              前往註冊
            </Button>
            <!-- 登入按鈕 -->
            <Button native-type="submit" :loading="isPending" class="w-full rounded-full text-xl">
              <span v-if="!isPending">登入</span>
              <span v-else>登入中</span>
            </Button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
