<script setup lang="ts">
import { useField } from "vee-validate";
import { computed } from "vue";
import InputLabel from "@/components/InputLabel.vue";

// 定義 Props
interface Props {
  name: string;
  label: string;
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
});

// 使用 vee-validate 的 useField
const { value, errorMessage, handleBlur, handleChange, meta } = useField<
  string | number | undefined
>(() => props.name, undefined, {
  validateOnValueUpdate: false,
});

// 處理輸入變更
const handleInput = (newValue: string | number | undefined) => {
  const safeValue = newValue ?? "";
  value.value = safeValue;
  handleChange(safeValue);
};

// 錯誤狀態
const showError = computed(() => !!errorMessage.value && meta.touched);

</script>

<template>
  <div class="flex flex-col gap-2">
    <InputLabel :id="props.name" :label="props.label" :type="props.type" v-bind="$attrs" @blur="handleBlur" :class="{
      'is-error': showError,
    }" 
    @update:model-value="handleInput"
    />

    <Transition name="fade">
      <p v-if="showError" class="text-red-500 text-sm">
        * {{ errorMessage }}
      </p>
    </Transition>
  </div>
</template>

<style scoped></style>