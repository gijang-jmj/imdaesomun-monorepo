<script setup lang="ts">
import { computed, ref } from 'vue'
import IconProfile from '../icons/IconProfile.vue'

const props = defineProps<{
  photoURL?: string | null
  isLogin: boolean
}>()

const hasError = ref(false)

const onImageError = () => {
  hasError.value = true
}

const containerClass = computed(() => {
  return {
    'bg-teal-500-10': props.isLogin,
    'bg-gray-500-10': !props.isLogin,
  }
})

const avatarClass = computed(() => {
  return {
    'text-teal-500': props.isLogin,
    'text-gray-400': !props.isLogin,
  }
})
</script>

<template>
  <div
    class="flex items-center justify-center overflow-hidden rounded-full"
    :class="containerClass"
  >
    <img
      v-if="props.photoURL && !hasError"
      :src="props.photoURL"
      alt="User Avatar"
      class="block w-full"
      loading="lazy"
      @error="onImageError"
    />
    <IconProfile v-if="!props.photoURL || hasError" class="w-4/5" :class="avatarClass" />
  </div>
</template>
