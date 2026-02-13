<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { Eye, EyeOff } from 'lucide-vue-next';
  
  const props = defineProps<{
    modelValue: string | number | undefined;
    type?: string;
  }>();
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number | undefined): void;
    (e: 'update:type', value: string): void;
  }>();
  
  // 是否顯示密碼
  const isVisible = ref(false);
  // 目前類型
  const currentType = computed(() => 
    props.type === 'password' && isVisible.value ? 'text' : 'password'
  );
  
  // 切換密碼顯示、隱藏
  function toggle() {
    isVisible.value = !isVisible.value;
    emit('update:type', currentType.value);
  }
  </script>

  <template>
    <button type="button" @click="toggle" v-bind="$attrs">
      <EyeOff v-if="currentType === 'password'" />
      <Eye v-else />
    </button>
  </template>