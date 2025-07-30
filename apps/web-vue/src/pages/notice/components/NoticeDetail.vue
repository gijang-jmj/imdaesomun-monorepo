<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Notice } from '@imdaesomun/shared/types/notice'
import IconDate from '@/components/icons/IconDate.vue'
import IconDepartment from '@/components/icons/IconDepartment.vue'
import IconView from '@/components/icons/IconView.vue'
import { getNoticeCorporationTypeKor } from '@imdaesomun/shared/helpers/notice-helper'
import { formatDate, formatNumberWithComma, splitByNewline } from '@imdaesomun/shared/utils/format-util'
import IconLink from '@/components/icons/IconLink.vue'
import IconBookmark from '@/components/icons/IconBookmark.vue'
import { postToUrl } from '@imdaesomun/shared/utils/link-util'
import IconBookmarkCheck from '@/components/icons/IconBookmarkCheck.vue'

const props = defineProps<{
  notice: Notice
  isSaved: boolean
}>()

const emit = defineEmits<{
  (e: 'save-clicked', id: string, isSaved: boolean): void
}>()

const showAllFiles = ref(false)

const visibleFiles = computed(() => {
  if (showAllFiles.value || props.notice.files.length <= 2) {
    return props.notice.files
  }
  return props.notice.files.slice(0, 2)
})

const hiddenFilesCount = computed(() => {
  return props.notice.files.length - visibleFiles.value.length
})

const showMoreFilesText = computed(() => {
  return showAllFiles.value ? '첨부파일 접기' : `첨부파일 더보기(${hiddenFilesCount.value})`
})

const openPostFileLink = (fileId: string, fileLink: string) => {
  postToUrl(fileLink, {
    attachNo: fileId,
  })
}

const saveButtonClass = computed(() => {
  return props.isSaved
    ? 'bg-teal-500-10 text-teal-500 hover:bg-teal-200'
    : 'bg-gray-500-10 text-gray-500 hover:bg-gray-300'
})

const saveButtonText = computed(() => {
  return props.isSaved ? '저장됨' : '저장하기'
})
</script>

<template>
  <div class="mx-4 mt-2 mb-24 rounded-xl bg-white p-4 shadow-sm transition-colors md:p-6">
    <div class="mb-4 flex flex-col gap-2 border-b border-gray-100 pb-4">
      <div class="flex flex-col">
        <span class="text-body-bold text-teal-500">{{
          getNoticeCorporationTypeKor(notice.corporation)
        }}</span>
        <span class="text-subtitle-bold">{{ notice.title }}</span>
      </div>
      <div class="flex flex-wrap gap-x-3">
        <div class="flex items-center gap-1">
          <IconDate class="w-4 text-gray-500" />
          <span class="text-body text-gray-500">{{ formatDate(notice.regDate) }}</span>
        </div>
        <div class="flex items-center gap-1">
          <IconView class="w-4 text-gray-500" />
          <span class="text-body text-gray-500">{{ formatNumberWithComma(notice.hits) }}</span>
        </div>
        <div class="flex items-center gap-1">
          <IconDepartment class="w-4 text-gray-500" />
          <span class="text-body text-gray-500">{{ notice.department }}</span>
        </div>
      </div>
    </div>
    <div class="mb-4 flex flex-col items-start gap-2 border-b border-gray-100 pb-4">
      <p class="text-label-bold text-gray-500">
        첨부파일 <span class="text-caption">* 미리보기만 제공해요</span>
      </p>
      <span v-if="notice.files.length === 0" class="text-body text-gray-500">첨부파일 없음</span>
      <div v-for="(file, index) in visibleFiles" :key="index">
        <button
          v-if="file.fileId"
          @click="openPostFileLink(file.fileId, file.fileLink)"
          class="cursor-pointer text-start text-body text-teal-500 underline"
        >
          {{ file.fileName }}
        </button>
        <a
          v-else
          :href="file.fileLink"
          target="_blank"
          rel="noopener noreferrer"
          class="cursor-pointer text-start text-body text-teal-500 underline"
        >
          {{ file.fileName }}
        </a>
      </div>
      <button
        v-if="props.notice.files.length > 2"
        @click="showAllFiles = !showAllFiles"
        class="cursor-pointer text-label text-teal-500"
      >
        {{ showMoreFilesText }}
      </button>
    </div>
    <div class="mb-8 flex flex-col gap-4 text-body break-all">
      <div class="flex flex-col gap-4" v-for="(content, index) in notice.contents" :key="index">
        <p v-for="(line, lineIndex) in splitByNewline(content)" :key="lineIndex">{{ line }}</p>
      </div>
    </div>
    <div class="flex gap-2">
      <a
        :href="notice.link"
        target="_blank"
        rel="noopener noreferrer"
        class="flex h-12 flex-9/12 cursor-pointer items-center justify-center gap-1 rounded-xl bg-teal-500 px-4 py-2 text-white transition-colors hover:bg-teal-600 md:flex-1"
      >
        <span class="text-body">공고 열기</span>
        <IconLink class="w-4" />
      </a>
      <button
        class="flex h-12 flex-3/12 cursor-pointer items-center justify-center gap-1 rounded-xl px-4 py-2 transition-colors md:flex-1"
        :class="saveButtonClass"
        @click="emit('save-clicked', notice.id, props.isSaved)"
      >
        <span class="hidden text-body md:inline-block">{{ saveButtonText }}</span>
        <IconBookmarkCheck v-if="props.isSaved" class="w-4" />
        <IconBookmark v-else class="w-4" />
      </button>
    </div>
  </div>
</template>
