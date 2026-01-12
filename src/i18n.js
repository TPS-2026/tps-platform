import { createI18n } from 'vue-i18n'
import fr from './locales/fr.json'
import en from './locales/en.json'

// Get locale from localStorage and ensure it's valid
const getInitialLocale = () => {
  const savedLocale = localStorage.getItem('locale')
  // Only allow 'fr' or 'en'
  if (savedLocale === 'fr' || savedLocale === 'en') {
    return savedLocale
  }
  return 'fr'
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'fr',
  messages: {
    fr,
    en
  }
})

export default i18n

