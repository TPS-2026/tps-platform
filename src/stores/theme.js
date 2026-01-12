import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: localStorage.getItem('theme') || 'dark' // 'dark' or 'light'
  }),

  getters: {
    isDark: (state) => state.mode === 'dark',
    isLight: (state) => state.mode === 'light',
    currentMode: (state) => state.mode
  },

  actions: {
    setTheme(mode) {
      if (mode === 'dark' || mode === 'light') {
        this.mode = mode
        localStorage.setItem('theme', mode)
        // Apply theme class to document element
        document.documentElement.classList.remove('dark', 'light')
        document.documentElement.classList.add(mode)
      }
    },

    toggleTheme() {
      const newMode = this.mode === 'dark' ? 'light' : 'dark'
      this.setTheme(newMode)
    },

    initTheme() {
      // Apply theme on initialization
      const savedTheme = localStorage.getItem('theme') || 'dark'
      this.setTheme(savedTheme)
    }
  }
})



