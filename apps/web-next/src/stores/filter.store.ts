import { create } from 'zustand';

interface FilterStore {
  savedFilter: string | null;
  setSavedFilter: (filter: string | null) => void;
}

export const useSavedFilterStore = create<FilterStore>((set) => ({
  savedFilter: null,
  setSavedFilter: (newFilter) => set({ savedFilter: newFilter }),
}));
