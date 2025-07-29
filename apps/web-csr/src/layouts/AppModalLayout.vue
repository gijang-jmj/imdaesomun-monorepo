<template>
  <div v-if="isOpen" class="fixed inset-0 z-40 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-50" @click="close" />
    <div class="z-1 mx-4 w-full max-w-sm rounded-xl bg-gray-50 p-4 shadow-xl">
      <component :is="modalComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModal } from '@/composables/useModal'

const { isOpen, close, modalComponent } = useModal()
</script>
