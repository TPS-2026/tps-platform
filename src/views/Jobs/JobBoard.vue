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
          Offres d'emploi
        </h1>
        <p 
          class="text-xl max-w-3xl mx-auto transition-colors"
          :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
        >
          Découvrez les opportunités de carrière dans les télécoms fibre et le BTP
        </p>
      </div>
    </div>

    <div class="relative z-10 py-12 px-6 md:px-12 lg:px-24">
      <div class="max-w-7xl mx-auto">
        <!-- Filters -->
        <div 
          class="mb-8 p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <div class="flex items-center gap-3 mb-6">
            <i class="pi pi-filter text-blue-400"></i>
            <span 
              class="text-xl font-semibold transition-colors"
              :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
            >Filtres de recherche</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label 
                class="block text-sm font-medium mb-2 transition-colors"
                :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
              >Secteur</label>
              <Select 
                v-model="filters.sector" 
                :options="sectorOptions" 
                placeholder="Tous les secteurs"
                class="w-full custom-select"
              />
            </div>
            <div>
              <label 
                class="block text-sm font-medium mb-2 transition-colors"
                :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
              >Localisation</label>
              <InputText 
                v-model="filters.location" 
                placeholder="Ville, région..."
                class="w-full custom-input"
              />
            </div>
            <div>
              <label 
                class="block text-sm font-medium mb-2 transition-colors"
                :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
              >Type de contrat</label>
              <Select 
                v-model="filters.contractType" 
                :options="contractTypeOptions" 
                placeholder="Tous les types"
                class="w-full custom-select"
              />
            </div>
            <div>
              <label 
                class="block text-sm font-medium mb-2 transition-colors"
                :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
              >Recherche</label>
              <InputText 
                v-model="filters.search" 
                placeholder="Mots-clés..."
                class="w-full custom-input"
              />
            </div>
          </div>
          <div class="flex gap-2 mt-6">
            <Button 
              label="Rechercher" 
              severity="contrast" 
              icon="pi pi-search"
              class="bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all"
              @click="searchJobs"
            />
            <Button 
              label="Réinitialiser" 
              severity="secondary" 
              outlined
              class="transition-all"
              :class="themeStore.isDark 
                ? 'border-white/30 text-white hover:bg-white/10' 
                : 'border-gray-800/30 text-gray-900 hover:bg-gray-100'"
              @click="resetFilters"
            />
          </div>
        </div>

        <!-- Jobs List -->
        <div v-if="jobsStore.loading" class="text-center py-20">
          <ProgressSpinner size="large"/>
          <p 
            class="mt-4 transition-colors"
            :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
          >Chargement des offres...</p>
        </div>
        
        <div v-else-if="jobsStore.jobs.length === 0" class="text-center py-20">
          <div 
            class="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors"
            :class="themeStore.isDark ? 'bg-blue-500/10' : 'bg-blue-500/20'"
          >
            <i 
              class="pi pi-inbox text-4xl transition-colors"
              :class="themeStore.isDark ? 'text-blue-400/50' : 'text-blue-600/70'"
            ></i>
          </div>
          <p 
            class="text-xl mb-4 transition-colors"
            :class="themeStore.isDark ? 'text-white/70' : 'text-gray-700'"
          >Aucune offre trouvée</p>
          <p 
            class="text-sm mb-6 transition-colors"
            :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
          >Essayez de modifier vos critères de recherche</p>
          <Button 
            label="Réinitialiser les filtres" 
            severity="secondary" 
            outlined
            class="transition-all"
            :class="themeStore.isDark 
              ? 'border-white/30 text-white hover:bg-white/10' 
              : 'border-gray-800/30 text-gray-900 hover:bg-gray-100'"
            @click="resetFilters"
          />
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="job in jobsStore.jobs" 
            :key="job.id"
            class="group relative p-8 backdrop-blur-sm rounded-2xl transition-all duration-300 cursor-pointer hover:scale-105"
            :class="themeStore.isDark 
              ? 'bg-white/5 border border-white/10 hover:border-white/30' 
              : 'bg-white/90 border border-gray-200/50 hover:border-gray-300/70 shadow-lg'"
            @click="$router.push({ name: 'job-details', params: { id: job.id } })"
          >
            <h3 
              class="text-xl font-semibold mb-4 transition-colors line-clamp-2"
              :class="themeStore.isDark 
                ? 'text-white group-hover:text-blue-400' 
                : 'text-gray-900 group-hover:text-blue-600'"
            >{{ job.title }}</h3>
            <div class="flex flex-wrap gap-2 mb-4">
              <Tag :value="job.sector === 'telecom' ? 'Télécoms Fibre' : 'BTP'" severity="info" class="text-xs"/>
              <Tag :value="job.location" severity="secondary" class="text-xs"/>
              <Tag :value="formatContractType(job.contractType)" severity="success" class="text-xs"/>
            </div>
            <p 
              class="mb-6 line-clamp-3 leading-relaxed transition-colors"
              :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
            >{{ job.description }}</p>
            <div 
              class="flex justify-between items-center pt-4 transition-colors"
              :class="themeStore.isDark ? 'border-t border-white/10' : 'border-t border-gray-200'"
            >
              <span 
                class="text-sm flex items-center gap-2 transition-colors"
                :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
              >
                <i class="pi pi-calendar"></i>
                {{ formatDate(job.createdAt) }}
              </span>
              <Button 
                label="Voir détails" 
                severity="secondary" 
                text
                icon="pi pi-arrow-right"
                iconPos="right"
                class="transition-colors group-hover:translate-x-1 transition-transform"
                :class="themeStore.isDark 
                  ? 'text-white hover:text-blue-400' 
                  : 'text-gray-700 hover:text-blue-600'"
                @click.stop="$router.push({ name: 'job-details', params: { id: job.id } })"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useJobsStore} from "@/stores/jobs.js";
import {useThemeStore} from "@/stores/theme.js";
import {ref, onMounted} from "vue";
import BackgroundEffects from '@/components/BackgroundEffects.vue'

export default {
  name: 'JobBoard',
  components: {
    BackgroundEffects
  },
  setup() {
    const jobsStore = useJobsStore()
    const themeStore = useThemeStore()
    const filters = ref({
      sector: null,
      location: null,
      contractType: null,
      search: null
    })
    
    const sectorOptions = [
      { label: 'Télécoms Fibre', value: 'telecom' },
      { label: 'BTP', value: 'btp' }
    ]
    
    const contractTypeOptions = [
      { label: 'Régie', value: 'regie' },
      { label: 'TJM', value: 'tjm' },
      { label: 'Package', value: 'package' }
    ]
    
    const searchJobs = async () => {
      jobsStore.setFilters(filters.value)
      await jobsStore.fetchJobs()
    }
    
    const resetFilters = () => {
      filters.value = {
        sector: null,
        location: null,
        contractType: null,
        search: null
      }
      jobsStore.resetFilters()
      jobsStore.fetchJobs()
    }
    
    const formatContractType = (type) => {
      const types = {
        'regie': 'Régie',
        'tjm': 'TJM',
        'package': 'Package'
      }
      return types[type] || type
    }
    
    const formatDate = (date) => {
      if (!date) return ''
      return new Date(date).toLocaleDateString('fr-FR')
    }
    
    onMounted(async () => {
      await jobsStore.fetchJobs()
    })
    
    return {
      jobsStore,
      themeStore,
      filters,
      sectorOptions,
      contractTypeOptions,
      searchJobs,
      resetFilters,
      formatContractType,
      formatDate
    }
  }
}
</script>

<style scoped>
:deep(.custom-input .p-inputtext),
:deep(.custom-input input) {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  backdrop-filter: blur(10px);
}

:deep(.custom-input .p-inputtext:focus),
:deep(.custom-input input:focus) {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(96, 165, 250, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(96, 165, 250, 0.25) !important;
}

:deep(.custom-input .p-inputtext::placeholder),
:deep(.custom-input input::placeholder) {
  color: rgba(255, 255, 255, 0.5) !important;
}

:deep(.custom-select .p-select),
:deep(.custom-select .p-inputtext) {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  backdrop-filter: blur(10px);
}

:deep(.custom-select .p-select:focus),
:deep(.custom-select .p-inputtext:focus) {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(96, 165, 250, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(96, 165, 250, 0.25) !important;
}

:deep(.custom-select .p-select-label),
:deep(.custom-select .p-placeholder) {
  color: rgba(255, 255, 255, 0.7) !important;
}

:deep(.p-select-overlay) {
  background: rgba(30, 30, 40, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

:deep(.p-select-overlay .p-select-item) {
  color: white !important;
}

:deep(.p-select-overlay .p-select-item:hover) {
  background: rgba(255, 255, 255, 0.1) !important;
}

:deep(.p-select-overlay .p-select-item.p-highlight) {
  background: rgba(96, 165, 250, 0.3) !important;
  color: white !important;
}
</style>
