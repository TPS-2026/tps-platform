<template>
  <div 
    class="min-h-screen overflow-x-hidden relative transition-colors duration-300"
    :class="themeStore.isDark 
      ? 'text-white bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50' 
      : 'text-gray-900 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50'"
  >
    <BackgroundEffects/>
    
    <div class="relative z-10 p-8 md:p-12 lg:p-24">
      <div class="max-w-7xl mx-auto">
        <!-- Hero Section -->
        <div class="mb-12">
          <h1 
            class="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent transition-all"
            :class="themeStore.isDark 
              ? 'bg-gradient-to-r from-white via-blue-200 to-purple-200' 
              : 'bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700'"
          >
            Bienvenue sur TPS
          </h1>
          <p 
            class="text-xl transition-colors"
            :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
          >
            Votre plateforme pour découvrir les opportunités et services TPS
          </p>
        </div>
        
        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div 
            class="group relative p-8 backdrop-blur-sm rounded-2xl transition-all cursor-pointer"
            :class="themeStore.isDark 
              ? 'bg-white/5 border border-white/10 hover:border-white/30' 
              : 'bg-white/90 border border-gray-200/50 hover:border-gray-300/70 shadow-lg'"
            @click="$router.push('/jobs')"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <i class="pi pi-briefcase text-2xl text-blue-400"></i>
              </div>
              <span 
                class="text-xl font-semibold transition-colors"
                :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
              >Offres d'emploi</span>
            </div>
            <p 
              class="mb-6 transition-colors"
              :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
            >Découvrez nos offres d'emploi dans les secteurs des télécoms fibre et du BTP.</p>
            <Button 
              label="Voir les offres" 
              severity="secondary" 
              text
              icon="pi pi-arrow-right"
              iconPos="right"
              class="transition-colors"
              :class="themeStore.isDark ? 'text-white hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'"
            />
          </div>
          
          <div 
            class="group relative p-8 backdrop-blur-sm rounded-2xl transition-all cursor-pointer"
            :class="themeStore.isDark 
              ? 'bg-white/5 border border-white/10 hover:border-white/30' 
              : 'bg-white/90 border border-gray-200/50 hover:border-gray-300/70 shadow-lg'"
            @click="$router.push('/news')"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <i class="pi pi-calendar-plus text-2xl text-purple-400"></i>
              </div>
              <span 
                class="text-xl font-semibold transition-colors"
                :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
              >Actualités</span>
            </div>
            <p 
              class="mb-6 transition-colors"
              :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
            >Restez informé de l'actualité de TPS et de nos projets.</p>
            <Button 
              label="Voir les actualités" 
              severity="secondary" 
              text
              icon="pi pi-arrow-right"
              iconPos="right"
              class="transition-colors"
              :class="themeStore.isDark ? 'text-white hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'"
            />
          </div>
        </div>

        <!-- Services Overview -->
        <div 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <div class="flex items-center gap-3 mb-6">
            <i class="pi pi-cog text-blue-400 text-2xl"></i>
            <span 
              class="text-2xl font-semibold transition-colors"
              :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
            >Nos services</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="relative">
              <div 
                class="absolute top-0 left-0 w-32 h-32 rounded-full blur-2xl transition-colors"
                :class="themeStore.isDark ? 'bg-blue-500/10' : 'bg-blue-500/20'"
              ></div>
              <div class="relative">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-lg flex items-center justify-center">
                    <i class="pi pi-wifi text-blue-400"></i>
                  </div>
                  <h3 
                    class="text-xl font-semibold transition-colors"
                    :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
                  >Télécoms Fibre (FTTH)</h3>
                </div>
                <ul 
                  class="list-none space-y-2 transition-colors"
                  :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
                >
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check text-blue-400 text-sm"></i>
                    <span>Ingénierie d'études</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check text-blue-400 text-sm"></i>
                    <span>Techniciens FTTH</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check text-blue-400 text-sm"></i>
                    <span>Conduite de travaux</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check text-blue-400 text-sm"></i>
                    <span>Déploiement</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="relative">
              <div 
                class="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl transition-colors"
                :class="themeStore.isDark ? 'bg-purple-500/10' : 'bg-purple-500/20'"
              ></div>
              <div class="relative">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-lg flex items-center justify-center">
                    <i class="pi pi-building text-purple-400"></i>
                  </div>
                  <h3 
                    class="text-xl font-semibold transition-colors"
                    :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
                  >BTP / Ingénierie Terrain</h3>
                </div>
                <ul 
                  class="list-none space-y-2 transition-colors"
                  :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
                >
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check text-purple-400 text-sm"></i>
                    <span>Chefs d'équipe/chantier</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check text-purple-400 text-sm"></i>
                    <span>Secrétariat technique</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check text-purple-400 text-sm"></i>
                    <span>Coordination terrain</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check text-purple-400 text-sm"></i>
                    <span>Conducteurs de travaux</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div 
            class="mt-6 pt-6 transition-colors"
            :class="themeStore.isDark ? 'border-t border-white/10' : 'border-t border-gray-200'"
          >
            <RouterLink to="/services">
              <Button 
                label="Découvrir tous nos services" 
                severity="secondary" 
                outlined
                icon="pi pi-arrow-right"
                iconPos="right"
                class="transition-all"
                :class="themeStore.isDark 
                  ? 'border-white/30 text-white hover:bg-white/10' 
                  : 'border-gray-800/30 text-gray-900 hover:bg-gray-100'"
              />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundEffects from '@/components/BackgroundEffects.vue'
import { useThemeStore } from '@/stores/theme.js'

export default {
  name: 'HomeView',
  components: {
    BackgroundEffects
  },
  setup() {
    const themeStore = useThemeStore()
    return {
      themeStore
    }
  }
}
</script>
