<script setup lang="ts">
import type { Notice } from '@imdaesomun/shared/types/notice';
import type { PropType } from 'vue';
import ErrorCard from '@/components/shared/ErrorCard.vue';
import NoticeBanner from './NoticeBanner.vue';
import NoticeCard from './NoticeCard.vue';
import NoticeCardSkeleton from './NoticeCardSkeleton.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  notices: {
    type: Array as PropType<Notice[]>,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  error: {
    type: null,
  },
});
</script>

<template>
  <div class="flex flex-col items-stretch gap-2">
    <NoticeBanner :title="title">
      <slot name="icon"></slot>
    </NoticeBanner>
    <ErrorCard
      v-if="error"
      :content="'공고를 불러오는 중 오류가 발생했어요\n잠시 후 다시 시도해주세요'"
    />
    <div v-else class="flex flex-col gap-2">
      <template v-if="isLoading">
        <NoticeCardSkeleton v-for="i in 10" :key="i" />
      </template>
      <template v-else>
        <NoticeCard
          v-for="notice in notices"
          :key="notice.id"
          :id="notice.id"
          :title="notice.title"
          :date="notice.regDate"
          :views="notice.hits"
          :department="notice.department"
        />
      </template>
    </div>
  </div>
</template>
