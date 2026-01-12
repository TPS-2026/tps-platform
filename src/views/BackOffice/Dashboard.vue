<template>
  <div class="min-h-screen text-white overflow-x-hidden relative bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50">
    <BackgroundEffects/>
    
    <div class="relative z-10 py-20 px-6 md:px-12 lg:px-24">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
          Back Office
        </h1>
        <p class="text-xl text-white/80 max-w-3xl mb-12">
          Gérez les offres d'emploi et les articles de votre plateforme
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            class="group relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer hover:scale-105"
            @click="$router.push({ name: 'backoffice-jobs' })"
          >
            <div class="flex items-center gap-4 mb-4">
              <div class="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <i class="pi pi-briefcase text-3xl text-blue-400"></i>
              </div>
              <h2 class="text-2xl font-semibold">Offres d'emploi</h2>
            </div>
            <p class="text-white/70 mb-6">Gérez les offres d'emploi publiées sur la plateforme</p>
            <Button 
              label="Gérer les offres" 
              severity="secondary" 
              text
              icon="pi pi-arrow-right"
              iconPos="right"
              class="text-white hover:text-blue-400 transition-colors group-hover:translate-x-1 transition-transform"
            />
          </div>

          <div 
            class="group relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer hover:scale-105"
            @click="$router.push({ name: 'backoffice-news' })"
          >
            <div class="flex items-center gap-4 mb-4">
              <div class="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <i class="pi pi-newspaper text-3xl text-purple-400"></i>
              </div>
              <h2 class="text-2xl font-semibold">Articles</h2>
            </div>
            <p class="text-white/70 mb-6">Gérez les articles et actualités publiés sur la plateforme</p>
            <Button 
              label="Gérer les articles" 
              severity="secondary" 
              text
              icon="pi pi-arrow-right"
              iconPos="right"
              class="text-white hover:text-purple-400 transition-colors group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>

        <div class="mt-8">
          <Button 
            label="Retour au site" 
            icon="pi pi-arrow-left" 
            severity="secondary" 
            outlined
            class="border-white/30 text-white hover:bg-white/10 transition-all"
            @click="$router.push({ name: 'home' })"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundEffects from '@/components/BackgroundEffects.vue'

export default {
  name: 'BackOfficeDashboard',
  components: {
    BackgroundEffects
  }
}
</script>







