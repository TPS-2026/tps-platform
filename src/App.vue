<template>
  <ConfirmDialog group="consent" :draggable="false"></ConfirmDialog>

  <!-- Lien d'évitement pour l'accessibilité (WCAG 2.1) -->
  <a
    href="#main-content"
    class="skip-link absolute -left-[9999px] top-4 z-[100] px-4 py-2 bg-blue-600 text-white rounded-lg focus:left-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#08090A]"
  >
    {{ $t('accessibility.skipToContent') }}
  </a>

  <main 
    id="main-content"
    class="min-h-screen transition-colors duration-300"
    :class="{
      'bg-[#08090A]': themeStore.isDark,
      'bg-gray-50': themeStore.isLight
    }"
    role="main"
  >
    <Header v-if="shouldShowHeader"/>
    <RouterView/>
    <Footer v-if="shouldShowFooter"/>
    <Toast/>
    <ConfirmPopup/>
  </main>
</template>

<script>
import {computed} from "vue";
import {useWindowSize} from "@vueuse/core";
import {useAccountStore} from "@/stores/account.js";
import {useThemeStore} from "@/stores/theme.js";
import {useRoute} from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  data() {
    return {
      setupDone: false
    }
  },
  computed: {
    isMobileDevice() {
      return this.windowSize.width.value < 1024;
    },
    shouldShowHeader() {
      if (!this.route || !this.route.name) {
        return true // Default to showing header if route is not ready
      }
      const hiddenRoutes = [
        'sign-in', 
        'sign-up', 
        'forgot-password', 
        'reset-password',
        'backoffice-dashboard',
        'backoffice-jobs',
        'backoffice-applications',
        'backoffice-news',
        'backoffice-users'
      ]
      // Hide header for backoffice routes or auth routes
      return !hiddenRoutes.includes(this.route.name) && !this.route.name?.startsWith('backoffice')
    },
    shouldShowFooter() {
      if (!this.route || !this.route.name) {
        return true
      }
      const hiddenRoutes = [
        'sign-in',
        'sign-up',
        'forgot-password',
        'reset-password',
        'backoffice-dashboard',
        'backoffice-jobs',
        'backoffice-applications',
        'backoffice-news',
        'backoffice-users'
      ]
      return !hiddenRoutes.includes(this.route.name) && !this.route.name?.startsWith('backoffice')
    }
  },

  components: {
    Header,
    Footer,
  },

  provide() {
    return {
      windowWidth: computed(() => useWindowSize().width.value),
      isPhoneWidth: computed(() => useWindowSize().width.value < 768),
      isMac13Width: computed(() => useWindowSize().width.value < 1440),
      isMac16Width: computed(() => useWindowSize().width.value < 1728),
      isIiyamaWidth: computed(() => useWindowSize().width.value < 1920),
    }
  },

  mounted() {
    this.setupDone = true
  },

  created() {
  },

  setup() {
    const accountStore = useAccountStore()
    const themeStore = useThemeStore()
    const windowSize = useWindowSize()
    const route = useRoute()

    return {
      accountStore,
      themeStore,
      windowSize,
      route
    }
  },

}
</script>

<style>
@import "tailwindcss";
@import "tailwindcss-primeui";

@theme {
  --breakpoint-phone: 768px;
  --breakpoint-mac13: 1440px;
  --breakpoint-mac16: 1728px;
  --breakpoint-iiyama: 1920px;
  --breakpoint-benq: 3008px;
}

@utility text-primary {
  color: var(--p-primary);
}

@utility text-primary-emphasis {
  color: var(--p-primary-600);
  @variant dark {
    color: var(--p-primary-300);
  }
}

html {
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  font-size: 14px;
  scroll-behavior: smooth;
}

* {
  box-sizing: border-box;
}

body {
  overflow-x: hidden;
}

/* Dark mode styles */
.dark .p-multiselect, .dark .p-select, .dark .p-datepicker {
  background-color: transparent !important;
  border-color: #3E3E44 !important;
}

.dark .p-multiselect-overlay, .dark .p-select-overlay, .dark .p-multiselect-overlay .p-inputtext, .dark .p-select-overlay .p-inputtext, .dark .p-multiselect-open, .dark .p-select-open {
  background-color: #393A3B !important;
}

.dark .p-multiselect-overlay .p-checkbox-box, .dark .p-select-overlay .p-checkbox-box {
  background: #616162;
}

.dark .p-checkbox-box {
  background-color: #393A3B;
  border-color: transparent;
}

.dark .p-checkbox-box .p-icon {
  color: #fff;
}

.dark .p-multiselect-overlay .p-inputtext , .dark .p-select-overlay .p-inputtext {
  border-color:  #616162;
}

/* Light mode styles */
.light .p-multiselect, .light .p-select, .light .p-datepicker {
  background-color: transparent !important;
  border-color: #d1d5db !important;
}

.light .p-multiselect-overlay, .light .p-select-overlay, .light .p-multiselect-overlay .p-inputtext, .light .p-select-overlay .p-inputtext, .light .p-multiselect-open, .light .p-select-open {
  background-color: #ffffff !important;
  border-color: #e5e7eb !important;
}

.light .p-multiselect-overlay .p-checkbox-box, .light .p-select-overlay .p-checkbox-box {
  background: #f3f4f6;
}

.light .p-checkbox-box {
  background-color: #ffffff;
  border-color: #d1d5db;
}

.light .p-checkbox-box .p-icon {
  color: #1f2937;
}

.light .p-multiselect-overlay .p-inputtext , .light .p-select-overlay .p-inputtext {
  border-color:  #d1d5db;
}

/* Custom input styles - Dark mode */
.dark .p-inputtext:not(.p-disabled) {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  backdrop-filter: blur(10px);
}

.dark .p-inputtext:not(.p-disabled):focus {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(96, 165, 250, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(96, 165, 250, 0.25) !important;
}

.dark .p-inputtext::placeholder {
  color: rgba(255, 255, 255, 0.5) !important;
}

/* Custom input styles - Light mode */
.light .p-inputtext:not(.p-disabled) {
  background: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  color: #1f2937 !important;
  backdrop-filter: blur(10px);
}

.light .p-inputtext:not(.p-disabled):focus {
  background: rgba(255, 255, 255, 1) !important;
  border-color: rgba(99, 102, 241, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25) !important;
}

.light .p-inputtext::placeholder {
  color: rgba(0, 0, 0, 0.5) !important;
}

.dark .p-select:not(.p-disabled),
.dark .p-select .p-inputtext:not(.p-disabled) {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  backdrop-filter: blur(10px);
}

.dark .p-select:not(.p-disabled):focus,
.dark .p-select .p-inputtext:not(.p-disabled):focus {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(96, 165, 250, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(96, 165, 250, 0.25) !important;
}

.light .p-select:not(.p-disabled),
.light .p-select .p-inputtext:not(.p-disabled) {
  background: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  color: #1f2937 !important;
  backdrop-filter: blur(10px);
}

.light .p-select:not(.p-disabled):focus,
.light .p-select .p-inputtext:not(.p-disabled):focus {
  background: rgba(255, 255, 255, 1) !important;
  border-color: rgba(99, 102, 241, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25) !important;
}

.dark .p-select-label,
.dark .p-select .p-placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}

.light .p-select-label,
.light .p-select .p-placeholder {
  color: rgba(0, 0, 0, 0.7) !important;
}

.dark .p-select-overlay,
.dark .p-multiselect-overlay {
  background: rgba(30, 30, 40, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.light .p-select-overlay,
.light .p-multiselect-overlay {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
}

.dark .p-select-item,
.dark .p-multiselect-item {
  color: white !important;
}

.light .p-select-item,
.light .p-multiselect-item {
  color: #1f2937 !important;
}

.dark .p-select-item:hover,
.dark .p-multiselect-item:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

.light .p-select-item:hover,
.light .p-multiselect-item:hover {
  background: rgba(0, 0, 0, 0.05) !important;
}

.dark .p-select-item.p-highlight,
.dark .p-multiselect-item.p-highlight {
  background: rgba(96, 165, 250, 0.3) !important;
  color: white !important;
}

.light .p-select-item.p-highlight,
.light .p-multiselect-item.p-highlight {
  background: rgba(99, 102, 241, 0.1) !important;
  color: #1f2937 !important;
}

/* Textarea styles - Dark mode */
.dark .p-inputtextarea,
.dark textarea.p-inputtextarea,
.dark .p-inputtextarea:not(.p-disabled),
.dark textarea.p-inputtextarea:not(.p-disabled),
.dark .custom-textarea .p-inputtextarea,
.dark .custom-textarea textarea,
.dark .custom-textarea .p-inputtextarea:not(.p-disabled),
.dark .custom-textarea textarea:not(.p-disabled) {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  backdrop-filter: blur(10px);
}

.dark .p-inputtextarea:focus,
.dark textarea.p-inputtextarea:focus,
.dark .p-inputtextarea:not(.p-disabled):focus,
.dark textarea.p-inputtextarea:not(.p-disabled):focus,
.dark .custom-textarea .p-inputtextarea:focus,
.dark .custom-textarea textarea:focus,
.dark .custom-textarea .p-inputtextarea:not(.p-disabled):focus,
.dark .custom-textarea textarea:not(.p-disabled):focus {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(96, 165, 250, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(96, 165, 250, 0.25) !important;
  outline: none !important;
}

.dark .p-inputtextarea::placeholder,
.dark textarea.p-inputtextarea::placeholder,
.dark .custom-textarea .p-inputtextarea::placeholder,
.dark .custom-textarea textarea::placeholder {
  color: rgba(255, 255, 255, 0.5) !important;
}

/* Textarea styles - Light mode */
.light .p-inputtextarea,
.light textarea.p-inputtextarea,
.light .p-inputtextarea:not(.p-disabled),
.light textarea.p-inputtextarea:not(.p-disabled),
.light .custom-textarea .p-inputtextarea,
.light .custom-textarea textarea,
.light .custom-textarea .p-inputtextarea:not(.p-disabled),
.light .custom-textarea textarea:not(.p-disabled) {
  background: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  color: #1f2937 !important;
  backdrop-filter: blur(10px);
}

.light .p-inputtextarea:focus,
.light textarea.p-inputtextarea:focus,
.light .p-inputtextarea:not(.p-disabled):focus,
.light textarea.p-inputtextarea:not(.p-disabled):focus,
.light .custom-textarea .p-inputtextarea:focus,
.light .custom-textarea textarea:focus,
.light .custom-textarea .p-inputtextarea:not(.p-disabled):focus,
.light .custom-textarea textarea:not(.p-disabled):focus {
  background: rgba(255, 255, 255, 1) !important;
  border-color: rgba(99, 102, 241, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25) !important;
  outline: none !important;
}

.light .p-inputtextarea::placeholder,
.light textarea.p-inputtextarea::placeholder,
.light .custom-textarea .p-inputtextarea::placeholder,
.light .custom-textarea textarea::placeholder {
  color: rgba(0, 0, 0, 0.5) !important;
}

/* Target textarea elements directly - Dark mode */
.dark textarea {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  backdrop-filter: blur(10px);
}

.dark textarea:focus {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(96, 165, 250, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(96, 165, 250, 0.25) !important;
  outline: none !important;
}

.dark textarea::placeholder {
  color: rgba(255, 255, 255, 0.5) !important;
}

/* Target textarea elements directly - Light mode */
.light textarea {
  background: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  color: #1f2937 !important;
  backdrop-filter: blur(10px);
}

.light textarea:focus {
  background: rgba(255, 255, 255, 1) !important;
  border-color: rgba(99, 102, 241, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25) !important;
  outline: none !important;
}

.light textarea::placeholder {
  color: rgba(0, 0, 0, 0.5) !important;
}

/* Dialog styles - Dark mode */
.dark .p-dialog {
  background: rgba(30, 30, 40, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
}

.dark .p-dialog-header {
  background: rgba(255, 255, 255, 0.05) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: white !important;
}

.dark .p-dialog-title {
  color: white !important;
}

.dark .p-dialog-content {
  background: transparent !important;
  color: white !important;
}

.dark .p-dialog-footer {
  background: rgba(255, 255, 255, 0.05) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.dark .p-dialog-header-icon {
  color: rgba(255, 255, 255, 0.7) !important;
}

.dark .p-dialog-header-icon:hover {
  color: white !important;
  background: rgba(255, 255, 255, 0.1) !important;
}

/* Dialog styles - Light mode */
.light .p-dialog {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  color: #1f2937 !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
}

.light .p-dialog-header {
  background: rgba(0, 0, 0, 0.02) !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
  color: #1f2937 !important;
}

.light .p-dialog-title {
  color: #1f2937 !important;
}

.light .p-dialog-content {
  background: transparent !important;
  color: #1f2937 !important;
}

.light .p-dialog-footer {
  background: rgba(0, 0, 0, 0.02) !important;
  border-top: 1px solid rgba(0, 0, 0, 0.1) !important;
}

.light .p-dialog-header-icon {
  color: rgba(0, 0, 0, 0.6) !important;
}

.light .p-dialog-header-icon:hover {
  color: #1f2937 !important;
  background: rgba(0, 0, 0, 0.05) !important;
}

</style>

