<template>
  <div 
    class="min-h-screen overflow-x-hidden relative transition-colors duration-300"
    :class="themeStore.isDark 
      ? 'text-white bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50' 
      : 'text-gray-900 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50'"
  >
    <BackgroundEffects/>
    <div class="relative z-10 py-20 px-6 md:px-12 lg:px-24">
      <div class="max-w-7xl mx-auto text-center">
        <h1 
          class="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent transition-all"
          :class="themeStore.isDark 
            ? 'bg-gradient-to-r from-white via-blue-200 to-purple-200' 
            : 'bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700'"
        >
          {{ $t('glossary.title') }}
        </h1>
        <p class="text-xl max-w-3xl mx-auto transition-colors" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">{{ $t('glossary.subtitle') }}</p>
      </div>
    </div>
    <div class="relative z-10 py-12 px-6 md:px-12 lg:px-24 pb-24">
      <div class="max-w-4xl mx-auto space-y-6">
        <section 
          v-for="(term, key) in terms" 
          :key="key"
          class="p-6 md:p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <h2 
            class="text-lg font-bold mb-2 transition-colors"
            :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'"
          >
            {{ term.name }}
          </h2>
          <p class="text-sm transition-colors" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">{{ $t(term.defKey) }}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundEffects from '@/components/BackgroundEffects.vue'
import { useThemeStore } from '@/stores/theme.js'
export default {
  name: 'Glossary',
  components: { BackgroundEffects },
  setup() {
    const themeStore = useThemeStore()
    const terms = [
      { name: 'FTTH', defKey: 'glossary.ftth' },
      { name: 'Réflectométrie', defKey: 'glossary.reflectometry' },
      { name: 'Dévoiement', defKey: 'glossary.devoiement' },
      { name: 'CACES', defKey: 'glossary.caces' },
      { name: 'AIPR', defKey: 'glossary.aipr' },
      { name: 'TJM', defKey: 'glossary.tjm' },
      { name: '5G', defKey: 'glossary.fiveg' },
      { name: 'Régie', defKey: 'glossary.regie' }
    ]
    return { themeStore, terms }
  }
}
</script>
