import { create } from "zustand";

interface LangStore {
  currentLanguage: string | null;
  setCurrentLanguage: (language: string) => void;
}

export const useLangStore = create<LangStore>((set) => ({
  currentLanguage: localStorage.getItem("i18nextLng") || "en",

  setCurrentLanguage: (language: string) => set({ currentLanguage: language }),
}));
