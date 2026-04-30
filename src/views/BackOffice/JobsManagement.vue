<template>
  <BackOfficeLayout>
    <div class="py-6 px-6 md:px-12">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold mb-2" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
              {{ $t('backoffice.jobs.title') }}
            </h1>
            <p :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">{{ $t('backoffice.jobs.subtitle') }}</p>
          </div>
          <div class="flex gap-3">
            <Button 
              :label="$t('backoffice.jobs.new')" 
              icon="pi pi-plus" 
              severity="contrast"
              class="bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all"
              @click="openJobDialog(null)"
            />
          </div>
        </div>

        <div v-if="loading" class="text-center py-20">
          <ProgressSpinner size="large"/>
          <p class="mt-4" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">{{ $t('common.loading') }}</p>
        </div>

        <div v-else-if="jobs.length === 0" 
             class="text-center py-20 rounded-2xl"
             :class="themeStore.isDark 
               ? 'bg-white/5 backdrop-blur-sm border border-white/10' 
               : 'bg-white border border-gray-200 shadow-sm'">
          <div class="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
               :class="themeStore.isDark ? 'bg-blue-500/10' : 'bg-blue-50'">
            <i class="pi pi-inbox text-4xl" :class="themeStore.isDark ? 'text-blue-400/50' : 'text-blue-400'"></i>
          </div>
          <p class="text-xl mb-4" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">{{ $t('backoffice.jobs.noJobs') }}</p>
          <Button 
            :label="$t('backoffice.jobs.createFirst')" 
            icon="pi pi-plus"
            severity="contrast"
            class="bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all"
            @click="openJobDialog(null)"
          />
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="job in jobs" 
            :key="job.id"
            class="p-6 rounded-2xl transition-all"
            :class="themeStore.isDark 
              ? 'bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30' 
              : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm'"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-xl font-semibold mb-2" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">{{ job.title }}</h3>
                <div class="flex flex-wrap gap-2 mb-3">
                  <Tag :value="job.sector === 'telecom' ? $t('jobs.sectors.telecom') : $t('jobs.sectors.btp')" severity="info" class="text-xs"/>
                  <Tag :value="job.location" severity="secondary" class="text-xs"/>
                  <Tag :value="formatContractType(job.contractType)" severity="success" class="text-xs"/>
                </div>
                <p class="line-clamp-2 mb-3" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">{{ job.description }}</p>
                <span class="text-sm" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'">
                  <i class="pi pi-calendar mr-2"></i>
                  {{ $t('common.created') }} {{ formatDate(job.createdAt) }}
                </span>
              </div>
              <div class="flex gap-2 ml-4">
                <Button 
                  icon="pi pi-pencil" 
                  severity="secondary" 
                  outlined
                  rounded
                  :class="themeStore.isDark 
                    ? 'border-white/30 text-white hover:bg-white/10' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'"
                  @click="openJobDialog(job)"
                  v-tooltip.top="$t('common.edit')"
                />
                <Button 
                  icon="pi pi-trash" 
                  severity="danger" 
                  outlined
                  rounded
                  class="border-red-400/30 text-red-400 hover:bg-red-400/10"
                  @click="confirmDelete(job)"
                  v-tooltip.top="$t('common.delete')"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Job Dialog -->
    <Dialog 
      v-model:visible="showDialog" 
      :header="editingJob ? $t('backoffice.jobs.form.update') : $t('backoffice.jobs.form.create')"
      :style="{ width: '90vw', maxWidth: '800px' }"
      :modal="true"
      class="p-fluid"
    >
      <form @submit.prevent="saveJob" class="space-y-1">
        <!-- Section: Langue -->
        <div class="flex items-center gap-2 pt-2 pb-3">
          <i class="pi pi-globe text-blue-400"></i>
          <span class="text-sm font-semibold text-white/90 uppercase tracking-wide">Langue</span>
          <div class="flex-1 h-px bg-white/10"></div>
        </div>
        <div>
          <Select
            v-model="currentLanguage"
            :options="languageOptions"
            optionLabel="label"
            optionValue="value"
            class="w-full"
            @change="loadLanguageData"
          />
        </div>

        <!-- Section: Informations principales -->
        <div class="flex items-center gap-2 pt-6 pb-3">
          <i class="pi pi-info-circle text-blue-400"></i>
          <span class="text-sm font-semibold text-white/90 uppercase tracking-wide">Informations principales</span>
          <div class="flex-1 h-px bg-white/10"></div>
        </div>
        <div class="space-y-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div>
            <label class="block text-xs font-medium mb-1.5 text-white/60">{{ $t('backoffice.jobs.form.title') }} <span class="text-red-400">*</span></label>
            <InputText v-model="jobForm.translations[currentLanguage].title" required class="w-full" placeholder="Ex: Technicien Fibre Optique FTTH" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium mb-1.5 text-white/60">{{ $t('backoffice.jobs.form.sector') }} <span class="text-red-400">*</span></label>
              <Select
                v-model="jobForm.sector"
                :options="sectorOptions"
                optionLabel="label"
                optionValue="value"
                required
                placeholder="Choisir un secteur"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-xs font-medium mb-1.5 text-white/60">{{ $t('backoffice.jobs.form.location') }} <span class="text-red-400">*</span></label>
              <InputText v-model="jobForm.location" required class="w-full" placeholder="Ex: Paris, Île-de-France" />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium mb-1.5 text-white/60">{{ $t('backoffice.jobs.form.contractType') }} <span class="text-red-400">*</span></label>
              <Select
                v-model="jobForm.contractType"
                :options="contractTypeOptions"
                optionLabel="label"
                optionValue="value"
                required
                placeholder="Choisir un type"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-xs font-medium mb-1.5 text-white/60">{{ $t('backoffice.jobs.form.tjm') }}</label>
              <InputNumber v-model="jobForm.tjm" :min="0" class="w-full" placeholder="0" />
            </div>
          </div>
        </div>

        <!-- Section: Description -->
        <div class="flex items-center gap-2 pt-6 pb-3">
          <i class="pi pi-file-edit text-purple-400"></i>
          <span class="text-sm font-semibold text-white/90 uppercase tracking-wide">Description du poste</span>
          <div class="flex-1 h-px bg-white/10"></div>
        </div>
        <div class="space-y-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div>
            <label class="block text-xs font-medium mb-1.5 text-white/60">{{ $t('backoffice.jobs.form.description') }} <span class="text-red-400">*</span></label>
            <Textarea v-model="jobForm.translations[currentLanguage].description" rows="5" required class="w-full" placeholder="Décrivez le poste en détail..." />
          </div>
          <div>
            <label class="block text-xs font-medium mb-1.5 text-white/60">{{ $t('backoffice.jobs.form.requirements') }}</label>
            <Textarea
              v-model="requirementsText"
              rows="3"
              :placeholder="$t('backoffice.jobs.form.requirementsPlaceholder')"
              class="w-full"
            />
            <small class="text-white/40 text-xs mt-1 block">Une ligne par critère</small>
          </div>
          <div>
            <label class="block text-xs font-medium mb-1.5 text-white/60">{{ $t('backoffice.jobs.form.responsibilities') }}</label>
            <Textarea
              v-model="responsibilitiesText"
              rows="3"
              :placeholder="$t('backoffice.jobs.form.responsibilitiesPlaceholder')"
              class="w-full"
            />
            <small class="text-white/40 text-xs mt-1 block">Une ligne par mission</small>
          </div>
          <div>
            <label class="block text-xs font-medium mb-1.5 text-white/60">{{ $t('backoffice.jobs.form.benefits') }}</label>
            <Textarea
              v-model="benefitsText"
              rows="3"
              :placeholder="$t('backoffice.jobs.form.benefitsPlaceholder')"
              class="w-full"
            />
            <small class="text-white/40 text-xs mt-1 block">Une ligne par avantage</small>
          </div>
        </div>

        <!-- Section: Liens externes -->
        <div class="flex items-center gap-2 pt-6 pb-3">
          <i class="pi pi-link text-cyan-400"></i>
          <span class="text-sm font-semibold text-white/90 uppercase tracking-wide">Liens externes</span>
          <div class="flex-1 h-px bg-white/10"></div>
        </div>
        <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <label class="block text-xs font-medium mb-1.5 text-white/60">
            <i class="pi pi-linkedin text-[#0A66C2] mr-1"></i>
            Lien LinkedIn de l'offre
          </label>
          <InputText v-model="jobForm.linkedinUrl" placeholder="https://www.linkedin.com/jobs/view/..." class="w-full" />
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-6 border-t border-white/10 mt-2">
          <Button
            :label="$t('common.cancel')"
            severity="secondary"
            outlined
            icon="pi pi-times"
            @click="closeDialog"
          />
          <Button
            :label="editingJob ? $t('backoffice.jobs.form.update') : $t('backoffice.jobs.form.create')"
            type="submit"
            severity="contrast"
            :icon="editingJob ? 'pi pi-check' : 'pi pi-plus'"
            class="bg-gradient-to-r from-blue-500 to-purple-600 border-0"
          />
        </div>
      </form>
    </Dialog>

    <!-- Delete Confirmation -->
    <ConfirmDialog />
  </BackOfficeLayout>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import apiClient from '@/utils/axios.js'
import BackOfficeLayout from './BackOfficeLayout.vue'
import { useThemeStore } from '@/stores/theme.js'

export default {
  name: 'JobsManagement',
  components: {
    BackOfficeLayout
  },
  setup() {
    const { t } = useI18n()
    const themeStore = useThemeStore()
    const jobs = ref([])
    const loading = ref(false)
    const showDialog = ref(false)
    const editingJob = ref(null)
    const confirm = useConfirm()
    const toast = useToast()
    const currentLanguage = ref('fr')

    const languageOptions = [
      { label: 'Français', value: 'fr' },
      { label: 'English', value: 'en' }
    ]

    const initTranslations = () => ({
      fr: {
        title: '',
        description: '',
        requirements: [],
        responsibilities: [],
        benefits: []
      },
      en: {
        title: '',
        description: '',
        requirements: [],
        responsibilities: [],
        benefits: []
      }
    })

    const jobForm = ref({
      sector: null,
      location: '',
      contractType: null,
      tjm: null,
      linkedinUrl: '',
      translations: initTranslations()
    })

    const requirementsText = computed({
      get: () => jobForm.value.translations[currentLanguage.value]?.requirements?.join('\n') || '',
      set: (val) => {
        if (!jobForm.value.translations[currentLanguage.value]) {
          jobForm.value.translations[currentLanguage.value] = initTranslations()[currentLanguage.value]
        }
        jobForm.value.translations[currentLanguage.value].requirements = val ? val.split('\n').filter(l => l.trim()) : []
      }
    })

    const responsibilitiesText = computed({
      get: () => jobForm.value.translations[currentLanguage.value]?.responsibilities?.join('\n') || '',
      set: (val) => {
        if (!jobForm.value.translations[currentLanguage.value]) {
          jobForm.value.translations[currentLanguage.value] = initTranslations()[currentLanguage.value]
        }
        jobForm.value.translations[currentLanguage.value].responsibilities = val ? val.split('\n').filter(l => l.trim()) : []
      }
    })

    const benefitsText = computed({
      get: () => jobForm.value.translations[currentLanguage.value]?.benefits?.join('\n') || '',
      set: (val) => {
        if (!jobForm.value.translations[currentLanguage.value]) {
          jobForm.value.translations[currentLanguage.value] = initTranslations()[currentLanguage.value]
        }
        jobForm.value.translations[currentLanguage.value].benefits = val ? val.split('\n').filter(l => l.trim()) : []
      }
    })

    const loadLanguageData = () => {
      // Ensure translation exists for current language
      if (!jobForm.value.translations[currentLanguage.value]) {
        jobForm.value.translations[currentLanguage.value] = initTranslations()[currentLanguage.value]
      }
    }

    const sectorOptions = computed(() => [
      { label: t('jobs.sectors.telecom'), value: 'telecom' },
      { label: t('jobs.sectors.btp'), value: 'btp' }
    ])

    const contractTypeOptions = computed(() => [
      { label: t('jobs.contractTypes.regie'), value: 'regie' },
      { label: t('jobs.contractTypes.tjm'), value: 'tjm' },
      { label: t('jobs.contractTypes.package'), value: 'package' }
    ])

    const fetchJobs = async () => {
      loading.value = true
      try {
        console.log('Fetching jobs from:', '/jobs')
        const response = await apiClient.get('/jobs', {
          params: { admin: 'true' } // Get all jobs including unpublished
        })
        console.log('Jobs response:', response.data)
        jobs.value = Array.isArray(response.data) ? response.data : []
      } catch (error) {
        console.error('Error fetching jobs:', error)
        console.error('Error response:', error.response?.data)
        console.error('Error status:', error.response?.status)
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: error.response?.data?.error || 'Impossible de charger les offres d\'emploi. Vérifiez que le serveur est démarré (npm run server)',
          life: 5000
        })
      } finally {
        loading.value = false
      }
    }

    const openJobDialog = (job) => {
      if (job) {
        editingJob.value = job
        // Backend now returns title, description, requirements, etc. directly (not in translations)
        // We still use translations structure in the form for UI purposes, but map from backend format
        jobForm.value = {
          sector: job.sector?.value || job.sector || null,
          location: job.location || '',
          contractType: job.contractType?.value || job.contractType || null,
          tjm: job.tjm || null,
          linkedinUrl: job.linkedinUrl || '',
          translations: {
            fr: {
              title: job.title || '',
              description: job.description || '',
              requirements: Array.isArray(job.requirements) ? job.requirements : [],
              responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities : [],
              benefits: Array.isArray(job.benefits) ? job.benefits : []
            },
            en: initTranslations().en
          }
        }
        currentLanguage.value = 'fr'
      } else {
        editingJob.value = null
        jobForm.value = {
          sector: null,
          location: '',
          contractType: null,
          tjm: null,
          linkedinUrl: '',
          translations: initTranslations()
        }
        currentLanguage.value = 'fr'
      }
      showDialog.value = true
    }

    const closeDialog = () => {
      showDialog.value = false
      editingJob.value = null
    }

    const saveJob = async () => {
      try {
        // Validate required fields
        if (!jobForm.value.translations[currentLanguage.value]?.title?.trim()) {
          toast.add({
            severity: 'warn',
            summary: 'Validation',
            detail: 'Le titre est obligatoire',
            life: 3000
          })
          return
        }
        
        if (!jobForm.value.sector) {
          toast.add({
            severity: 'warn',
            summary: 'Validation',
            detail: 'Le secteur est obligatoire',
            life: 3000
          })
          return
        }
        
        if (!jobForm.value.location?.trim()) {
          toast.add({
            severity: 'warn',
            summary: 'Validation',
            detail: 'La localisation est obligatoire',
            life: 3000
          })
          return
        }
        
        if (!jobForm.value.contractType) {
          toast.add({
            severity: 'warn',
            summary: 'Validation',
            detail: 'Le type de contrat est obligatoire',
            life: 3000
          })
          return
        }

        // Prepare job data - new format without translations
        const sectorValue = typeof jobForm.value.sector === 'string' ? jobForm.value.sector : jobForm.value.sector?.value || jobForm.value.sector
        const contractTypeValue = typeof jobForm.value.contractType === 'string' ? jobForm.value.contractType : jobForm.value.contractType?.value || jobForm.value.contractType
        
        // Get current language data or fallback to fr
        const currentLang = currentLanguage.value || 'fr'
        const langData = jobForm.value.translations[currentLang] || jobForm.value.translations.fr || {}
        
        // Ensure arrays are properly formatted
        const requirements = Array.isArray(langData.requirements) 
          ? langData.requirements.filter(r => r && r.trim())
          : (typeof langData.requirements === 'string' && langData.requirements.trim()
              ? langData.requirements.split('\n').filter(l => l.trim())
              : [])
        
        const responsibilities = Array.isArray(langData.responsibilities)
          ? langData.responsibilities.filter(r => r && r.trim())
          : (typeof langData.responsibilities === 'string' && langData.responsibilities.trim()
              ? langData.responsibilities.split('\n').filter(l => l.trim())
              : [])
        
        const benefits = Array.isArray(langData.benefits)
          ? langData.benefits.filter(b => b && b.trim())
          : (typeof langData.benefits === 'string' && langData.benefits.trim()
              ? langData.benefits.split('\n').filter(l => l.trim())
              : [])
        
        const jobData = {
          sector: sectorValue,
          location: jobForm.value.location.trim(),
          contractType: contractTypeValue,
          tjm: jobForm.value.tjm ? parseInt(jobForm.value.tjm) : null,
          title: langData.title?.trim() || '',
          description: langData.description?.trim() || '',
          requirements: requirements,
          responsibilities: responsibilities,
          benefits: benefits,
          linkedinUrl: jobForm.value.linkedinUrl?.trim() || ''
        }
        
        console.log('Saving job data:', JSON.stringify(jobData, null, 2))
        
        if (editingJob.value) {
          console.log('Updating job:', editingJob.value.id)
          const response = await apiClient.put(`/jobs/${editingJob.value.id}`, jobData)
          console.log('Update response:', response.data)
          toast.add({
            severity: 'success',
            summary: t('common.save'),
            detail: 'Offre d\'emploi modifiée avec succès',
            life: 3000
          })
        } else {
          console.log('Creating new job')
          const response = await apiClient.post('/jobs', jobData)
          console.log('Create response:', response.data)
          toast.add({
            severity: 'success',
            summary: t('common.save'),
            detail: 'Offre d\'emploi créée avec succès',
            life: 3000
          })
        }
        closeDialog()
        await fetchJobs()
      } catch (error) {
        console.error('Error saving job:', error)
        console.error('Error response:', error.response?.data)
        console.error('Error status:', error.response?.status)
        toast.add({
          severity: 'error',
          summary: t('common.error'),
          detail: error.response?.data?.error || 'Impossible de sauvegarder l\'offre d\'emploi. Vérifiez que le serveur est démarré (npm run server)',
          life: 5000
        })
      }
    }

    const confirmDelete = (job) => {
      confirm.require({
        message: t('backoffice.jobs.deleteConfirm', { title: job.title }),
        header: t('backoffice.jobs.deleteTitle'),
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        accept: async () => {
          try {
            await apiClient.delete(`/jobs/${job.id}`)
            toast.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Offre d\'emploi supprimée avec succès',
              life: 3000
            })
            await fetchJobs()
          } catch (error) {
            console.error('Error deleting job:', error)
            toast.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Impossible de supprimer l\'offre d\'emploi',
              life: 3000
            })
          }
        }
      })
    }

    const formatContractType = (type) => {
      const types = {
        'regie': t('jobs.contractTypes.regie'),
        'tjm': t('jobs.contractTypes.tjm'),
        'package': t('jobs.contractTypes.package')
      }
      return types[type] || type
    }

    const formatDate = (date) => {
      if (!date) return ''
      return new Date(date).toLocaleDateString('fr-FR')
    }

    onMounted(() => {
      fetchJobs()
    })

    return {
      jobs,
      loading,
      showDialog,
      editingJob,
      jobForm,
      requirementsText,
      responsibilitiesText,
      benefitsText,
      sectorOptions,
      contractTypeOptions,
      openJobDialog,
      closeDialog,
      saveJob,
      confirmDelete,
      formatContractType,
      formatDate,
      currentLanguage,
      languageOptions,
      loadLanguageData,
      themeStore
    }
  }
}
</script>

<style scoped>
/* Dialog styles */
:deep(.p-dialog) {
  background: rgba(30, 30, 40, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

:deep(.p-dialog-header) {
  background: rgba(255, 255, 255, 0.05) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: white !important;
}

:deep(.p-dialog-title) {
  color: white !important;
}

:deep(.p-dialog-content) {
  background: transparent !important;
  color: white !important;
}

:deep(.p-dialog-footer) {
  background: rgba(255, 255, 255, 0.05) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
}

:deep(.p-dialog-header-icon) {
  color: rgba(255, 255, 255, 0.7) !important;
}

:deep(.p-dialog-header-icon:hover) {
  color: white !important;
  background: rgba(255, 255, 255, 0.1) !important;
}

/* Ensure all form fields in dialog have the custom style */
:deep(.p-inputtext),
:deep(.p-inputtextarea),
:deep(.p-select),
:deep(.p-inputnumber-input) {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  backdrop-filter: blur(10px);
}

:deep(.p-inputtext:focus),
:deep(.p-inputtextarea:focus),
:deep(.p-select:focus),
:deep(.p-inputnumber-input:focus) {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(96, 165, 250, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(96, 165, 250, 0.25) !important;
}

:deep(.p-inputtext::placeholder),
:deep(.p-inputtextarea::placeholder) {
  color: rgba(255, 255, 255, 0.5) !important;
}

:deep(.p-select-label),
:deep(.p-placeholder) {
  color: rgba(255, 255, 255, 0.7) !important;
}

:deep(.p-select-overlay),
:deep(.p-multiselect-overlay) {
  background: rgba(30, 30, 40, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

:deep(.p-select-item),
:deep(.p-multiselect-item) {
  color: white !important;
}

:deep(.p-select-item:hover),
:deep(.p-multiselect-item:hover) {
  background: rgba(255, 255, 255, 0.1) !important;
}

:deep(.p-select-item.p-highlight),
:deep(.p-multiselect-item.p-highlight) {
  background: rgba(96, 165, 250, 0.3) !important;
  color: white !important;
}
</style>

