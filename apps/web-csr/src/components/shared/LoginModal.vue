<template>
  <div class="flex flex-col gap-4">
    <InfoCard content="서비스 이용을 위해 로그인이 필요해요" />
    <div class="flex flex-col items-center">
      <IconHomeFill class="h-10 flex-shrink-0 text-teal-500" />
      <span class="text-title-bold text-teal-500">임대소문</span>
    </div>
    <div class="mt-4 flex w-full flex-col gap-2">
      <GoogleButton @click="userStore.login" />
      <button
        @click="close"
        class="w-full cursor-pointer rounded-lg bg-gray-500-10 px-4 py-2 text-body text-gray-500 transition-colors hover:bg-gray-300"
      >
        닫기
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModal } from '@/composables/useModal'
import { useUserStore } from '@/stores/user-store'
import GoogleButton from './GoogleButton.vue'
import IconHomeFill from '../icons/IconHomeFill.vue'
import InfoCard from './InfoCard.vue'
import { watch } from 'vue'

const { close } = useModal()
const userStore = useUserStore()

watch(
  () => userStore.isLoggedIn,
  (isLoggedIn) => {
    if (isLoggedIn) {
      close()
    }
  },
  { immediate: true },
)
</script>
