<template>
  <div class="min-h-screen text-white overflow-x-hidden relative bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50">
    <BackgroundEffects/>
    
    <div class="relative z-10 py-12 px-6 md:px-12 lg:px-24">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              {{ $t('backoffice.jobs.title') }}
            </h1>
            <p class="text-white/70">{{ $t('backoffice.jobs.subtitle') }}</p>
          </div>
          <div class="flex gap-3">
            <Button 
              :label="$t('common.back')" 
              icon="pi pi-arrow-left" 
              severity="secondary" 
              outlined
              class="border-white/30 text-white hover:bg-white/10 transition-all"
              @click="$router.push({ name: 'backoffice-dashboard' })"
            />
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
          <p class="mt-4 text-white/70">{{ $t('common.loading') }}</p>
        </div>

        <div v-else-if="jobs.length === 0" class="text-center py-20 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <div class="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="pi pi-inbox text-4xl text-blue-400/50"></i>
          </div>
          <p class="text-xl text-white/70 mb-4">{{ $t('backoffice.jobs.noJobs') }}</p>
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
            class="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 transition-all"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-xl font-semibold mb-2">{{ job.title }}</h3>
                <div class="flex flex-wrap gap-2 mb-3">
                  <Tag :value="job.sector === 'telecom' ? $t('jobs.sectors.telecom') : $t('jobs.sectors.btp')" severity="info" class="text-xs"/>
                  <Tag :value="job.location" severity="secondary" class="text-xs"/>
                  <Tag :value="formatContractType(job.contractType)" severity="success" class="text-xs"/>
                </div>
                <p class="text-white/70 line-clamp-2 mb-3">{{ job.description }}</p>
                <span class="text-sm text-white/60">
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
                  class="border-white/30 text-white hover:bg-white/10"
                  @click="openJobDialog(job)"
                  :v-tooltip.top="$t('common.edit')"
                />
                <Button 
                  icon="pi pi-trash" 
                  severity="danger" 
                  outlined
                  rounded
                  class="border-red-400/30 text-red-400 hover:bg-red-400/10"
                  @click="confirmDelete(job)"
                  :v-tooltip.top="$t('common.delete')"
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
      <form @submit.prevent="saveJob" class="space-y-6">
        <div>
          <label class="block text-sm font-medium mb-2">{{ $t('backoffice.jobs.form.language') }} *</label>
          <Select 
            v-model="currentLanguage" 
            :options="languageOptions" 
            optionLabel="label"
            optionValue="value"
            class="w-full"
            @change="loadLanguageData"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2">{{ $t('backoffice.jobs.form.title') }} *</label>
          <InputText v-model="jobForm.translations[currentLanguage].title" required class="w-full" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">{{ $t('backoffice.jobs.form.sector') }} *</label>
            <Select 
              v-model="jobForm.sector" 
              :options="sectorOptions" 
              required
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">{{ $t('backoffice.jobs.form.location') }} *</label>
            <InputText v-model="jobForm.location" required class="w-full" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">{{ $t('backoffice.jobs.form.contractType') }} *</label>
            <Select 
              v-model="jobForm.contractType" 
              :options="contractTypeOptions" 
              required
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">{{ $t('backoffice.jobs.form.tjm') }}</label>
            <InputNumber v-model="jobForm.tjm" :min="0" class="w-full" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">{{ $t('backoffice.jobs.form.description') }} *</label>
          <Textarea v-model="jobForm.translations[currentLanguage].description" rows="5" required class="w-full" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">{{ $t('backoffice.jobs.form.requirements') }}</label>
          <Textarea 
            v-model="requirementsText" 
            rows="4" 
            :placeholder="$t('backoffice.jobs.form.requirementsPlaceholder')"
            class="w-full" 
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">{{ $t('backoffice.jobs.form.responsibilities') }}</label>
          <Textarea 
            v-model="responsibilitiesText" 
            rows="4" 
            :placeholder="$t('backoffice.jobs.form.responsibilitiesPlaceholder')"
            class="w-full" 
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">{{ $t('backoffice.jobs.form.benefits') }}</label>
          <Textarea 
            v-model="benefitsText" 
            rows="4" 
            :placeholder="$t('backoffice.jobs.form.benefitsPlaceholder')"
            class="w-full" 
          />
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <Button 
            :label="$t('common.cancel')" 
            severity="secondary" 
            outlined
            @click="closeDialog"
          />
          <Button 
            :label="editingJob ? $t('backoffice.jobs.form.update') : $t('backoffice.jobs.form.create')" 
            type="submit"
            severity="contrast"
            class="bg-gradient-to-r from-blue-500 to-purple-600 border-0"
          />
        </div>
      </form>
    </Dialog>

    <!-- Delete Confirmation -->
    <ConfirmDialog />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import axios from 'axios'
import BackgroundEffects from '@/components/BackgroundEffects.vue'

const apiBaseURL = 'http://localhost:3000/api'

export default {
  name: 'JobsManagement',
  components: {
    BackgroundEffects
  },
  setup() {
    const { t } = useI18n()
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
        const response = await axios.get(`${apiBaseURL}/jobs`)
        jobs.value = response.data
      } catch (error) {
        console.error('Error fetching jobs:', error)
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les offres d\'emploi',
          life: 3000
        })
      } finally {
        loading.value = false
      }
    }

    const openJobDialog = (job) => {
      if (job) {
        editingJob.value = job
        // Migrate old format to new format if needed
        if (job.translations) {
          jobForm.value = {
            sector: job.sector?.value || job.sector || null,
            location: job.location || '',
            contractType: job.contractType?.value || job.contractType || null,
            tjm: job.tjm || null,
            translations: job.translations || initTranslations()
          }
        } else {
          // Old format - migrate to new format
          jobForm.value = {
            sector: job.sector?.value || job.sector || null,
            location: job.location || '',
            contractType: job.contractType?.value || job.contractType || null,
            tjm: job.tjm || null,
            translations: {
              fr: {
                title: job.title || '',
                description: job.description || '',
                requirements: job.requirements || [],
                responsibilities: job.responsibilities || [],
                benefits: job.benefits || []
              },
              en: initTranslations().en
            }
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
        const jobData = {
          ...jobForm.value,
          sector: typeof jobForm.value.sector === 'string' ? jobForm.value.sector : jobForm.value.sector?.value || jobForm.value.sector,
          contractType: typeof jobForm.value.contractType === 'string' ? jobForm.value.contractType : jobForm.value.contractType?.value || jobForm.value.contractType
        }
        
        if (editingJob.value) {
          await axios.put(`${apiBaseURL}/jobs/${editingJob.value.id}`, jobData)
          toast.add({
            severity: 'success',
            summary: t('common.save'),
            detail: t('backoffice.jobs.form.update') + ' ' + t('common.save'),
            life: 3000
          })
        } else {
          await axios.post(`${apiBaseURL}/jobs`, jobData)
          toast.add({
            severity: 'success',
            summary: t('common.save'),
            detail: t('backoffice.jobs.form.create') + ' ' + t('common.save'),
            life: 3000
          })
        }
        closeDialog()
        await fetchJobs()
      } catch (error) {
        console.error('Error saving job:', error)
        toast.add({
          severity: 'error',
          summary: t('common.error'),
          detail: 'Impossible de sauvegarder l\'offre d\'emploi',
          life: 3000
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
            await axios.delete(`${apiBaseURL}/jobs/${job.id}`)
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
      loadLanguageData
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

