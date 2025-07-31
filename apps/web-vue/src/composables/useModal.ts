import { shallowRef, watch } from 'vue';
import type { Component } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const isOpen = shallowRef(false);
const modalComponent = shallowRef<Component | null>(null);

export const useModal = () => {
  const router = useRouter();
  const route = useRoute();

  watch(
    () => route.query.modal,
    (modalQuery) => {
      if (!modalQuery && isOpen.value) {
        setClose();
      }
    }
  );

  const setClose = () => {
    isOpen.value = false;
    modalComponent.value = null;
    document.body.classList.remove('no-scroll');
  };

  const open = (component: Component) => {
    isOpen.value = true;
    modalComponent.value = component;
    document.body.classList.add('no-scroll');
    router.push({ query: { ...route.query, modal: 'open' } });
  };

  const close = () => {
    router.back();
  };

  return {
    isOpen,
    modalComponent,
    open,
    close,
  };
};
