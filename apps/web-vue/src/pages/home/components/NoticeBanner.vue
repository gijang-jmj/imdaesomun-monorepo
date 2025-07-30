<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <slot></slot>
    <span class="text-subtitle-bold md:text-title-bold">{{ props.title }}</span>
  </div>
</template>
