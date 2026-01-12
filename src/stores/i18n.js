import { defineStore } from 'pinia'

export const useI18nStore = defineStore('i18n', {
  state: () => {
    const savedLocale = localStorage.getItem('locale')
    // Ensure locale is valid ('fr' or 'en')
    const validLocale = savedLocale === 'fr' || savedLocale === 'en' ? savedLocale : 'fr'
    return {
      locale: validLocale
    }
  },
  
  actions: {
    setLocale(locale) {
      // Ensure locale is valid
      if (locale === 'fr' || locale === 'en') {
        this.locale = locale
        localStorage.setItem('locale', locale)
      }
    }
  },
  
  getters: {
    currentLocale: (state) => {
      // Ensure we return a string, not a ref
      return state.locale || 'fr'
    }
  }
})

