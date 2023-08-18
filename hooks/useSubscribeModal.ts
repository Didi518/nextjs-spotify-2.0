import { create } from 'zustand';

interface SusbscribeStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSusbscribe = create<SusbscribeStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSusbscribe;
