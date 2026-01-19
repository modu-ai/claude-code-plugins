import { getLocale } from "@apps-in-toss/framework";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ko from './locales/ko.json';
import en from './locales/en.json';

i18n.use(initReactI18next).init({
  lng: getLocale(),
  fallbackLng: 'ko',
  supportedLngs: ['ko', 'en'],
  compatibilityJSON: 'v4',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    ko: { translation: ko },
    en: { translation: en },
  },
});

export default i18n;
