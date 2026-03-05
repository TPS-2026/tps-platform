<template>
  <div
    class="min-h-screen overflow-x-hidden relative transition-colors duration-300"
    :class="themeStore.isDark
      ? 'text-white bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50'
      : 'text-gray-900 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50'"
  >
    <BackgroundEffects/>

    <!-- Hero Section -->
    <div class="relative z-10 py-16 px-6 md:px-12 lg:px-24">
      <div class="max-w-2xl mx-auto">
        <Button
          label="Retour"
          icon="pi pi-arrow-left"
          severity="secondary"
          outlined
          :class="themeStore.isDark
            ? 'border-white/30 text-white hover:bg-white/10'
            : 'border-gray-300 text-gray-700 hover:bg-gray-100'"
          class="transition-all"
          @click="$router.back()"
        />
      </div>
    </div>

    <div class="relative z-10 py-12 px-6 md:px-12 lg:px-24">
      <div class="max-w-2xl mx-auto">
        <div
          class="p-8 backdrop-blur-sm rounded-2xl border transition-colors"
          :class="themeStore.isDark
            ? 'bg-white/5 border-white/10'
            : 'bg-white/90 border-gray-200 shadow-lg'"
        >
          <div class="flex items-center gap-3 mb-6">
            <i class="pi pi-send text-blue-400 text-2xl"></i>
            <span
              class="text-2xl font-semibold"
              :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
            >Postuler à l'offre</span>
          </div>

          <div
            v-if="job"
            class="mb-8 p-6 rounded-xl border transition-colors"
            :class="themeStore.isDark
              ? 'bg-white/5 border-white/10'
              : 'bg-gray-50 border-gray-200'"
          >
            <h3
              class="font-semibold mb-3 text-lg"
              :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
            >{{ job.title }}</h3>
            <div class="flex flex-wrap gap-2">
              <Tag :value="job.sector === 'telecom' ? 'Télécoms Fibre' : 'BTP'" severity="info"/>
              <Tag :value="job.location" severity="secondary"/>
            </div>
          </div>

          <!-- Quick Apply Options -->
          <div
            class="mb-8 p-4 rounded-xl border transition-colors"
            :class="themeStore.isDark
              ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-white/10'
              : 'bg-gradient-to-r from-blue-50 to-purple-50 border-gray-200'"
          >
            <p
              class="text-sm mb-3 text-center"
              :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
            >Candidature rapide</p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                :href="linkedInApplyUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white font-medium rounded-lg transition-all hover:scale-105"
              >
                <i class="pi pi-linkedin text-lg"></i>
                Postuler avec LinkedIn
              </a>
              <span
                class="text-sm self-center hidden sm:block"
                :class="themeStore.isDark ? 'text-white/40' : 'text-gray-400'"
              >ou</span>
              <span
                class="text-sm self-center text-center sm:hidden"
                :class="themeStore.isDark ? 'text-white/40' : 'text-gray-400'"
              >ou remplissez le formulaire ci-dessous</span>
            </div>
          </div>

          <div class="relative flex items-center justify-center mb-6">
            <div
              class="flex-grow border-t"
              :class="themeStore.isDark ? 'border-white/20' : 'border-gray-200'"
            ></div>
            <span
              class="mx-4 text-sm"
              :class="themeStore.isDark ? 'text-white/50' : 'text-gray-500'"
            >Formulaire complet</span>
            <div
              class="flex-grow border-t"
              :class="themeStore.isDark ? 'border-white/20' : 'border-gray-200'"
            ></div>
          </div>

          <form @submit.prevent="submitApplication" class="space-y-6">
            <div>
              <label
                class="block text-sm font-medium mb-2"
                :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
              >Nom complet *</label>
              <InputText v-model="form.fullName" required class="w-full"/>
            </div>

            <div>
              <label
                class="block text-sm font-medium mb-2"
                :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
              >Email *</label>
              <InputText v-model="form.email" type="email" required class="w-full"/>
            </div>

            <div>
              <label
                class="block text-sm font-medium mb-2"
                :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
              >Téléphone *</label>
              <InputText v-model="form.phone" required class="w-full"/>
            </div>

            <div>
              <label
                class="block text-sm font-medium mb-2"
                :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
              >CV (PDF) - Optionnel</label>
              <FileUpload
                mode="basic"
                accept="application/pdf"
                :maxFileSize="5000000"
                chooseLabel="Choisir un fichier"
                @select="onFileSelect"
                :disabled="uploadingCV"
                class="w-full"
              />
              <small
                class="block mt-2"
                :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'"
              >Taille max: 5MB - Format PDF uniquement</small>
              <div
                v-if="form.cv"
                class="mt-2 p-3 rounded-lg border flex items-center justify-between transition-colors"
                :class="themeStore.isDark
                  ? 'bg-white/5 border-white/10'
                  : 'bg-gray-50 border-gray-200'"
              >
                <div class="flex items-center gap-3 flex-1">
                  <i class="pi pi-file-pdf text-blue-400"></i>
                  <div class="flex-1">
                    <span
                      class="text-sm block"
                      :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
                    >{{ form.cv.name }}</span>
                    <span
                      class="text-xs"
                      :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'"
                    >{{ formatFileSize(form.cv.size) }}</span>
                  </div>
                  <ProgressSpinner v-if="uploadingCV" size="small" />
                  <i v-else-if="cvUploaded" class="pi pi-check-circle text-green-400"></i>
                </div>
                <Button
                  icon="pi pi-times"
                  severity="secondary"
                  text
                  rounded
                  :class="themeStore.isDark ? 'text-white/60 hover:text-white' : 'text-gray-400 hover:text-gray-600'"
                  @click="removeCV"
                  :disabled="uploadingCV"
                />
              </div>
            </div>

            <div>
              <label
                class="block text-sm font-medium mb-2"
                :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
              >Lettre de motivation</label>
              <Textarea
                v-model="form.coverLetter"
                rows="5"
                class="w-full"
                :class="themeStore.isDark ? 'custom-textarea-dark' : 'custom-textarea-light'"
                placeholder="Décrivez votre motivation et votre expérience..."
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
                >Expérience (années)</label>
                <InputNumber v-model="form.experience" :min="0" class="w-full"/>
              </div>
              <div>
                <label
                  class="block text-sm font-medium mb-2"
                  :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
                >Disponibilité</label>
                <Calendar v-model="form.availability" dateFormat="dd/mm/yy" class="w-full"/>
              </div>
            </div>

            <div>
              <p
                class="block text-sm font-medium mb-2"
                :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
              >Vérification anti-robot</p>
              <TurnstileWidget
                ref="turnstileRef"
                :theme="themeStore.isDark ? 'dark' : 'light'"
                @update:token="captchaToken = $event"
              />
            </div>

            <div
              class="flex gap-4 pt-4 border-t"
              :class="themeStore.isDark ? 'border-white/10' : 'border-gray-200'"
            >
              <Button
                type="submit"
                label="Envoyer la candidature"
                severity="contrast"
                icon="pi pi-send"
                iconPos="right"
                :loading="submitting"
                :disabled="captchaRequired && !captchaToken"
                class="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all text-white"
              />
              <Button
                label="Annuler"
                severity="secondary"
                outlined
                :class="themeStore.isDark
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'"
                class="transition-all"
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
import TurnstileWidget from '@/components/TurnstileWidget.vue'
import { uploadCV, formatFileSize } from '@/services/upload.js'
import { useThemeStore } from '@/stores/theme.js'

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || ''

export default {
  name: 'ApplicationForm',
  components: {
    BackgroundEffects,
    TurnstileWidget
  },
  setup() {
    const jobsStore = useJobsStore()
    const themeStore = useThemeStore()
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
    const uploadingCV = ref(false)
    const cvUploaded = ref(false)
    const cvUrl = ref(null)
    const turnstileRef = ref(null)
    const captchaToken = ref('')
    const captchaRequired = computed(() => !!TURNSTILE_SITE_KEY)

    const job = computed(() => jobsStore.currentJob)

    // LinkedIn Easy Apply URL - opens LinkedIn with job info pre-filled
    const linkedInApplyUrl = computed(() => {
      // LinkedIn company page ID for TPS
      const tpsLinkedInUrl = 'https://fr.linkedin.com/in/talent-power-service-tps-759333214'
      return tpsLinkedInUrl
    })

    const onFileSelect = async (event) => {
      const file = event.files[0]
      if (!file) return

      form.value.cv = file
      cvUploaded.value = false
      cvUrl.value = null

      // Auto-upload CV when selected
      uploadingCV.value = true
      try {
        const result = await uploadCV(file)
        cvUrl.value = result.url
        cvUploaded.value = true

        toast.add({
          severity: 'success',
          summary: 'CV uploadé',
          detail: 'Votre CV a été uploadé avec succès',
          life: 3000
        })
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Erreur d\'upload',
          detail: error.message || 'Impossible d\'uploader le CV',
          life: 5000
        })
        form.value.cv = null
      } finally {
        uploadingCV.value = false
      }
    }

    const removeCV = () => {
      form.value.cv = null
      cvUploaded.value = false
      cvUrl.value = null
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
          cvFileSize: form.value.cv ? parseInt(form.value.cv.size) : null,
          turnstileToken: captchaToken.value || undefined
        }

        // If CV was uploaded, use the S3 URL as filename (backend will handle it)
        if (cvUrl.value) {
          applicationData.cvFileName = cvUrl.value
        }

        await jobsStore.submitApplication(route.params.id, applicationData)

        toast.add({
          severity: 'success',
          summary: 'Candidature envoyée',
          detail: 'Votre candidature a été envoyée avec succès',
          life: 5000
        })
        captchaToken.value = ''
        turnstileRef.value?.reset?.()
        router.push({ name: 'job-board' })
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: error.response?.data?.message || 'Une erreur est survenue lors de l\'envoi de votre candidature',
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
      themeStore,
      job,
      form,
      submitting,
      uploadingCV,
      cvUploaded,
      turnstileRef,
      captchaToken,
      captchaRequired,
      linkedInApplyUrl,
      onFileSelect,
      removeCV,
      submitApplication,
      formatFileSize
    }
  }
}
</script>

<style scoped>
/* Dark mode textarea styles */
.custom-textarea-dark :deep(textarea) {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  backdrop-filter: blur(10px);
}

.custom-textarea-dark :deep(textarea:focus) {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(96, 165, 250, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(96, 165, 250, 0.25) !important;
  outline: none !important;
}

.custom-textarea-dark :deep(textarea::placeholder) {
  color: rgba(255, 255, 255, 0.5) !important;
}

/* Light mode textarea styles */
.custom-textarea-light :deep(textarea) {
  background: white !important;
  border: 1px solid #d1d5db !important;
  color: #1f2937 !important;
}

.custom-textarea-light :deep(textarea:focus) {
  background: white !important;
  border-color: rgba(96, 165, 250, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(96, 165, 250, 0.25) !important;
  outline: none !important;
}

.custom-textarea-light :deep(textarea::placeholder) {
  color: #9ca3af !important;
}
</style>
