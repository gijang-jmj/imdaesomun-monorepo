<script setup lang="ts">
import { useModal } from '@/composables/useModal'
import { useUserStore } from '@/stores/user-store'
import InfoCard from './InfoCard.vue'
import AppAvatar from '@/components/ui/AppAvatar.vue'
import { watch } from 'vue'

const { close } = useModal()
const user = useUserStore()

watch(
  () => user.isLoggedIn,
  (isLoggedIn) => {
    if (!isLoggedIn) {
      close()
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <InfoCard class="w-full" content="프로필 정보를 확인하고 로그아웃할 수 있어요" />
    <AppAvatar class="h-16 w-16" :photoURL="user.photoURL" :isLogin="user.isLoggedIn" />
    <div class="text-center">
      <p class="text-subtitle-bold">{{ user.displayName }}</p>
      <p class="text-body text-gray-500">{{ user.email }}</p>
    </div>
    <div class="mt-4 flex w-full flex-col gap-2">
      <button
        @click="user.logout"
        class="w-full cursor-pointer rounded-lg bg-red-100 px-4 py-2 text-body text-red-500 transition-colors hover:bg-red-200"
      >
        로그아웃
      </button>
      <button
        @click="close"
        class="w-full cursor-pointer rounded-lg bg-gray-500-10 px-4 py-2 text-body text-gray-500 transition-colors hover:bg-gray-300"
      >
        닫기
      </button>
    </div>
  </div>
</template>
