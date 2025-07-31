<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  value: string | null;
  modelValue: string | null;
  count: number;
}>();

const emit = defineEmits(['update:modelValue']);

const isSelected = computed(() => props.modelValue === props.value);

const handleClick = () => {
  emit('update:modelValue', props.value);
};
</script>

<template>
  <button
    @click="handleClick"
    class="text-label-bold shrink-0 cursor-pointer rounded-full px-3 py-1"
    :class="[
      isSelected
        ? 'bg-teal-500-10 text-teal-500'
        : 'bg-gray-500-10 text-gray-500 hover:bg-gray-300',
    ]"
  >
    {{ label }} {{ count }}
  </button>
</template>
