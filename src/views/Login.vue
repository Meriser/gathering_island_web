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

// 使用 alert 提示
const { showAlert } = useAlert();

const loading = ref(false);
const error = ref<string | null>(null);

const router = useRouter();
const authStore = useAuthStore();

// 使用 vee-validate + zod
const { handleSubmit } = useForm<LoginFormData>({
  initialValues: {
    account: "",
    password: "",
  },
  validationSchema: toTypedSchema(loginSchema),
});

// 登入邏輯
const login = handleSubmit(async (values) => {
  error.value = null;
  loading.value = true;

  try {
    // 模擬 API 呼叫延遲
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (values.account === "admin" && values.password === "admin") {
      const mockToken = `token_${Date.now()}_${Math.random()
        .toString(36)
        .substring(7)}`;
      authStore.setToken(mockToken);
      // 登入成功後，導向首頁
      router.push("/");
      // 顯示登入成功訊息
      showAlert({
        title: "登入成功!",
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
        toast: true,
        position: "bottom-end",
        showCloseButton: true,
        showConfirmButton: false,
        showCancelButton: false,
      });
    } else {
      error.value = "帳號或密碼錯誤";
    }
  } catch (e: any) {
    error.value = e.message || "登入失敗，請稍後再試";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-slate-100 bg-[url('/public/images/island_bg.jpg')] bg-cover bg-center p-4"
  >
    <div class="w-full max-w-[440px]">
      <el-card shadow="always" class="rounded-xl">
        <template #header>
          <h2 class="text-center py-2 text-2xl md:text-3xl font-bold text-primary">
            聚會島
          </h2>
        </template>

        <el-form @submit.prevent="login">
          <VeeInput
            name="account"
            label="帳號"
            placeholder="請輸入帳號"
            type="text"
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
            :closable="false"
            show-icon
            class="mb-4"
          />

          <el-button
            type="primary"
            size="large"
            native-type="submit"
            :loading="loading"
            class="w-full font-semibold"
          >
            {{ loading ? "登入中..." : "登入" }}
          </el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
