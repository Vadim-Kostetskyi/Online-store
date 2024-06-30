import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './locales/en/translation.json';
import translationUa from './locales/ua/translation.json';
import validationEn from './locales/en/validation.json';
import validationUa from './locales/ua/validation.json';

const resources = {
  en: {
    translation: translationEn,
    validation: validationEn,
  },
  ua: {
    translation: translationUa,
    validation: validationUa,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
