<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <div class="flex flex-1 flex-col">
      <div class="mx-auto flex w-full max-w-5xl flex-1 flex-col">
        <RouterView />
      </div>
    </div>
    <AppNav />
    <AppFooter />
    <AppModalLayout />
    <AppLoading />
  </div>
</template>

<script setup lang="ts">
import AppNav from './AppNav.vue';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import AppModalLayout from '@/layouts/AppModalLayout.vue';
import AppLoading from './AppLoading.vue';
</script>
<style scoped></style>
