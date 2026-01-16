<template>
  <div class="min-h-screen text-white overflow-x-hidden relative bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50">
    <BackgroundEffects/>
    
    <div class="relative z-10 py-20 px-6 md:px-12 lg:px-24">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent text-center">
          Reviews
        </h1>
        
        <!-- App Selection -->
        <div class="max-w-2xl mx-auto mb-8">
          <label class="block text-sm font-medium mb-2 text-white/80">
            Sélectionner une application
          </label>
          <Select 
            v-model="selectedApp" 
            :options="appOptions" 
            optionLabel="label"
            optionValue="value"
            placeholder="Choisir une application"
            class="w-full"
            @change="onAppChange"
          />
        </div>

        <!-- Android Warning Message -->
        <div v-if="selectedApp === 'android'" class="max-w-2xl mx-auto mb-8">
          <Message 
            severity="warn" 
            :closable="false"
            class="w-full"
          >
            <template #messageicon>
              <i class="pi pi-exclamation-triangle text-xl"></i>
            </template>
            <div class="flex flex-col gap-2">
              <div class="font-semibold text-lg">Android apps not ready yet</div>
              <div class="text-sm opacity-90">
                Les applications Android ne sont pas encore disponibles. Cette fonctionnalité sera bientôt disponible.
              </div>
            </div>
          </Message>
        </div>

        <!-- Reviews Content (only show if not Android) -->
        <div v-if="selectedApp && selectedApp !== 'android'" class="max-w-4xl mx-auto">
          <div class="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <h2 class="text-2xl font-semibold mb-6">
              Reviews pour {{ getAppLabel(selectedApp) }}
            </h2>
            <p class="text-white/80">
              Contenu des reviews pour cette application...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import BackgroundEffects from '@/components/BackgroundEffects.vue'
import { useToast } from 'primevue/usetoast'

export default {
  name: 'Reviews',
  components: {
    BackgroundEffects
  },
  setup() {
    const toast = useToast()
    const selectedApp = ref(null)
    
    const appOptions = [
      { label: 'iOS App', value: 'ios' },
      { label: 'Android App', value: 'android' },
      { label: 'Web App', value: 'web' },
      { label: 'Desktop App', value: 'desktop' }
    ]
    
    const getAppLabel = (value) => {
      const app = appOptions.find(a => a.value === value)
      return app ? app.label : value
    }
    
    const onAppChange = () => {
      if (selectedApp.value === 'android') {
        toast.add({
          severity: 'warn',
          summary: 'Android not ready',
          detail: 'Les applications Android ne sont pas encore disponibles.',
          life: 5000
        })
      }
    }
    
    return {
      selectedApp,
      appOptions,
      getAppLabel,
      onAppChange
    }
  }
}
</script>

<style scoped>
/* Additional styles if needed */
</style>






