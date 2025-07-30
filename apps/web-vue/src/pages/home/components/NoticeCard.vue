<script setup lang="ts">
import IconDate from '@/components/icons/IconDate.vue'
import IconView from '@/components/icons/IconView.vue'
import IconDepartment from '@/components/icons/IconDepartment.vue'
import { formatDate, formatNumberWithComma } from '@imdaesomun/shared/utils/format-util'
import { isNewNotice } from '@imdaesomun/shared/helpers/notice-helper'
import { RouterLink } from 'vue-router'
import { AppRoute } from '@imdaesomun/shared/constants/app-route'

const props = defineProps<{
  id: string
  title: string
  date: number // Timestamp in milliseconds
  views: number // Number of views
  department: string
}>()
</script>

<template>
  <RouterLink
    :to="{ path: AppRoute.NOTICE, query: { id: props.id } }"
    class="flex cursor-pointer flex-col items-start gap-2 rounded-xl bg-white p-4 shadow-sm transition-colors hover:bg-teal-500-10"
  >
    <div v-if="isNewNotice(props.date)" class="rounded-xl bg-teal-500-10 px-1.5 py-0.5">
      <span class="text-label-bold text-teal-500">신규</span>
    </div>
    <span class="text-body-bold break-keep md:text-subtitle">{{ props.title }}</span>
    <div class="flex flex-wrap gap-x-3">
      <div class="flex items-center gap-1">
        <IconDate class="w-4 text-gray-500" />
        <span class="text-label text-gray-500 md:text-body">{{ formatDate(props.date) }}</span>
      </div>
      <div class="flex items-center gap-1">
        <IconView class="w-4 text-gray-500" />
        <span class="text-label text-gray-500 md:text-body">{{
          formatNumberWithComma(props.views)
        }}</span>
      </div>
      <div class="flex items-center gap-1">
        <IconDepartment class="w-4 text-gray-500" />
        <span class="text-label text-gray-500 md:text-body">{{ props.department }}</span>
      </div>
    </div>
  </RouterLink>
</template>
