<script setup lang="ts">
import ErrorCard from '@/components/shared/ErrorCard.vue';
import InfoCard from '@/components/shared/InfoCard.vue';
import { useSavedStore } from '@/stores/saved-store';
import { storeToRefs } from 'pinia';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import SavedCard from './components/SavedCard.vue';
import SavedFilter from './components/SavedFilter.vue';
import SavedCardSkeleton from './components/SavedCardSkeleton.vue';
import { useUserStore } from '@/stores/user-store';
import IconHomeFill from '@/components/icons/IconHomeFill.vue';
import GoogleButton from '@/components/shared/GoogleButton.vue';

const savedStore = useSavedStore();
const userStore = useUserStore();
const { savedNotices, isLoading, error, hasMore } = storeToRefs(savedStore);

const bottomContainer = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

watch(
  () => userStore.isLoggedIn,
  () => {
    if (userStore.isLoggedIn) {
      savedStore.fetchSavedNotices();
    } else {
      savedStore.resetState();
    }
  }
);

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        savedStore.fetchSavedNotices();
      }
    },
    {
      threshold: 0,
    }
  );
  if (bottomContainer.value) {
    observer.observe(bottomContainer.value);
  }
});

onBeforeUnmount(() => {
  if (observer && bottomContainer.value) {
    observer.unobserve(bottomContainer.value);
  }
});
</script>

<template>
  <template v-if="!userStore.isLoggedIn">
    <div class="mx-4 my-2 flex flex-col items-stretch justify-start gap-2">
      <InfoCard content="관심 있는 공고를 언제든지 저장할 수 있어요" />
    </div>
    <div class="m-4 flex flex-1 items-center justify-center">
      <div class="w-full max-w-sm rounded-xl bg-white p-4 shadow-sm">
        <div class="flex flex-col items-center">
          <IconHomeFill class="h-10 flex-shrink-0 text-teal-500" />
          <span class="text-title-bold text-teal-500">임대소문</span>
        </div>
        <div class="mt-4 flex w-full flex-col gap-2">
          <GoogleButton @click="userStore.login" />
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="mx-4 my-2 flex flex-col items-stretch justify-start gap-2">
      <InfoCard content="최근에 저장된 공고순으로 저장되어 있어요" />
    </div>
    <SavedFilter />
    <template v-if="savedNotices.length <= 0 && !isLoading">
      <div class="m-4 flex flex-1 items-center justify-center">
        <IconHomeFill class="text-gray-500-10 h-20 flex-shrink-0 md:h-30" />
      </div>
    </template>
    <template v-else>
      <div
        class="mb-24 grid grid-cols-1 gap-x-4 gap-y-2 px-4 py-2 md:grid-cols-2"
      >
        <template v-if="error">
          <ErrorCard
            :content="'저장된 공고를 불러오는 중 오류가 발생했어요\n잠시 후 다시 시도해주세요'"
          />
        </template>
        <template v-else-if="savedNotices.length <= 0 && isLoading">
          <SavedCardSkeleton v-for="i in 10" :key="i" />
        </template>
        <template v-else>
          <SavedCard
            v-for="notice in savedNotices"
            :key="notice.id"
            :id="notice.id"
            :title="notice.title"
            :date="notice.regDate"
            :department="notice.department"
            :corporation="notice.corporation"
          />
        </template>
        <template v-if="savedNotices.length > 0 && isLoading">
          <SavedCardSkeleton v-for="i in 10" :key="i" />
        </template>
      </div>
    </template>
    <div ref="bottomContainer" />
    <div
      v-if="savedNotices.length > 0 && hasMore && !isLoading"
      class="flex justify-center p-4"
    >
      <button
        @click="savedStore.fetchSavedNotices"
        class="bg-teal-500-10 text-label-bold cursor-pointer rounded-full px-4 py-2 text-teal-500 transition-colors hover:bg-teal-200"
      >
        더보기
      </button>
    </div>
  </template>
</template>
