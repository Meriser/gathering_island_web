<script setup lang="ts">
import type { PaginationListItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from '@/components/ui/button'
import { reactiveOmit } from "@vueuse/core"
import { PaginationListItem } from "reka-ui"
import { cn } from "@/lib/utils"
import { buttonVariants } from '@/components/ui/button'

const props = withDefaults(defineProps<PaginationListItemProps & {
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
  isActive?: boolean;
}>(), {
  size: "icon",
})

const delegatedProps = reactiveOmit(props, "class", "size", "isActive")
</script>

<template>
  <PaginationListItem data-slot="pagination-item" v-bind="delegatedProps" :class="cn(
    buttonVariants({
      variant: 'outline',
      size,
    }),
    // 當狀態 active 時，文字為白色，背景顏色為 secondary
    isActive && 'text-white bg-secondary',
    props.class,
  )">
    <slot />
  </PaginationListItem>
</template>
