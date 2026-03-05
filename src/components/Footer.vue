<template>
  <footer
    class="py-12 px-6 md:px-12 lg:px-24 transition-colors duration-300"
    :class="themeStore.isDark
      ? 'border-t border-white/10 bg-gradient-to-b from-indigo-900/60 to-blue-900/70'
      : 'border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white'"
  >
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <RouterLink to="/" class="flex items-center group">
            <img
              :src="themeStore.isDark ? '/Logo TPS.png' : '/Light Logo TPS.png'"
              alt="TPS Logo"
              class="h-48 w-auto group-hover:scale-105 transition-transform duration-200"
            />
          </RouterLink>
        </div>

        <div>
          <h4
            class="font-semibold mb-4 transition-colors"
            :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
          >{{ $t('landing.footer.navigation') }}</h4>
          <ul
            class="space-y-2 text-sm transition-colors"
            :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
          >
            <li><RouterLink
              to="/jobs"
              class="transition-colors"
              :class="themeStore.isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'"
            >{{ $t('common.jobs') }}</RouterLink></li>
            <li><RouterLink
              to="/services"
              class="transition-colors"
              :class="themeStore.isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'"
            >{{ $t('common.services') }}</RouterLink></li>
            <li><RouterLink
              to="/news"
              class="transition-colors"
              :class="themeStore.isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'"
            >{{ $t('common.news') }}</RouterLink></li>
            <li><RouterLink
              to="/about"
              class="transition-colors"
              :class="themeStore.isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'"
            >{{ $t('common.whoWeAre') }}</RouterLink></li>
            <li><RouterLink
              to="/contact"
              class="transition-colors"
              :class="themeStore.isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'"
            >{{ $t('contact.title') }}</RouterLink></li>
            <li><RouterLink
              to="/clients-partners"
              class="transition-colors"
              :class="themeStore.isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'"
            >{{ $t('common.clientsPartners') }}</RouterLink></li>
            <li><RouterLink
              to="/commitments"
              class="transition-colors"
              :class="themeStore.isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'"
            >{{ $t('common.ourCommitments') }}</RouterLink></li>
            <li><RouterLink
              to="/legal"
              class="transition-colors"
              :class="themeStore.isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'"
            >{{ $t('common.legalNotice') }}</RouterLink></li>
            <li><RouterLink
              to="/accessibility"
              class="transition-colors"
              :class="themeStore.isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'"
            >{{ $t('common.accessibility') }}</RouterLink></li>
            <li><RouterLink
              to="/glossary"
              class="transition-colors"
              :class="themeStore.isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'"
            >{{ $t('common.glossary') }}</RouterLink></li>
            <li><RouterLink
              to="/faq"
              class="transition-colors"
              :class="themeStore.isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'"
            >{{ $t('common.faq') }}</RouterLink></li>
          </ul>
        </div>

        <div>
          <h4
            class="font-semibold mb-4 transition-colors"
            :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
          >{{ $t('landing.footer.sectors') }}</h4>
          <ul
            class="space-y-2 text-sm transition-colors"
            :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
          >
            <li>{{ $t('landing.footer.sectorsList.telecom') }}</li>
            <li>{{ $t('landing.footer.sectorsList.btp') }}</li>
            <li>{{ $t('landing.footer.sectorsList.projectManagement') }}</li>
            <li>{{ $t('landing.footer.sectorsList.engineering') }}</li>
          </ul>
        </div>

        <div>
          <h4
            class="font-semibold mb-4 transition-colors"
            :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
          >{{ $t('landing.footer.contact') }}</h4>
          <ul
            class="space-y-2 text-sm transition-colors"
            :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
          >
            <li class="flex items-center gap-2">
              <i
                class="pi pi-envelope transition-colors"
                :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'"
              ></i>
              <a
                href="mailto:gestion@tpstalent.fr"
                class="hover:underline"
                :class="themeStore.isDark ? 'text-white/60 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'"
              >gestion@tpstalent.fr</a>
            </li>
            <li class="flex items-center gap-2">
              <i
                class="pi pi-phone transition-colors"
                :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'"
              ></i>
              <a
                href="tel:+33184259962"
                class="hover:underline"
                :class="themeStore.isDark ? 'text-white/60 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'"
              >01 84 25 99 62</a>
            </li>
            <li class="flex items-center gap-2">
              <i
                class="pi pi-map-marker transition-colors"
                :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'"
              ></i>
              <span>101 rue Philibert Hoffmann, 93110 Rosny-sous-Bois</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors"
        :class="themeStore.isDark ? 'border-t border-white/10' : 'border-t border-gray-200'"
      >
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm">
          <RouterLink
            to="/accessibility"
            class="transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            :class="themeStore.isDark ? 'text-white/60 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'"
          >
            {{ $t('common.accessibility') }}
          </RouterLink>
          <span
            class="transition-colors"
            :class="themeStore.isDark ? 'text-white/40' : 'text-gray-400'"
            aria-hidden="true"
          >|</span>
          <p
            class="transition-colors"
            :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
          >
            {{ $t('landing.footer.copyright') }}
          </p>
        </div>
        <div class="flex gap-4">
          <a
            href="https://fr.linkedin.com/in/talent-power-service-tps-759333214"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-colors hover:scale-110 inline-block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            :class="themeStore.isDark ? 'text-white/60 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'"
            aria-label="LinkedIn TPS"
          >
            <i class="pi pi-linkedin text-xl" aria-hidden="true"></i>
          </a>
          <a
            href="#"
            class="transition-colors hover:scale-110 inline-block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            :class="themeStore.isDark ? 'text-white/60 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'"
            aria-label="X (Twitter) TPS"
          >
            <i class="pi pi-twitter text-xl" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { useThemeStore } from '@/stores/theme.js'

export default {
  name: 'FooterComponent',
  setup() {
    const themeStore = useThemeStore()
    return { themeStore }
  }
}
</script>
