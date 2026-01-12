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
          Nos Services
        </h1>
        <p 
          class="text-xl max-w-3xl mx-auto transition-colors"
          :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
        >
          Expertise technique et accompagnement opérationnel pour vos projets en télécoms fibre et BTP
        </p>
      </div>
    </div>
    
    <div class="relative z-10 py-12 px-6 md:px-12 lg:px-24">
      <div class="max-w-7xl mx-auto">
        <!-- Main Services -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div 
            class="group relative overflow-hidden p-8 md:p-12 backdrop-blur-sm rounded-2xl transition-all duration-300 hover:scale-105"
            :class="themeStore.isDark 
              ? 'bg-white/5 border border-white/10 hover:border-white/30' 
              : 'bg-white/90 border border-gray-200/50 hover:border-gray-300/70 shadow-lg'"
          >
            <div 
              class="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl transition-colors"
              :class="themeStore.isDark ? 'bg-blue-500/10' : 'bg-blue-500/20'"
            ></div>
            
            <div class="relative">
              <div class="w-20 h-20 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <i class="pi pi-wifi text-4xl text-blue-400"></i>
              </div>
              
              <h2 
                class="text-3xl font-bold mb-4 transition-colors"
                :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
              >Télécoms Fibre (FTTH)</h2>
              <p 
                class="text-lg mb-6 transition-colors"
                :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
              >
                Nous mettons à disposition des profils spécialisés dans le déploiement de la fibre optique, 
                de la conception à la réalisation terrain.
              </p>
              
              <ul class="space-y-3 mb-8">
                <li 
                  class="flex items-start gap-3 transition-colors"
                  :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
                >
                  <i class="pi pi-check-circle text-blue-400 mt-1"></i>
                  <div>
                    <span 
                      class="font-semibold transition-colors"
                      :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
                    >Ingénierie d'études</span>
                    <p 
                      class="text-sm transition-colors"
                      :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
                    >Conception et dimensionnement des réseaux FTTH</p>
                  </div>
                </li>
                <li 
                  class="flex items-start gap-3 transition-colors"
                  :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
                >
                  <i class="pi pi-check-circle text-blue-400 mt-1"></i>
                  <div>
                    <span 
                      class="font-semibold transition-colors"
                      :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
                    >Techniciens FTTH</span>
                    <p 
                      class="text-sm transition-colors"
                      :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
                    >Installation et maintenance des réseaux fibre</p>
                  </div>
                </li>
                <li 
                  class="flex items-start gap-3 transition-colors"
                  :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
                >
                  <i class="pi pi-check-circle text-blue-400 mt-1"></i>
                  <div>
                    <span 
                      class="font-semibold transition-colors"
                      :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
                    >Conduite de travaux</span>
                    <p 
                      class="text-sm transition-colors"
                      :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
                    >Pilotage et coordination des chantiers</p>
                  </div>
                </li>
                <li 
                  class="flex items-start gap-3 transition-colors"
                  :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
                >
                  <i class="pi pi-check-circle text-blue-400 mt-1"></i>
                  <div>
                    <span 
                      class="font-semibold transition-colors"
                      :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
                    >Déploiement</span>
                    <p 
                      class="text-sm transition-colors"
                      :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
                    >Mise en œuvre complète des infrastructures</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div 
            class="group relative overflow-hidden p-8 md:p-12 backdrop-blur-sm rounded-2xl transition-all duration-300 hover:scale-105"
            :class="themeStore.isDark 
              ? 'bg-white/5 border border-white/10 hover:border-white/30' 
              : 'bg-white/90 border border-gray-200/50 hover:border-gray-300/70 shadow-lg'"
          >
            <div 
              class="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl transition-colors"
              :class="themeStore.isDark ? 'bg-purple-500/10' : 'bg-purple-500/20'"
            ></div>
            
            <div class="relative">
              <div class="w-20 h-20 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <i class="pi pi-building text-4xl text-purple-400"></i>
              </div>
              
              <h2 
                class="text-3xl font-bold mb-4 transition-colors"
                :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
              >BTP / Ingénierie Terrain</h2>
              <p 
                class="text-lg mb-6 transition-colors"
                :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
              >
                Expertise terrain pour vos projets de construction et d'ingénierie, avec des profils expérimentés 
                dans la gestion opérationnelle.
              </p>
              
              <ul class="space-y-3 mb-8">
                <li 
                  class="flex items-start gap-3 transition-colors"
                  :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
                >
                  <i class="pi pi-check-circle text-purple-400 mt-1"></i>
                  <div>
                    <span 
                      class="font-semibold transition-colors"
                      :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
                    >Chefs d'équipe/chantier</span>
                    <p 
                      class="text-sm transition-colors"
                      :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
                    >Encadrement et gestion des équipes terrain</p>
                  </div>
                </li>
                <li 
                  class="flex items-start gap-3 transition-colors"
                  :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
                >
                  <i class="pi pi-check-circle text-purple-400 mt-1"></i>
                  <div>
                    <span 
                      class="font-semibold transition-colors"
                      :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
                    >Secrétariat technique</span>
                    <p 
                      class="text-sm transition-colors"
                      :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
                    >Support administratif et technique</p>
                  </div>
                </li>
                <li 
                  class="flex items-start gap-3 transition-colors"
                  :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
                >
                  <i class="pi pi-check-circle text-purple-400 mt-1"></i>
                  <div>
                    <span 
                      class="font-semibold transition-colors"
                      :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
                    >Coordination terrain</span>
                    <p 
                      class="text-sm transition-colors"
                      :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
                    >Orchestration des opérations sur site</p>
                  </div>
                </li>
                <li 
                  class="flex items-start gap-3 transition-colors"
                  :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
                >
                  <i class="pi pi-check-circle text-purple-400 mt-1"></i>
                  <div>
                    <span 
                      class="font-semibold transition-colors"
                      :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
                    >Conducteurs de travaux</span>
                    <p 
                      class="text-sm transition-colors"
                      :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
                    >Pilotage technique et opérationnel</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Contract Types -->
        <div 
          class="p-8 backdrop-blur-sm rounded-2xl mb-12 transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <div class="flex items-center gap-3 mb-6">
            <i class="pi pi-file text-blue-400 text-2xl"></i>
            <span 
              class="text-2xl font-semibold transition-colors"
              :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
            >Types de contrats</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              class="p-6 rounded-xl transition-all"
              :class="themeStore.isDark 
                ? 'bg-white/5 border border-white/10 hover:border-white/30' 
                : 'bg-white border border-gray-200/50 hover:border-gray-300/70 shadow-md'"
            >
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-lg flex items-center justify-center mb-4">
                <i class="pi pi-calendar text-blue-400 text-xl"></i>
              </div>
              <h3 
                class="text-xl font-semibold mb-2 transition-colors"
                :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
              >Missions en régie</h3>
              <p 
                class="text-sm transition-colors"
                :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
              >Intervention directe sur vos projets avec facturation au temps passé.</p>
            </div>
            <div 
              class="p-6 rounded-xl transition-all"
              :class="themeStore.isDark 
                ? 'bg-white/5 border border-white/10 hover:border-white/30' 
                : 'bg-white border border-gray-200/50 hover:border-gray-300/70 shadow-md'"
            >
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-lg flex items-center justify-center mb-4">
                <i class="pi pi-euro text-purple-400 text-xl"></i>
              </div>
              <h3 
                class="text-xl font-semibold mb-2 transition-colors"
                :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
              >Prestations au TJM</h3>
              <p 
                class="text-sm transition-colors"
                :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
              >Taux Journalier Moyen ajusté selon l'expérience et le projet.</p>
            </div>
            <div 
              class="p-6 rounded-xl transition-all"
              :class="themeStore.isDark 
                ? 'bg-white/5 border border-white/10 hover:border-white/30' 
                : 'bg-white border border-gray-200/50 hover:border-gray-300/70 shadow-md'"
            >
              <div class="w-12 h-12 bg-gradient-to-br from-pink-500/30 to-pink-600/30 rounded-lg flex items-center justify-center mb-4">
                <i class="pi pi-map-marker text-pink-400 text-xl"></i>
              </div>
              <h3 
                class="text-xl font-semibold mb-2 transition-colors"
                :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
              >Packages (mobilité)</h3>
              <p 
                class="text-sm transition-colors"
                :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
              >Solutions complètes incluant la mobilité et l'accompagnement logistique.</p>
            </div>
          </div>
        </div>
        
        <!-- Support Section -->
        <div 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <div class="flex items-center gap-3 mb-6">
            <i class="pi pi-graduation-cap text-purple-400 text-2xl"></i>
            <span 
              class="text-2xl font-semibold transition-colors"
              :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
            >Accompagnement & Formation</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 
                class="text-xl font-semibold mb-4 transition-colors"
                :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
              >Formations & Habilitations</h3>
              <p 
                class="mb-4 transition-colors"
                :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
              >
                Montée en compétence initiale au besoin :
              </p>
              <ul class="space-y-2">
                <li 
                  class="flex items-center gap-3 transition-colors"
                  :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
                >
                  <i class="pi pi-check text-blue-400"></i>
                  <span>Habilitations électriques</span>
                </li>
                <li 
                  class="flex items-center gap-3 transition-colors"
                  :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
                >
                  <i class="pi pi-check text-blue-400"></i>
                  <span>Travail en hauteur</span>
                </li>
                <li 
                  class="flex items-center gap-3 transition-colors"
                  :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
                >
                  <i class="pi pi-check text-blue-400"></i>
                  <span>CACES (Certificat d'Aptitude à la Conduite En Sécurité)</span>
                </li>
                <li 
                  class="flex items-center gap-3 transition-colors"
                  :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
                >
                  <i class="pi pi-check text-blue-400"></i>
                  <span>Formations spécifiques selon les besoins</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 
                class="text-xl font-semibold mb-4 transition-colors"
                :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
              >Période d'apprentissage</h3>
              <p 
                class="mb-4 transition-colors"
                :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
              >
                Possibilité de période d'apprentissage exigée par le client, avec décalage de facturation 
                (démarrage au 2e mois si requis).
              </p>
              <div 
                class="p-4 rounded-lg transition-colors"
                :class="themeStore.isDark 
                  ? 'bg-blue-500/10 border border-blue-400/20' 
                  : 'bg-blue-50 border border-blue-200/50'"
              >
                <p 
                  class="text-sm transition-colors"
                  :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
                >
                  <i class="pi pi-info-circle text-blue-400 mr-2"></i>
                  Cette option permet aux clients de former les nouveaux talents sans coût supplémentaire le premier mois.
                </p>
              </div>
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
  name: 'Services',
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

<style scoped>
</style>
