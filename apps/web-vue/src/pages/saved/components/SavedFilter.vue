<script setup lang="ts">
import { useSavedStore } from '@/stores/saved-store';
import { storeToRefs } from 'pinia';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import AppRadioButton from '@/components/ui/AppRadioButton.vue';

const savedStore = useSavedStore();
const { currentFilter, shCount, ghCount, ihCount, bmcCount } =
  storeToRefs(savedStore);

const filters = computed(() => [
  { label: '전체', value: null, count: savedStore.totalCount },
  { label: 'SH', value: 'sh', count: shCount.value },
  { label: 'GH', value: 'gh', count: ghCount.value },
  { label: 'IH', value: 'ih', count: ihCount.value },
  { label: 'BMC', value: 'bmc', count: bmcCount.value },
]);

const setFilter = (filter: string | null) => {
  savedStore.setFilter(filter);
};

const isStuck = ref(false);
const filterContainer = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isStuck.value = false;
      } else {
        isStuck.value = true;
      }
    },
    {
      rootMargin: '-1px 0px 0px 0px',
      threshold: 1,
    }
  );
  if (filterContainer.value) {
    observer.observe(filterContainer.value);
  }
});

onBeforeUnmount(() => {
  if (observer && filterContainer.value) {
    observer.unobserve(filterContainer.value);
  }
});

const stickyClass = computed(() => {
  return isStuck.value
    ? 'bg-white shadow-sm md:shadow-none md:bg-transparent'
    : 'bg-transparent';
});
</script>

<template>
  <div
    ref="filterContainer"
    class="sticky top-0 z-1 flex gap-2 overflow-x-auto px-4 py-2 transition-all md:relative"
    :class="stickyClass"
  >
    <AppRadioButton
      v-for="filter in filters"
      :key="filter.label"
      :label="filter.label"
      :value="filter.value"
      :count="filter.count"
      v-model="currentFilter"
      @update:modelValue="setFilter"
    />
  </div>
</template>
