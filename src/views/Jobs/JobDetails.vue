<template>
  <div class="min-h-screen text-white overflow-x-hidden relative bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50">
    <BackgroundEffects/>
    
    <!-- Hero Section -->
    <div class="relative z-10 py-16 px-6 md:px-12 lg:px-24">
      <div class="max-w-4xl mx-auto">
        <Button 
          label="Retour" 
          icon="pi pi-arrow-left" 
          severity="secondary" 
          outlined
          class="border-white/30 text-white hover:bg-white/10 transition-all"
          @click="$router.back()"
        />
      </div>
    </div>

    <div class="relative z-10 py-12 px-6 md:px-12 lg:px-24">
      <div class="max-w-4xl mx-auto">
        <div v-if="jobsStore.loading" class="text-center py-20">
          <ProgressSpinner size="large"/>
          <p class="mt-4 text-white/70">Chargement...</p>
        </div>
        
        <div v-else-if="job" class="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ job.title }}</h1>
          <div class="flex flex-wrap gap-2 mb-6">
            <Tag :value="job.sector === 'telecom' ? 'Télécoms Fibre' : 'BTP'" severity="info"/>
            <Tag :value="job.location" severity="secondary"/>
            <Tag :value="formatContractType(job.contractType)" severity="success"/>
            <Tag v-if="job.tjm" :value="`TJM: ${job.tjm}€`" severity="warning"/>
          </div>
          
          <div class="space-y-8">
            <div>
              <h3 class="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-400">
                <i class="pi pi-file"></i>
                Description
              </h3>
              <p class="text-white/80 whitespace-pre-line leading-relaxed">{{ job.description }}</p>
            </div>
            
            <div v-if="job.requirements && job.requirements.length > 0" class="p-6 bg-white/5 rounded-xl border border-white/10">
              <h3 class="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-400">
                <i class="pi pi-user"></i>
                Profil recherché
              </h3>
              <ul class="space-y-3">
                <li v-for="req in job.requirements" :key="req" class="flex items-start gap-3 text-white/80">
                  <i class="pi pi-check-circle text-blue-400 mt-1"></i>
                  <span>{{ req }}</span>
                </li>
              </ul>
            </div>
            
            <div v-if="job.responsibilities && job.responsibilities.length > 0" class="p-6 bg-white/5 rounded-xl border border-white/10">
              <h3 class="text-xl font-semibold mb-4 flex items-center gap-2 text-pink-400">
                <i class="pi pi-briefcase"></i>
                Missions
              </h3>
              <ul class="space-y-3">
                <li v-for="resp in job.responsibilities" :key="resp" class="flex items-start gap-3 text-white/80">
                  <i class="pi pi-check-circle text-purple-400 mt-1"></i>
                  <span>{{ resp }}</span>
                </li>
              </ul>
            </div>
            
            <div v-if="job.benefits && job.benefits.length > 0" class="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-400/20">
              <h3 class="text-xl font-semibold mb-4 flex items-center gap-2 text-cyan-400">
                <i class="pi pi-star"></i>
                Avantages
              </h3>
              <ul class="space-y-3">
                <li v-for="benefit in job.benefits" :key="benefit" class="flex items-start gap-3 text-white/80">
                  <i class="pi pi-check-circle text-cyan-400 mt-1"></i>
                  <span>{{ benefit }}</span>
                </li>
              </ul>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
              <RouterLink :to="{ name: 'job-apply', params: { id: job.id } }" class="flex-1">
                <Button 
                  label="Postuler maintenant" 
                  severity="contrast" 
                  icon="pi pi-send"
                  iconPos="right"
                  class="w-full bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all"
                />
              </RouterLink>
              <Button 
                label="Partager" 
                icon="pi pi-share-alt" 
                severity="secondary" 
                outlined
                class="border-white/30 text-white hover:bg-white/10 transition-all"
                @click="shareJob"
              />
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-20">
          <div class="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="pi pi-exclamation-triangle text-4xl text-blue-400/50"></i>
          </div>
          <p class="text-xl text-white/70 mb-4">Offre non trouvée</p>
          <RouterLink to="/jobs">
            <Button 
              label="Voir toutes les offres" 
              severity="contrast"
              class="bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all"
            />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useJobsStore} from "@/stores/jobs.js";
import {useToast} from "primevue/usetoast";
import {onMounted, computed} from "vue";
import {useRoute} from "vue-router";
import BackgroundEffects from '@/components/BackgroundEffects.vue'

export default {
  name: 'JobDetails',
  components: {
    BackgroundEffects
  },
  setup() {
    const jobsStore = useJobsStore()
    const route = useRoute()
    const toast = useToast()
    
    const job = computed(() => jobsStore.currentJob)
    
    const formatContractType = (type) => {
      const types = {
        'regie': 'Régie',
        'tjm': 'TJM',
        'package': 'Package'
      }
      return types[type] || type
    }
    
    const shareJob = () => {
      if (navigator.share) {
        navigator.share({
          title: job.value?.title,
          text: job.value?.description,
          url: window.location.href
        }).catch(() => {})
      } else {
        navigator.clipboard.writeText(window.location.href)
        toast.add({
          severity: 'success',
          summary: 'Lien copié',
          detail: 'Le lien a été copié dans le presse-papier',
          life: 3000
        })
      }
    }
    
    onMounted(async () => {
      await jobsStore.fetchJobById(route.params.id)
    })
    
    return {
      jobsStore,
      job,
      formatContractType,
      shareJob
    }
  }
}
</script>
