<template>
  <div
    class="min-h-screen overflow-x-hidden relative transition-colors duration-300"
    :class="themeStore.isDark
      ? 'text-white bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50'
      : 'text-gray-900 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50'"
  >
    <BackgroundEffects/>

    <div class="relative z-10 py-20 px-6 md:px-12 lg:px-24">
      <div class="max-w-7xl mx-auto text-center">
        <h1
          class="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent transition-all"
          :class="themeStore.isDark
            ? 'bg-gradient-to-r from-white via-blue-200 to-purple-200'
            : 'bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700'"
        >
          {{ $t('contact.title') }}
        </h1>
        <p
          class="text-xl max-w-2xl mx-auto transition-colors"
          :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
        >
          {{ $t('contact.subtitle') }}
        </p>
      </div>
    </div>

    <div class="relative z-10 py-12 px-6 md:px-12 lg:px-24 pb-24">
      <div class="max-w-2xl mx-auto">
        <!-- Success message -->
        <div
          v-if="successMessage"
          class="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300"
        >
          {{ successMessage }}
        </div>
        <!-- Error message -->
        <div
          v-if="errorMessage"
          class="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300"
        >
          {{ errorMessage }}
        </div>

        <div
          class="p-8 md:p-10 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark
            ? 'bg-white/5 border border-white/10'
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <form @submit.prevent="submitContact" class="space-y-6">
            <div>
              <label for="contact-name" class="block text-sm font-medium mb-2 transition-colors" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">
                {{ $t('contact.name') }}
              </label>
              <InputText
                id="contact-name"
                v-model="form.name"
                :placeholder="$t('contact.namePlaceholder')"
                class="w-full"
                required
              />
            </div>
            <div>
              <label for="contact-email" class="block text-sm font-medium mb-2 transition-colors" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">
                {{ $t('contact.email') }}
              </label>
              <InputText
                id="contact-email"
                v-model="form.email"
                type="email"
                :placeholder="$t('contact.emailPlaceholder')"
                class="w-full"
                required
              />
            </div>
            <div>
              <label for="contact-subject" class="block text-sm font-medium mb-2 transition-colors" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">
                {{ $t('contact.subject') }}
              </label>
              <InputText
                id="contact-subject"
                v-model="form.subject"
                :placeholder="$t('contact.subjectPlaceholder')"
                class="w-full"
                required
              />
            </div>
            <div>
              <label for="contact-message" class="block text-sm font-medium mb-2 transition-colors" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">
                {{ $t('contact.message') }}
              </label>
              <Textarea
                id="contact-message"
                v-model="form.message"
                :placeholder="$t('contact.messagePlaceholder')"
                rows="6"
                class="w-full"
                required
              />
            </div>
            <div>
              <p class="block text-sm font-medium mb-2 transition-colors" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">
                {{ $t('captcha.label') }}
              </p>
              <TurnstileWidget
                ref="turnstileRef"
                :theme="themeStore.isDark ? 'dark' : 'light'"
                @update:token="captchaToken = $event"
              />
            </div>
            <div class="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="submit"
                :label="$t('contact.send')"
                icon="pi pi-send"
                :disabled="sending || (captchaRequired && !captchaToken)"
                :loading="sending"
                class="flex-1 sm:min-w-[160px] bg-blue-600 border-0 hover:bg-blue-700 transition-all"
              />
              <Button
                type="button"
                :label="$t('common.cancel')"
                severity="secondary"
                outlined
                class="flex-1 sm:min-w-[120px]"
                @click="resetForm"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import BackgroundEffects from '@/components/BackgroundEffects.vue'
import TurnstileWidget from '@/components/TurnstileWidget.vue'
import { useThemeStore } from '@/stores/theme.js'
import { API_BASE_URL } from '@/config/api.js'

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || ''

export default {
  name: 'Contact',
  components: { BackgroundEffects, InputText, Textarea, Button, TurnstileWidget },
  setup() {
    const { t } = useI18n()
    const themeStore = useThemeStore()
    const turnstileRef = ref(null)
    const captchaToken = ref('')
    const captchaRequired = computed(() => !!TURNSTILE_SITE_KEY)
    const sending = ref(false)
    const successMessage = ref('')
    const errorMessage = ref('')
    const form = reactive({
      name: '',
      email: '',
      subject: '',
      message: ''
    })

    async function submitContact() {
      sending.value = true
      successMessage.value = ''
      errorMessage.value = ''

      try {
        const res = await fetch(`${API_BASE_URL}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message
          })
        })

        if (!res.ok) {
          throw new Error('Request failed')
        }

        successMessage.value = t('contact.success')
        resetForm()
      } catch {
        errorMessage.value = t('contact.error')
      } finally {
        sending.value = false
      }
    }

    function resetForm() {
      form.name = ''
      form.email = ''
      form.subject = ''
      form.message = ''
      captchaToken.value = ''
      turnstileRef.value?.reset?.()
    }

    return { themeStore, form, submitContact, resetForm, turnstileRef, captchaToken, captchaRequired, sending, successMessage, errorMessage }
  }
}
</script>
