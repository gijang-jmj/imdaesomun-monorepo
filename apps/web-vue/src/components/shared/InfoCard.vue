<script setup lang="ts">
import IconInfo from '@/components/icons/IconInfo.vue';

const props = defineProps<{
  content: string;
}>();
</script>

<template>
  <div class="flex items-center gap-2 rounded-xl bg-white p-4 shadow-sm">
    <IconInfo class="w-5 flex-shrink-0 text-teal-500" />
    <span class="text-label md:text-body text-gray-500">
      {{ props.content }}
    </span>
  </div>
</template>
