import { create } from 'zustand';
import { SearchState, ThemeState } from '../types';

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  setQuery: (query) => set({ query }),
}));

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  toggle: () => set((state) => ({ isDark: !state.isDark })),
}));