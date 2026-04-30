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
          {{ $t('whoWeAre.title') }}
        </h1>
        <p
          class="text-xl max-w-3xl mx-auto transition-colors"
          :class="themeStore.isDark ? 'text-blue-200' : 'text-blue-700'"
        >
          {{ $t('whoWeAre.tagline') }}
        </p>
      </div>
    </div>

    <div class="relative z-10 py-12 px-6 md:px-12 lg:px-24 pb-24">
      <div class="max-w-4xl mx-auto space-y-8">
        <!-- Notre Histoire -->
        <section 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <h2 
            class="text-2xl font-semibold mb-6 flex items-center gap-3 transition-colors"
            :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
          >
            <i class="pi pi-history text-blue-400 text-2xl" aria-hidden="true"></i>
            {{ $t('whoWeAre.history.title') }}
          </h2>
          <p 
            class="leading-relaxed transition-colors"
            :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
          >
            {{ $t('whoWeAre.history.content') }}
          </p>
        </section>

        <!-- Notre Mission -->
        <section 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <h2 
            class="text-2xl font-semibold mb-6 flex items-center gap-3 transition-colors"
            :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
          >
            <i class="pi pi-bolt text-blue-400 text-2xl" aria-hidden="true"></i>
            {{ $t('whoWeAre.mission.title') }}
          </h2>
          <p 
            class="mb-6 leading-relaxed transition-colors"
            :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
          >
            {{ $t('whoWeAre.mission.intro') }}
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              class="p-6 rounded-xl transition-colors"
              :class="themeStore.isDark 
                ? 'bg-white/5 border border-white/10' 
                : 'bg-white border border-gray-200/50 shadow-md'"
            >
              <h3 
                class="text-lg font-semibold mb-3 transition-colors"
                :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'"
              >
                {{ $t('whoWeAre.mission.talentsTitle') }}
              </h3>
              <p 
                class="text-sm transition-colors"
                :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
              >
                {{ $t('whoWeAre.mission.talentsContent') }}
              </p>
            </div>
            <div 
              class="p-6 rounded-xl transition-colors"
              :class="themeStore.isDark 
                ? 'bg-white/5 border border-white/10' 
                : 'bg-white border border-gray-200/50 shadow-md'"
            >
              <h3 
                class="text-lg font-semibold mb-3 transition-colors"
                :class="themeStore.isDark ? 'text-purple-400' : 'text-purple-600'"
              >
                {{ $t('whoWeAre.mission.clientsTitle') }}
              </h3>
              <p 
                class="text-sm transition-colors"
                :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
              >
                {{ $t('whoWeAre.mission.clientsContent') }}
              </p>
            </div>
          </div>
        </section>

        <!-- L'ADN TPS -->
        <section 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <h2 
            class="text-2xl font-semibold mb-6 flex items-center gap-3 transition-colors"
            :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
          >
            <i class="pi pi-star text-blue-400 text-2xl" aria-hidden="true"></i>
            {{ $t('whoWeAre.dna.title') }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              v-for="(item, index) in dnaItems" 
              :key="index"
              class="p-6 rounded-xl transition-colors text-center"
              :class="themeStore.isDark 
                ? 'bg-white/5 border border-white/10' 
                : 'bg-white border border-gray-200/50 shadow-md'"
            >
              <h3 
                class="font-semibold mb-3 transition-colors"
                :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'"
              >
                {{ $t(item.titleKey) }}
              </h3>
              <p 
                class="text-sm transition-colors"
                :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
              >
                {{ $t(item.descKey) }}
              </p>
            </div>
          </div>
          <p 
            class="mt-6 text-center font-medium transition-colors"
            :class="themeStore.isDark ? 'text-white/90' : 'text-gray-800'"
          >
            {{ $t('whoWeAre.dna.tagline') }}
          </p>
        </section>

        <!-- Organigramme -->
        <section 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <h2 
            class="text-2xl font-semibold mb-6 flex items-center gap-3 transition-colors"
            :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
          >
            <i class="pi pi-sitemap text-blue-400 text-2xl" aria-hidden="true"></i>
            {{ $t('whoWeAre.orgchart.title') }}
          </h2>
          <div class="space-y-4">
            <div
              class="p-4 rounded-xl transition-colors text-center"
              :class="themeStore.isDark ? 'bg-blue-500/20 border border-blue-400/30' : 'bg-blue-50 border border-blue-200'"
            >
              <div class="font-semibold" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">Wadie DARDOURI</div>
              <div class="text-sm" :class="themeStore.isDark ? 'text-blue-200' : 'text-blue-700'">{{ $t('whoWeAre.orgchart.president') }}</div>
            </div>
            <div
              class="p-4 rounded-xl transition-colors text-center"
              :class="themeStore.isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'"
            >
              <div class="font-semibold" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">Adel ABDELHANINE</div>
              <div class="text-sm" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">{{ $t('whoWeAre.orgchart.director') }}</div>
            </div>
            <div
              class="p-4 rounded-xl transition-colors text-center"
              :class="themeStore.isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'"
            >
              <div class="font-semibold" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">Sarah THIMOTHÉ</div>
              <div class="text-sm" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">{{ $t('whoWeAre.orgchart.activities') }}</div>
            </div>
            <div
              class="p-4 rounded-xl transition-colors text-center"
              :class="themeStore.isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'"
            >
              <div class="font-semibold" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">Taissir BAYOU</div>
              <div class="text-sm" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">{{ $t('whoWeAre.orgchart.rhManager') }}</div>
            </div>
          </div>
        </section>

        <!-- Certifications & labels -->
        <section
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark
            ? 'bg-white/5 border border-white/10'
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <h2
            class="text-2xl font-semibold mb-6 flex items-center gap-3 transition-colors"
            :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
          >
            <i class="pi pi-verified text-blue-400 text-2xl" aria-hidden="true"></i>
            {{ $t('whoWeAre.certifications.title') }}
          </h2>
          <p
            class="leading-relaxed mb-8 transition-colors"
            :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
          >
            {{ $t('whoWeAre.certifications.content') }}
          </p>

          <!-- Certifications Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              v-for="cert in certifications"
              :key="cert.name"
              class="group p-4 rounded-xl text-center transition-all hover:scale-105"
              :class="themeStore.isDark
                ? 'bg-white/5 border border-white/10 hover:border-white/30'
                : 'bg-white border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md'"
            >
              <div
                class="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center transition-colors"
                :class="themeStore.isDark ? 'bg-blue-500/20' : 'bg-blue-50'"
              >
                <i
                  :class="cert.icon"
                  class="text-2xl"
                  :style="{ color: cert.color }"
                ></i>
              </div>
              <h4
                class="font-semibold text-sm mb-1 transition-colors"
                :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
              >
                {{ cert.name }}
              </h4>
              <p
                class="text-xs transition-colors"
                :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'"
              >
                {{ cert.description }}
              </p>
            </div>
          </div>

          <!-- Note about upcoming certifications -->
          <div
            class="mt-6 p-4 rounded-lg flex items-start gap-3"
            :class="themeStore.isDark ? 'bg-blue-500/10 border border-blue-400/20' : 'bg-blue-50 border border-blue-200'"
          >
            <i class="pi pi-info-circle text-blue-400 mt-0.5"></i>
            <p
              class="text-sm transition-colors"
              :class="themeStore.isDark ? 'text-blue-200' : 'text-blue-700'"
            >
              {{ $t('whoWeAre.certifications.note') }}
            </p>
          </div>
        </section>

        <!-- Nos Engagements -->
        <section
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark
            ? 'bg-white/5 border border-white/10'
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <h2
            class="text-2xl font-semibold mb-6 flex items-center gap-3 transition-colors"
            :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
          >
            <i class="pi pi-heart text-blue-400 text-2xl" aria-hidden="true"></i>
            {{ $t('commitments.title') }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="item in commitmentItems"
              :key="item.titleKey"
              class="p-6 rounded-xl transition-colors"
              :class="themeStore.isDark
                ? 'bg-white/5 border border-white/10'
                : 'bg-white border border-gray-200/50 shadow-md'"
            >
              <div class="flex items-center gap-3 mb-3">
                <i :class="item.icon" class="text-lg" :style="{ color: item.color }"></i>
                <h3
                  class="font-semibold transition-colors"
                  :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
                >
                  {{ $t(item.titleKey) }}
                </h3>
              </div>
              <p
                class="text-sm leading-relaxed transition-colors"
                :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
              >
                {{ $t(item.contentKey) }}
              </p>
            </div>
          </div>
        </section>

        <!-- Nos Partenaires -->
        <section
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark
            ? 'bg-white/5 border border-white/10'
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <h2
            class="text-2xl font-semibold mb-6 flex items-center gap-3 transition-colors"
            :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
          >
            <i class="pi pi-handshake text-blue-400 text-2xl" aria-hidden="true"></i>
            {{ $t('whoWeAre.partners.title') }}
          </h2>
          <p
            class="leading-relaxed mb-8 transition-colors"
            :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
          >
            {{ $t('whoWeAre.partners.content') }}
          </p>
          <Carousel
            :value="partners"
            :numVisible="4"
            :numScroll="1"
            :responsiveOptions="partnersResponsiveOptions"
            :circular="true"
            :autoplayInterval="3000"
            :showIndicators="false"
            class="partners-carousel"
          >
            <template #item="slotProps">
              <div class="px-3">
                <div
                  class="h-32 rounded-xl flex flex-col items-center justify-center transition-all hover:scale-105"
                  :class="themeStore.isDark
                    ? 'bg-white/5 border border-white/10 hover:border-white/30'
                    : 'bg-white border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md'"
                >
                  <img
                    v-if="slotProps.data.logo"
                    :src="slotProps.data.logo"
                    :alt="slotProps.data.name"
                    class="max-h-16 max-w-[80%] object-contain"
                  />
                  <template v-else>
                    <i
                      class="pi pi-image text-4xl mb-2"
                      :class="themeStore.isDark ? 'text-white/30' : 'text-gray-300'"
                    ></i>
                    <span
                      class="text-sm font-medium"
                      :class="themeStore.isDark ? 'text-white/50' : 'text-gray-400'"
                    >
                      {{ slotProps.data.name }}
                    </span>
                  </template>
                </div>
              </div>
            </template>
          </Carousel>
        </section>

        <!-- CTA -->
        <section 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors text-center"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <p 
            class="text-xl font-semibold mb-6 transition-colors"
            :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
          >
            {{ $t('whoWeAre.cta.title') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink to="/contact">
              <Button 
                :label="$t('whoWeAre.cta.projects')" 
                severity="contrast" 
                class="min-w-[200px] bg-gradient-to-r from-blue-500 to-purple-600 border-0"
                icon="pi pi-envelope"
              />
            </RouterLink>
            <RouterLink to="/jobs">
              <Button 
                :label="$t('whoWeAre.cta.join')" 
                severity="secondary" 
                outlined
                class="min-w-[200px]"
                :class="themeStore.isDark ? 'border-white/30 text-white' : 'border-gray-800/30 text-gray-900'"
                icon="pi pi-briefcase"
              />
            </RouterLink>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundEffects from '@/components/BackgroundEffects.vue'
import Button from 'primevue/button'
import { useThemeStore } from '@/stores/theme.js'
export default {
  name: 'About',
  components: {
    BackgroundEffects,
    Button
  },
  setup() {
    const themeStore = useThemeStore()
    const dnaItems = [
      { titleKey: 'whoWeAre.dna.reactivityTitle', descKey: 'whoWeAre.dna.reactivityDesc' },
      { titleKey: 'whoWeAre.dna.precisionTitle', descKey: 'whoWeAre.dna.precisionDesc' },
      { titleKey: 'whoWeAre.dna.partnershipTitle', descKey: 'whoWeAre.dna.partnershipDesc' }
    ]

    const certifications = [
      {
        name: 'Habilitations Électriques',
        description: 'H0B0, H1V, H2V',
        icon: 'pi pi-bolt',
        color: '#f59e0b'
      },
      {
        name: 'CACES',
        description: 'Nacelles & Engins',
        icon: 'pi pi-car',
        color: '#10b981'
      },
      {
        name: 'Travail en Hauteur',
        description: 'Formation certifiée',
        icon: 'pi pi-arrow-up',
        color: '#3b82f6'
      },
      {
        name: 'AIPR',
        description: 'Intervention réseaux',
        icon: 'pi pi-map-marker',
        color: '#8b5cf6'
      }
    ]

    const commitmentItems = [
      { titleKey: 'commitments.environment.title', contentKey: 'commitments.environment.content', icon: 'pi pi-globe', color: '#22c55e' },
      { titleKey: 'commitments.hse.title', contentKey: 'commitments.hse.content', icon: 'pi pi-shield', color: '#f59e0b' },
      { titleKey: 'commitments.equality.title', contentKey: 'commitments.equality.content', icon: 'pi pi-users', color: '#8b5cf6' },
      { titleKey: 'commitments.rse.title', contentKey: 'commitments.rse.content', icon: 'pi pi-heart', color: '#ef4444' }
    ]

    const partners = [
      { name: 'Partenaire 1', logo: null },
      { name: 'Partenaire 2', logo: null },
      { name: 'Partenaire 3', logo: null },
      { name: 'Partenaire 4', logo: null },
      { name: 'Partenaire 5', logo: null },
      { name: 'Partenaire 6', logo: null },
      { name: 'Partenaire 7', logo: null },
      { name: 'Partenaire 8', logo: null }
    ]

    const partnersResponsiveOptions = [
      { breakpoint: '1400px', numVisible: 4, numScroll: 1 },
      { breakpoint: '992px', numVisible: 3, numScroll: 1 },
      { breakpoint: '768px', numVisible: 2, numScroll: 1 },
      { breakpoint: '576px', numVisible: 1, numScroll: 1 }
    ]

    return { themeStore, dnaItems, certifications, commitmentItems, partners, partnersResponsiveOptions }
  }
}
</script>

<style scoped>
.partners-carousel :deep(.p-carousel-indicators) {
  display: none;
}
</style>
