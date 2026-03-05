<template>
  <header 
    class="sticky top-0 z-50 w-full backdrop-blur-xl transition-all border-b"
    :class="{
      'border-white/10 bg-gradient-to-r from-purple-900/80 via-blue-900/80 to-indigo-900/80 shadow-lg shadow-blue-500/20': scrolled && themeStore.isDark,
      'border-gray-200 bg-white/95 shadow-lg shadow-gray-200/20': scrolled && themeStore.isLight,
      'border-white/10 bg-gradient-to-r from-purple-900/80 via-blue-900/80 to-indigo-900/80': !scrolled && themeStore.isDark,
      'border-gray-200 bg-white/95': !scrolled && themeStore.isLight
    }"
  >
    <div class="max-w-7xl mx-auto px-6 md:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center group">
          <img 
            :src="themeStore.isDark ? '/Logo.png' : '/Light Logo.png'"
            alt="TPS Logo" 
            class="h-12 w-auto group-hover:scale-105 transition-transform duration-200"
          />
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="item in menuItems"
            :key="item.name"
            :to="{ name: item.name }"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all relative group"
            :class="[
              isActive(item.name) ? 'text-blue-400' : '',
              themeStore.isDark 
                ? (isActive(item.name) ? '' : 'text-white/70 hover:text-white')
                : (isActive(item.name) ? '' : 'text-gray-700 hover:text-gray-900')
            ]"
          >
            <span class="relative z-10 flex items-center gap-2">
              <i 
                :class="[
                  item.icon,
                  'text-xs transition-colors',
                  themeStore.isDark ? 'text-white/70' : 'text-gray-700'
                ]"
              ></i>
              {{ item.label }}
            </span>
            <span 
              v-if="isActive(item.name)"
              class="absolute inset-0 bg-blue-500/20 rounded-lg"
            ></span>
            <span 
              v-else
              class="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            ></span>
          </RouterLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-3">
          <RouterLink to="/jobs">
            <Button 
              :label="$t('header.apply')" 
              severity="contrast" 
              class="hidden md:inline-flex bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all"
              icon="pi pi-briefcase"
            />
          </RouterLink>
          
          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            type="button"
            class="hidden md:flex items-center justify-center w-10 h-10 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            :class="themeStore.isDark 
              ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white focus:ring-offset-blue-900' 
              : 'bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-700 hover:text-gray-900 focus:ring-offset-gray-50'"
            :title="themeStore.isDark ? $t('common.lightMode') : $t('common.darkMode')"
            :aria-label="themeStore.isDark ? $t('common.lightMode') : $t('common.darkMode')"
          >
            <i 
              :class="themeStore.isDark ? 'pi pi-sun' : 'pi pi-moon'" 
              class="text-lg transition-all"
              aria-hidden="true"
            ></i>
          </button>
          
          <!-- Language Selector - Flags -->
          <div 
            class="hidden md:flex items-center gap-1 rounded-lg p-1 border transition-colors"
            :class="themeStore.isDark 
              ? 'bg-white/5 border-white/10' 
              : 'bg-gray-100 border-gray-200'"
          >
            <button
              type="button"
              @click="changeLanguage('fr')"
              :class="[
                'px-2 py-1 rounded text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                selectedLanguage === 'fr' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : (themeStore.isDark ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200')
              ]"
              :title="$t('common.language') + ' - Français'"
              aria-label="Français"
              :aria-pressed="selectedLanguage === 'fr'"
            >
              🇫🇷
            </button>
            <button
              type="button"
              @click="changeLanguage('en')"
              :class="[
                'px-2 py-1 rounded text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                selectedLanguage === 'en' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : (themeStore.isDark ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200')
              ]"
              :title="$t('common.language') + ' - English'"
              aria-label="English"
              :aria-pressed="selectedLanguage === 'en'"
            >
              🇬🇧
            </button>
          </div>
          
          <!-- Mobile Menu Button -->
          <Button 
            v-if="isMobile"
            icon="pi pi-bars" 
            severity="secondary" 
            text 
            @click="mobileMenuOpen = !mobileMenuOpen"
          />
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <div 
        v-if="mobileMenuOpen" 
        class="md:hidden border-t backdrop-blur-xl transition-colors"
        :class="themeStore.isDark 
          ? 'border-white/10 bg-gradient-to-b from-purple-900/95 via-blue-900/95 to-indigo-900/95' 
          : 'border-gray-200 bg-white/95'"
      >
        <div class="px-6 py-4 space-y-2">
          <RouterLink
            v-for="item in menuItems"
            :key="item.name"
            :to="{ name: item.name }"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all"
            :class="[
              isActive(item.name) ? 'text-blue-400 bg-blue-500/20' : '',
              themeStore.isDark 
                ? (isActive(item.name) ? '' : 'text-white/70 hover:text-white hover:bg-white/10')
                : (isActive(item.name) ? '' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100')
            ]"
            @click="mobileMenuOpen = false"
          >
            <i 
              :class="[
                item.icon,
                'text-base transition-colors',
                themeStore.isDark ? 'text-white/70' : 'text-gray-700'
              ]"
            ></i>
            <span>{{ item.label }}</span>
          </RouterLink>
          
          <div 
            class="pt-4 border-t space-y-3"
            :class="themeStore.isDark ? 'border-white/10' : 'border-gray-200'"
          >
            <!-- Theme Toggle Mobile -->
            <button
              @click="toggleTheme"
              class="flex items-center justify-center w-full px-4 py-3 rounded-lg border transition-all"
              :class="themeStore.isDark 
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70' 
                : 'bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-700'"
            >
              <i 
                :class="themeStore.isDark ? 'pi pi-sun' : 'pi pi-moon'" 
                class="text-lg mr-3"
              ></i>
              <span class="font-medium">
                {{ themeStore.isDark ? $t('common.lightMode') : $t('common.darkMode') }}
              </span>
            </button>
            
            <!-- Language Selector Mobile -->
            <div 
              class="flex items-center justify-center gap-2 rounded-lg p-1 border"
              :class="themeStore.isDark 
                ? 'bg-white/5 border-white/10' 
                : 'bg-gray-100 border-gray-200'"
            >
              <button
                @click="changeLanguage('fr')"
                :class="[
                  'px-3 py-2 rounded text-base font-semibold transition-all flex-1',
                  selectedLanguage === 'fr' 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                ]"
              >
                🇫🇷 FR
              </button>
              <button
                @click="changeLanguage('en')"
                :class="[
                  'px-3 py-2 rounded text-base font-semibold transition-all flex-1',
                  selectedLanguage === 'en' 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                ]"
              >
                🇬🇧 EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script>
import {ref, computed, onMounted, onUnmounted, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {useAccountStore} from '@/stores/account.js'
import {useI18nStore} from '@/stores/i18n.js'
import {useThemeStore} from '@/stores/theme.js'
import {useWindowSize} from '@vueuse/core'

export default {
  name: 'Header',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const accountStore = useAccountStore()
    const themeStore = useThemeStore()
    const windowSize = useWindowSize()
    const { locale, t } = useI18n()
    const i18nStore = useI18nStore()
    const mobileMenuOpen = ref(false)
    const scrolled = ref(false)
    
    // Get initial locale from store (ensure it's a string)
    const initialLocale = i18nStore.currentLocale || 'fr'
    const selectedLanguage = ref(initialLocale)
    
    // Initialize locale in i18n
    locale.value = initialLocale
    
    const changeLanguage = (lang) => {
      if (lang && (lang === 'fr' || lang === 'en')) {
        locale.value = lang
        i18nStore.setLocale(lang)
        selectedLanguage.value = lang
      }
    }
    
    // Watch for locale changes from store
    watch(() => i18nStore.currentLocale, (newLocale) => {
      if (newLocale && newLocale !== locale.value && (newLocale === 'fr' || newLocale === 'en')) {
        locale.value = newLocale
        selectedLanguage.value = newLocale
      }
    })
    
    // Detect if we're on mobile (less than 768px)
    const isMobile = computed(() => windowSize.width.value < 768)
    
    // Ensure route is reactive and safe
    const currentRoute = computed(() => {
      try {
        return route || { name: null }
      } catch (e) {
        return { name: null }
      }
    })

    // Get all routes from router that should be displayed in menu
    const menuItems = computed(() => {
      if (!router || !router.options || !router.options.routes) {
        return []
      }
      const routes = router.options.routes.filter(r => r && r.displayInMenu === true)
      
      // Define menu order
      const menuOrder = ['home', 'job-board', 'services', 'news', 'about']
      
      // Translation mapping - use t from setup scope
      const labelMap = {
        'home': t('common.home'),
        'job-board': t('common.jobs'),
        'services': t('common.services'),
        'news': t('common.news'),
        'about': t('common.about')
      }
      
      // Map routes to menu items with proper labels and icons
      const items = routes.map(route => {
        if (!route || !route.name) return null
        
        // Use translation if available, otherwise use route label or name
        const label = labelMap[route.name] || route.label || route.name
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        
        return {
          name: route.name,
          label: label,
          icon: route.icon || 'pi pi-circle',
          path: route.path,
          order: menuOrder.indexOf(route.name)
        }
      }).filter(item => item !== null)
      
      // Sort by defined order, then alphabetically for items not in order
      return items.sort((a, b) => {
        if (a.order !== -1 && b.order !== -1) {
          return a.order - b.order
        }
        if (a.order !== -1) return -1
        if (b.order !== -1) return 1
        return a.label.localeCompare(b.label)
      })
    })

    const isActive = (routeName) => {
      return currentRoute.value && currentRoute.value.name === routeName
    }

    const toggleTheme = () => {
      themeStore.toggleTheme()
    }

    const handleScroll = () => {
      scrolled.value = window.scrollY > 20
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      accountStore,
      themeStore,
      mobileMenuOpen,
      scrolled,
      currentRoute,
      menuItems,
      isActive,
      toggleTheme,
      isMobile,
      selectedLanguage,
      changeLanguage
    }
  }
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
