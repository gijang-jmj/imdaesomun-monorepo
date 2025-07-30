<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { AppRoute } from '@imdaesomun/shared/constants/app-route'
import IconHomeFill from '@/components/icons/IconHomeFill.vue'
import AppAvatar from '@/components/ui/AppAvatar.vue'
import { useUserStore } from '@/stores/user-store'
import ProfileModal from '@/components/shared/ProfileModal.vue'
import { useModal } from '@/composables/useModal'
import LoginModal from '@/components/shared/LoginModal.vue'

const route = useRoute()
const user = useUserStore()
const { open } = useModal()

const onAvatarClick = () => {
  if (user.isLoggedIn) {
    open(ProfileModal)
  } else {
    open(LoginModal)
  }
}
</script>

<template>
  <header class="border-b border-gray-100 bg-white">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-2 md:py-4">
      <div class="flex items-end gap-10">
        <RouterLink :to="AppRoute.HOME" class="flex items-center gap-2">
          <IconHomeFill class="h-6 text-teal-500 md:h-8" />
          <span class="text-subtitle-bold text-teal-500 md:text-title-bold">임대소문</span>
        </RouterLink>
        <nav class="hidden items-center gap-4 md:flex">
          <RouterLink
            :to="AppRoute.HOME"
            class="rounded-lg px-3 py-1 text-subtitle transition-colors hover:text-teal-500"
            :class="
              route.path === '/' || route.path === AppRoute.HOME ? 'text-teal-500' : 'text-gray-400'
            "
            >홈</RouterLink
          >
          <RouterLink
            :to="AppRoute.SAVED"
            class="rounded-lg px-3 py-1 text-subtitle transition-colors hover:text-teal-500"
            :class="route.path === AppRoute.SAVED ? 'text-teal-500' : 'text-gray-400'"
            >내 공고</RouterLink
          >
        </nav>
      </div>
      <div class="cursor-pointer px-3 py-1" @click="onAvatarClick">
        <AppAvatar class="h-7 w-7" :photoURL="user.photoURL" :isLogin="user.isLoggedIn" />
      </div>
    </div>
  </header>
</template>
