<template>
  <div 
    class="min-h-screen overflow-x-hidden relative transition-colors duration-300"
    :class="themeStore.isDark 
      ? 'text-white bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50' 
      : 'text-gray-900 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50'"
  >
    <BackgroundEffects/>
    
    <!-- Hero Section -->
    <div class="relative z-10 py-20 px-6 md:px-12 lg:px-24">
      <div class="max-w-7xl mx-auto text-center">
        <h1 
          class="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent transition-all"
          :class="themeStore.isDark 
            ? 'bg-gradient-to-r from-white via-blue-200 to-purple-200' 
            : 'bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700'"
        >
          À propos de TPS
        </h1>
        <p
          class="text-xl max-w-3xl mx-auto transition-colors"
          :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
        >
          Expertise technique et excellence opérationnelle en télécoms fibre et BTP
        </p>
      </div>
    </div>

    <div class="relative z-10 py-12 px-6 md:px-12 lg:px-24">
      <div class="max-w-4xl mx-auto space-y-8">
        <div 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <div class="flex items-center gap-3 mb-6">
            <i class="pi pi-info-circle text-blue-400 text-2xl"></i>
            <span 
              class="text-2xl font-semibold transition-colors"
              :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
            >Notre mission</span>
          </div>
          <p 
            class="mb-6 leading-relaxed transition-colors"
            :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
          >
            TPS met à disposition de ses clients des ingénieurs et techniciens autour de deux axes majeurs :
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              class="p-6 rounded-xl transition-colors"
              :class="themeStore.isDark 
                ? 'bg-white/5 border border-white/10' 
                : 'bg-white border border-gray-200/50 shadow-md'"
            >
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-lg flex items-center justify-center">
                  <i class="pi pi-wifi text-blue-400 text-xl"></i>
                </div>
                <h3 
                  class="text-lg font-semibold transition-colors"
                  :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
                >Télécoms fibre (FTTH)</h3>
              </div>
              <p 
                class="text-sm transition-colors"
                :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
              >
                Ingénierie d'études, techniciens FTTH, conduite de travaux, déploiement
              </p>
            </div>
            <div 
              class="p-6 rounded-xl transition-colors"
              :class="themeStore.isDark 
                ? 'bg-white/5 border border-white/10' 
                : 'bg-white border border-gray-200/50 shadow-md'"
            >
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-lg flex items-center justify-center">
                  <i class="pi pi-building text-purple-400 text-xl"></i>
                </div>
                <h3 
                  class="text-lg font-semibold transition-colors"
                  :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
                >BTP / Ingénierie Terrain</h3>
              </div>
              <p 
                class="text-sm transition-colors"
                :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
              >
                Chefs d'équipe/chantier, secrétariat technique, fonctions de coordination terrain
              </p>
            </div>
          </div>
          <p 
            class="mt-6 leading-relaxed transition-colors"
            :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
          >
            Les profils couvrent la chaîne opérationnelle (techniciens, chefs d'équipe/de chantier, conducteurs de travaux, 
            secrétariat technique, etc.). L'orientation demeure terrain / ingénierie.
          </p>
        </div>
        
        <div 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <div class="flex items-center gap-3 mb-6">
            <i class="pi pi-cog text-purple-400 text-2xl"></i>
            <span 
              class="text-2xl font-semibold transition-colors"
              :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
            >Notre modèle</span>
          </div>
          <div class="space-y-6">
            <div 
              class="p-6 rounded-xl transition-colors"
              :class="themeStore.isDark 
                ? 'bg-white/5 border border-white/10' 
                : 'bg-white border border-gray-200/50 shadow-md'"
            >
              <h3 
                class="text-lg font-semibold mb-3 flex items-center gap-2 transition-colors"
                :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'"
              >
                <i class="pi pi-euro"></i>
                Facturation
              </h3>
              <p 
                class="leading-relaxed transition-colors"
                :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
              >
                Prestations au Taux Journalier Moyen (TJM) ajusté selon l'expérience/séniorité, le projet et le budget client 
                (en cohérence avec les prétentions du candidat).
              </p>
            </div>
            <div 
              class="p-6 rounded-xl transition-colors"
              :class="themeStore.isDark 
                ? 'bg-white/5 border border-white/10' 
                : 'bg-white border border-gray-200/50 shadow-md'"
            >
              <h3 
                class="text-lg font-semibold mb-3 flex items-center gap-2 transition-colors"
                :class="themeStore.isDark ? 'text-purple-400' : 'text-purple-600'"
              >
                <i class="pi pi-map-marker"></i>
                Périmètre géographique
              </h3>
              <p 
                class="leading-relaxed transition-colors"
                :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
              >
                Opérations principalement en France, avec mobilité nationale et ouvertures internationales au cas par cas 
                (montage de packages si mission à l'étranger).
              </p>
            </div>
          </div>
        </div>
        
        <div 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <div class="flex items-center gap-3 mb-6">
            <i class="pi pi-star text-pink-400 text-2xl"></i>
            <span 
              class="text-2xl font-semibold transition-colors"
              :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
            >Notre différenciation</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="(diff, index) in differentiations" 
              :key="index"
              class="p-6 rounded-xl transition-all"
              :class="themeStore.isDark 
                ? 'bg-white/5 border border-white/10 hover:border-white/30' 
                : 'bg-white border border-gray-200/50 hover:border-gray-300/70 shadow-md'"
            >
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-lg flex items-center justify-center">
                  <i :class="diff.icon" class="text-blue-400"></i>
                </div>
                <h3 
                  class="font-semibold transition-colors"
                  :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
                >{{ diff.title }}</h3>
              </div>
              <p 
                class="text-sm transition-colors"
                :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
              >{{ diff.description }}</p>
            </div>
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
  name: 'About',
  components: {
    BackgroundEffects
  },
  setup() {
    const themeStore = useThemeStore()
    return {
      themeStore
    }
  },
  data() {
    return {
      differentiations: [
        {
          icon: 'pi pi-bolt',
          title: 'Time-to-staff rapide',
          description: 'Réseau + cooptation + base interne'
        },
        {
          icon: 'pi pi-check-circle',
          title: 'Criblage technique',
          description: 'Par un ingénieur de terrain'
        },
        {
          icon: 'pi pi-graduation-cap',
          title: 'Formation & habilitations',
          description: 'Capacité de formation/habilitation + apprentissage initial possible'
        },
        {
          icon: 'pi pi-desktop',
          title: 'Plateforme RH',
          description: 'Process digitalisés'
        },
        {
          icon: 'pi pi-map-marker',
          title: 'Mobilité logée',
          description: 'Aide logement & prix compétitifs'
        }
      ]
    }
  }
}
</script>
