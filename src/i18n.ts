import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import languageDetector from "i18next-browser-languagedetector";

import uzTranslation from "./component/utils/locales/uz.json";
import ruTranslation from "./component/utils/locales/ru.json";
import enTranslation from "./component/utils/locales/en.json";

type TranslationResources = {
  translation: typeof enTranslation;
};

const resources: Record<string, TranslationResources> = {
  uz: { translation: uzTranslation },
  ru: { translation: ruTranslation },
  en: { translation: enTranslation },
};

const lang: string = localStorage.getItem("i18nextLng") || "en";

i18n
  .use(Backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: lang,
    debug: true,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
