<script setup lang="ts">
import IconError from '../icons/IconError.vue'
import { splitByNewline } from '@/utils/format-util'

const props = defineProps<{
  content?: string
}>()
</script>

<template>
  <div class="flex flex-col items-center gap-2 rounded-xl bg-white p-4 shadow-sm">
    <IconError class="w-8 flex-shrink-0 text-red-400" />
    <div class="text-center">
      <p
        v-for="(line, index) in splitByNewline(
          props.content ?? '오류가 발생했어요\n잠시 후 다시 시도해주세요',
        )"
        :key="index"
        class="text-body text-gray-500"
      >
        {{ line }}
      </p>
    </div>
  </div>
</template>
