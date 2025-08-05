import { create } from 'zustand';

interface LoadingStore {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

export const useLoadingStore = create<LoadingStore>((set) => {
  return {
    isLoading: false,
    showLoading: () => set({ isLoading: true }),
    hideLoading: () => set({ isLoading: false }),
  };
});
