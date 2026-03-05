<template>
  <div 
    class="min-h-screen overflow-x-hidden relative transition-colors duration-300"
    :class="themeStore.isDark 
      ? 'text-white bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50' 
      : 'text-gray-900 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50'"
  >
    <BackgroundEffects/>
    
    <!-- Hero -->
    <div class="relative z-10 py-20 px-6 md:px-12 lg:px-24">
      <div class="max-w-7xl mx-auto text-center">
        <h1 
          class="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent transition-all"
          :class="themeStore.isDark 
            ? 'bg-gradient-to-r from-white via-blue-200 to-purple-200' 
            : 'bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700'"
        >
          {{ $t('accessibility.title') }}
        </h1>
        <p
          class="text-xl max-w-3xl mx-auto transition-colors"
          :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
        >
          {{ $t('accessibility.subtitle') }}
        </p>
      </div>
    </div>

    <div class="relative z-10 py-12 px-6 md:px-12 lg:px-24 pb-24">
      <div class="max-w-4xl mx-auto space-y-8">
        <!-- État de conformité (obligatoire) -->
        <section 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
          aria-labelledby="conformity-heading"
        >
          <h2 
            id="conformity-heading"
            class="text-2xl font-semibold mb-6 flex items-center gap-3 transition-colors"
            :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
          >
            <i class="pi pi-check-circle text-blue-400 text-2xl" aria-hidden="true"></i>
            {{ $t('accessibility.conformityTitle') }}
          </h2>
          <p 
            class="text-lg leading-relaxed transition-colors"
            :class="themeStore.isDark ? 'text-white/90' : 'text-gray-800'"
          >
            {{ $t('accessibility.conformityStatement') }}
          </p>
          <p 
            class="mt-4 text-sm transition-colors"
            :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
          >
            {{ $t('accessibility.conformityReference') }}
          </p>
        </section>

        <!-- Périmètre -->
        <section 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
          aria-labelledby="scope-heading"
        >
          <h2 
            id="scope-heading"
            class="text-2xl font-semibold mb-6 flex items-center gap-3 transition-colors"
            :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
          >
            <i class="pi pi-globe text-blue-400 text-2xl" aria-hidden="true"></i>
            {{ $t('accessibility.scopeTitle') }}
          </h2>
          <p 
            class="leading-relaxed transition-colors"
            :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
          >
            {{ $t('accessibility.scopeText') }}
          </p>
        </section>

        <!-- Technologies d’accessibilité -->
        <section 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
          aria-labelledby="tech-heading"
        >
          <h2 
            id="tech-heading"
            class="text-2xl font-semibold mb-6 flex items-center gap-3 transition-colors"
            :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
          >
            <i class="pi pi-desktop text-blue-400 text-2xl" aria-hidden="true"></i>
            {{ $t('accessibility.techTitle') }}
          </h2>
          <p 
            class="leading-relaxed transition-colors mb-4"
            :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
          >
            {{ $t('accessibility.techText') }}
          </p>
          <ul 
            class="list-disc list-inside space-y-2 transition-colors"
            :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
          >
            <li>{{ $t('accessibility.techList.html') }}</li>
            <li>{{ $t('accessibility.techList.css') }}</li>
            <li>{{ $t('accessibility.techList.js') }}</li>
          </ul>
        </section>

        <!-- Contenus non accessibles / limites connues -->
        <section 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
          aria-labelledby="limitations-heading"
        >
          <h2 
            id="limitations-heading"
            class="text-2xl font-semibold mb-6 flex items-center gap-3 transition-colors"
            :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
          >
            <i class="pi pi-info-circle text-blue-400 text-2xl" aria-hidden="true"></i>
            {{ $t('accessibility.limitationsTitle') }}
          </h2>
          <p 
            class="leading-relaxed transition-colors mb-4"
            :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
          >
            {{ $t('accessibility.limitationsIntro') }}
          </p>
          <ul 
            class="list-disc list-inside space-y-2 transition-colors"
            :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
          >
            <li>{{ $t('accessibility.limitationsList.carousel') }}</li>
            <li>{{ $t('accessibility.limitationsList.thirdParty') }}</li>
            <li>{{ $t('accessibility.limitationsList.pdf') }}</li>
          </ul>
        </section>

        <!-- Améliorations prévues / audit -->
        <section 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
          aria-labelledby="improvements-heading"
        >
          <h2 
            id="improvements-heading"
            class="text-2xl font-semibold mb-6 flex items-center gap-3 transition-colors"
            :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
          >
            <i class="pi pi-refresh text-blue-400 text-2xl" aria-hidden="true"></i>
            {{ $t('accessibility.improvementsTitle') }}
          </h2>
          <p 
            class="leading-relaxed transition-colors mb-4"
            :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
          >
            {{ $t('accessibility.improvementsText') }}
          </p>
          <ul 
            class="list-disc list-inside space-y-2 transition-colors"
            :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
          >
            <li>{{ $t('accessibility.improvementsList.contrast') }}</li>
            <li>{{ $t('accessibility.improvementsList.focus') }}</li>
            <li>{{ $t('accessibility.improvementsList.labels') }}</li>
            <li>{{ $t('accessibility.improvementsList.structure') }}</li>
          </ul>
        </section>

        <!-- Contact / signalement -->
        <section 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
          aria-labelledby="contact-heading"
        >
          <h2 
            id="contact-heading"
            class="text-2xl font-semibold mb-6 flex items-center gap-3 transition-colors"
            :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
          >
            <i class="pi pi-envelope text-blue-400 text-2xl" aria-hidden="true"></i>
            {{ $t('accessibility.contactTitle') }}
          </h2>
          <p 
            class="leading-relaxed transition-colors mb-4"
            :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
          >
            {{ $t('accessibility.contactText') }}
          </p>
          <p class="transition-colors" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">
            <a 
              href="mailto:contact@tps-platform.com?subject=Accessibilité%20du%20site"
              class="font-medium underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              :class="themeStore.isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'"
            >
              contact@tps-platform.com
            </a>
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { useThemeStore } from '@/stores/theme.js'
import BackgroundEffects from '@/components/BackgroundEffects.vue'

export default {
  name: 'Accessibility',
  components: {
    BackgroundEffects
  },
  setup() {
    const themeStore = useThemeStore()
    return { themeStore }
  }
}
</script>
