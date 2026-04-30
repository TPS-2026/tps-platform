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
        const root = document.documentElement
        root.classList.remove('dark', 'light')
        root.classList.add(mode)
        root.classList.toggle('dark-mode', mode === 'dark')
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




