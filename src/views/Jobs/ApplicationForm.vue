<template>
  <div class="min-h-screen text-white overflow-x-hidden relative bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50">
    <BackgroundEffects/>
    
    <!-- Hero Section -->
    <div class="relative z-10 py-16 px-6 md:px-12 lg:px-24">
      <div class="max-w-2xl mx-auto">
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
      <div class="max-w-2xl mx-auto">
        <div class="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <div class="flex items-center gap-3 mb-6">
            <i class="pi pi-send text-blue-400 text-2xl"></i>
            <span class="text-2xl font-semibold">Postuler à l'offre</span>
          </div>
          
          <div v-if="job" class="mb-8 p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 class="font-semibold mb-3 text-lg">{{ job.title }}</h3>
            <div class="flex flex-wrap gap-2">
              <Tag :value="job.sector === 'telecom' ? 'Télécoms Fibre' : 'BTP'" severity="info"/>
              <Tag :value="job.location" severity="secondary"/>
            </div>
          </div>
          
          <form @submit.prevent="submitApplication" class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-2 text-white/80">Nom complet *</label>
              <InputText v-model="form.fullName" required class="w-full"/>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2 text-white/80">Email *</label>
              <InputText v-model="form.email" type="email" required class="w-full"/>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2 text-white/80">Téléphone *</label>
              <InputText v-model="form.phone" required class="w-full"/>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2 text-white/80">CV (PDF) - Optionnel</label>
              <FileUpload 
                mode="basic" 
                accept="application/pdf"
                :maxFileSize="5000000"
                chooseLabel="Choisir un fichier"
                @select="onFileSelect"
                class="w-full"
              />
              <small class="text-white/60 block mt-2">Taille max: 5MB - Le fichier ne sera pas téléchargé (mock)</small>
              <div v-if="form.cv" class="mt-2 p-3 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
                <span class="text-sm text-white/80">{{ form.cv.name }}</span>
                <Button 
                  icon="pi pi-times" 
                  severity="secondary" 
                  text 
                  rounded
                  class="text-white/60 hover:text-white"
                  @click="form.cv = null"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2 text-white/80">Lettre de motivation</label>
              <Textarea 
                v-model="form.coverLetter" 
                rows="5" 
                class="w-full custom-textarea"
                placeholder="Décrivez votre motivation et votre expérience..."
                :pt="{
                  root: { class: 'custom-textarea-root' }
                }"
              />
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2 text-white/80">Expérience (années)</label>
                <InputNumber v-model="form.experience" :min="0" class="w-full"/>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2 text-white/80">Disponibilité</label>
                <Calendar v-model="form.availability" dateFormat="dd/mm/yy" class="w-full"/>
              </div>
            </div>
            
            <div class="flex gap-4 pt-4 border-t border-white/10">
              <Button 
                type="submit" 
                label="Envoyer la candidature" 
                severity="contrast" 
                icon="pi pi-send"
                iconPos="right"
                :loading="submitting"
                class="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all"
              />
              <Button 
                label="Annuler" 
                severity="secondary" 
                outlined
                class="border-white/30 text-white hover:bg-white/10 transition-all"
                @click="$router.back()"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useJobsStore} from "@/stores/jobs.js";
import {useToast} from "primevue/usetoast";
import {ref, onMounted, computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import BackgroundEffects from '@/components/BackgroundEffects.vue'

export default {
  name: 'ApplicationForm',
  components: {
    BackgroundEffects
  },
  setup() {
    const jobsStore = useJobsStore()
    const route = useRoute()
    const router = useRouter()
    const toast = useToast()
    
    const form = ref({
      fullName: '',
      email: '',
      phone: '',
      cv: null,
      coverLetter: '',
      experience: null,
      availability: null
    })
    
    const submitting = ref(false)
    
    const job = computed(() => jobsStore.currentJob)
    
    const onFileSelect = (event) => {
      form.value.cv = event.files[0]
    }
    
    const submitApplication = async () => {
      submitting.value = true
      try {
        // Prepare application data according to backend model
        const applicationData = {
          jobId: route.params.id || '',
          jobTitle: job.value?.title || '',
          fullName: form.value.fullName || '',
          email: form.value.email || '',
          phone: form.value.phone || '',
          coverLetter: form.value.coverLetter || '',
          experience: form.value.experience ? parseInt(form.value.experience) : null,
          availability: form.value.availability ? new Date(form.value.availability).toISOString() : null,
          cvFileName: form.value.cv ? form.value.cv.name : '',
          cvFileSize: form.value.cv ? parseInt(form.value.cv.size) : null
        }
        
        await jobsStore.submitApplication(route.params.id, applicationData)
        
        toast.add({
          severity: 'success',
          summary: 'Candidature envoyée',
          detail: 'Votre candidature a été envoyée avec succès',
          life: 5000
        })
        
        router.push({ name: 'job-board' })
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Une erreur est survenue lors de l\'envoi de votre candidature',
          life: 5000
        })
      } finally {
        submitting.value = false
      }
    }
    
    onMounted(async () => {
      await jobsStore.fetchJobById(route.params.id)
    })
    
    return {
      jobsStore,
      job,
      form,
      submitting,
      onFileSelect,
      submitApplication
    }
  }
}
</script>

<style scoped>
:deep(.custom-textarea textarea),
:deep(.custom-textarea .p-inputtextarea),
:deep(textarea.p-inputtextarea) {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  backdrop-filter: blur(10px);
}

:deep(.custom-textarea textarea:focus),
:deep(.custom-textarea .p-inputtextarea:focus),
:deep(textarea.p-inputtextarea:focus) {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(96, 165, 250, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(96, 165, 250, 0.25) !important;
  outline: none !important;
}

:deep(.custom-textarea textarea::placeholder),
:deep(.custom-textarea .p-inputtextarea::placeholder),
:deep(textarea.p-inputtextarea::placeholder) {
  color: rgba(255, 255, 255, 0.5) !important;
}

/* Target all textareas in this component */
:deep(textarea) {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  backdrop-filter: blur(10px);
}

:deep(textarea:focus) {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(96, 165, 250, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(96, 165, 250, 0.25) !important;
  outline: none !important;
}

:deep(textarea::placeholder) {
  color: rgba(255, 255, 255, 0.5) !important;
}
</style>
