
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import common_de from "./locales/de/common.json";
import achievements_de from "./locales/de/achievements.json";
import events_de from "./locales/de/events.json"

import common_en from "./locales/en/common.json";
import achievements_en from "./locales/en/achievements.json";
import events_en from "./locales/en/events.json"

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)  // automatically detect the users language in the browser
  .init({
    ns: ['common', 'achievements', "events"],
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'querystring', 'cookie', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      convertDetectedLanguage: 'Iso15897',
    },

    // ignore the region code for now so that all de and en language-codes are treated equally. 
    // There is no need to distinguish regions for translations right now
    load: 'languageOnly',

    resources: {
        en: {
            common: common_en,
            achievements: achievements_en,
            events: events_en
        },
        de: {
            common: common_de,
            achievements: achievements_de,
            events: events_de
        },
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    returnEmptyString: false,
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already escapes
    }

});

export default i18n