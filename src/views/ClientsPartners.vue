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
          {{ $t('clientsPartners.title') }}
        </h1>
        <p class="text-xl max-w-3xl mx-auto transition-colors" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">{{ $t('clientsPartners.subtitle') }}</p>
      </div>
    </div>
    <div class="relative z-10 py-12 px-6 md:px-12 lg:px-24 pb-24">
      <div class="max-w-4xl mx-auto space-y-10">
        <section 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <h2 class="text-2xl font-semibold mb-6 transition-colors" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">{{ $t('clientsPartners.clientsTitle') }}</h2>
          <div class="flex flex-wrap gap-3 justify-center">
            <span 
              v-for="name in clients" 
              :key="name"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="themeStore.isDark ? 'bg-white/10 text-white/90' : 'bg-gray-100 text-gray-800'"
            >{{ name }}</span>
          </div>
        </section>
        <section 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <h2 class="text-2xl font-semibold mb-6 transition-colors" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">{{ $t('clientsPartners.partnersTitle') }}</h2>
          <div class="flex flex-wrap gap-3 justify-center">
            <span 
              v-for="name in partners" 
              :key="name"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="themeStore.isDark ? 'bg-white/10 text-white/90' : 'bg-gray-100 text-gray-800'"
            >{{ name }}</span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundEffects from '@/components/BackgroundEffects.vue'
import { useThemeStore } from '@/stores/theme.js'
export default {
  name: 'ClientsPartners',
  components: { BackgroundEffects },
  setup() {
    const themeStore = useThemeStore()
    const clients = ['Circet', 'SMF Consulting', 'Metacom', 'SPIE CityNetworks', 'STK TELECOM', 'TCONNECT', 'Atlas', 'COWOOL CERGY']
    const partners = ['Mega Renov Group', 'Orvia', 'LAPRO INVEST', 'BFM3A', 'FeatWay', 'Batyrex']
    return { themeStore, clients, partners }
  }
}
</script>
