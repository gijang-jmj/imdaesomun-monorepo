<script setup lang="ts">
import IconDate from '@/components/icons/IconDate.vue'
import IconDepartment from '@/components/icons/IconDepartment.vue'
import { formatDate } from '@/utils/format-util'
import { RouterLink } from 'vue-router'
import { AppRoute } from '@/constants/app-route'
import { getNoticeCorporationBgColor, getNoticeCorporationTypeKor } from '@/helpers/notice-helper'
import { computed } from 'vue'

const props = defineProps<{
  id: string
  title: string
  date: number // Timestamp in milliseconds
  department: string
  corporation: string
}>()

const corporationBgColor = computed(() => {
  return getNoticeCorporationBgColor(props.corporation)
})
</script>

<template>
  <RouterLink
    :to="{ path: AppRoute.NOTICE, query: { id: props.id } }"
    class="flex cursor-pointer flex-col items-start justify-between gap-2 rounded-xl bg-white p-4 shadow-sm transition-colors hover:bg-teal-500-10"
  >
    <div class="flex flex-col items-start gap-1">
      <div
        class="flex items-center justify-center rounded-xl px-2 py-1"
        :class="corporationBgColor"
      >
        <span class="text-caption text-white md:text-caption-bold">{{
          getNoticeCorporationTypeKor(props.corporation)
        }}</span>
      </div>
      <span class="text-body-bold md:text-subtitle">{{ props.title }}</span>
    </div>
    <div class="flex flex-wrap gap-x-3">
      <div class="flex items-center gap-1">
        <IconDate class="w-4 text-gray-500" />
        <span class="text-label text-gray-500 md:text-body">{{ formatDate(props.date) }}</span>
      </div>
      <div class="flex items-center gap-1">
        <IconDepartment class="w-4 text-gray-500" />
        <span class="text-label text-gray-500 md:text-body">{{ props.department }}</span>
      </div>
    </div>
  </RouterLink>
</template>
