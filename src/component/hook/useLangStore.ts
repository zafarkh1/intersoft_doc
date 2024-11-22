import { create } from "zustand";

// Define the types for the store's state
interface LangStore {
  currentLanguage: string | null;
  setCurrentLanguage: (language: string) => void;
}

// Create the store using the `create` function from Zustand
export const useLangStore = create<LangStore>((set) => ({
  // Initialize the state with the current language from localStorage
  currentLanguage: localStorage.getItem("i18nextLng"),

  // Define the action to update the current language
  setCurrentLanguage: (language: string) => set({ currentLanguage: language }),
}));
