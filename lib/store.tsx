import { create } from 'zustand';
import { Character } from './interfaces';

interface Store {
  characters: Character[];
  setCharacters: (chars: Character[]) => void;
  search: boolean;
  setSearch: () => void;
}

export const useStore = create<Store>((set) => ({
  characters: [],
  setCharacters: (chars) => set({ characters: chars }),
  search: false,
  setSearch: () => set({ search: true }),
}));
