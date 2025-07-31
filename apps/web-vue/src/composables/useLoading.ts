import { shallowRef } from 'vue';

const isLoading = shallowRef(false);

export const useLoading = () => {
  const showLoading = () => {
    isLoading.value = true;
    document.body.classList.add('no-scroll');
  };

  const hideLoading = () => {
    isLoading.value = false;
    document.body.classList.remove('no-scroll');
  };

  return {
    isLoading,
    showLoading,
    hideLoading,
  };
};
