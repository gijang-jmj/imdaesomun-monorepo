<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { AppRoute } from '@imdaesomun/shared/constants/app-route';
import IconHome from '@/components/icons/IconHome.vue';
import IconBookmarkCheck from '@/components/icons/IconBookmarkCheck.vue';
import { useUserStore } from '@/stores/user-store';
import { useModal } from '@/composables/useModal';
import ProfileModal from '@/components/shared/ProfileModal.vue';
import LoginModal from '@/components/shared/LoginModal.vue';
import IconProfile from '@/components/icons/IconProfile.vue';

const route = useRoute();
const user = useUserStore();
const { open } = useModal();

const onAvatarClick = () => {
  if (user.isLoggedIn) {
    open(ProfileModal);
  } else {
    open(LoginModal);
  }
};
</script>

<template>
  <nav class="sticky bottom-0 md:hidden">
    <div
      class="flex items-center justify-around border-t border-gray-100 bg-white"
    >
      <RouterLink
        :to="AppRoute.HOME"
        class="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors hover:text-teal-500"
        :class="
          route.path === '/' || route.path === AppRoute.HOME
            ? 'text-teal-500'
            : 'text-gray-400'
        "
      >
        <IconHome class="h-5" />
        <span class="text-caption-bold">임대소문</span>
      </RouterLink>
      <RouterLink
        :to="AppRoute.SAVED"
        class="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors hover:text-teal-500"
        :class="
          route.path === AppRoute.SAVED ? 'text-teal-500' : 'text-gray-400'
        "
      >
        <IconBookmarkCheck class="h-5" />
        <span class="text-caption-bold">저장됨</span>
      </RouterLink>
      <div
        @click="onAvatarClick"
        class="flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 py-2 text-gray-400 transition-colors hover:text-teal-500"
      >
        <IconProfile class="h-5" />
        <span class="text-caption-bold">내정보</span>
      </div>
    </div>
  </nav>
</template>
