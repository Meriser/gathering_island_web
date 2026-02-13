<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import Input from "@/components/Input.vue";

interface Props {
  id: string;
  label: string;
  labelClass?: string;
  divClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  labelClass: "",
  divClass: "",
});

</script>

<template>
  <div :class="cn('flex flex-col gap-2', props.divClass)">
    <!-- Label元件 -->
    <Label :for="props.id" :class="cn('text-lg font-medium text-gray-600', props.labelClass)">
      {{ props.label }}
    </Label>
    <!-- Input 元件 -->
    <Input :id="props.id" v-bind="$attrs" />
  </div>
</template>
