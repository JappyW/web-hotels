import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ua from "./translations/ua.json";
import en from "./translations/en.json";

const resources = {
  en: {
    translation: en
  },
  ua: {
    translation: ua
  }
};

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  debug: false,
  resources,
  interpolation: {
    escapeValue: false
  }
});
