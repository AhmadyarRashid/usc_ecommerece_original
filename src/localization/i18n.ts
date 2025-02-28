import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import en from "./locales/en.json";
import ur from "./locales/ur.json";

const resources = {
  en: { translation: en },
  ur: { translation: ur },
};

i18n.use(initReactI18next).init({
  resources,
  lng: RNLocalize.getLocales()[0].languageCode || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
