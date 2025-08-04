<template>
  <footer class="border-t border-gray-100 bg-white">
    <div class="mx-auto max-w-5xl px-4 py-12 text-center md:text-start">
      <div class="mb-4 flex flex-col items-center justify-between md:flex-row">
        <div class="text-label-bold mb-4 text-gray-500 md:mb-0">
          <span>&copy; 2025 Imdaesomun. All rights reserved.</span>
        </div>
        <div class="flex gap-x-6">
          <a
            :href="AppLink.PRIVACY_POLICY"
            target="_blank"
            rel="noopener noreferrer"
            class="text-label-bold text-gray-500 transition-colors hover:text-teal-500"
            >개인정보 처리방침</a
          >
          <a
            :href="AppLink.ACCOUNT_NOTICE"
            target="_blank"
            rel="noopener noreferrer"
            class="text-label-bold text-gray-500 transition-colors hover:text-teal-500"
            >계정 관리 문의</a
          >
        </div>
      </div>
      <div class="text-gray-500">
        <p class="text-label mb-1 text-gray-400">
          임대소문은 서울주택도시공사(SH), 경기주택도시공사(GH),
          인천도시공사(IH), 부산도시공사(BMC)에서 제공하는 공고를 비상업적
          목적에 따라 제공하며, 모든 공고의 저작권은 해당 공사에 귀속됩니다.
        </p>
        <p class="text-label text-gray-400">
          문의:&nbsp;<a
            href="mailto:wnalsals1127@gmail.com"
            class="transition-colors hover:text-teal-500"
            >wnalsals1127@gmail.com</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { AppLink } from '@imdaesomun/shared/constants/app-link';
</script>

<style scoped></style>
