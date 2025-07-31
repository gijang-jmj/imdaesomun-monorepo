<template>
  <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-50" />
    <div class="max-w-xs">
      <Vue3Lottie :animationData="animationData" :loop="true" :autoplay="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
import animationData from '@imdaesomun/assets/lottie/loading.json'
import { useLoading } from '@/composables/useLoading'

const { isLoading } = useLoading()
</script>
