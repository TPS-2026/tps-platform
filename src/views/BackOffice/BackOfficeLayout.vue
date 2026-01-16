<template>
  <div class="min-h-screen" :class="themeStore.isDark ? 'bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50' : 'bg-gray-50'">
    <BackgroundEffects v-if="themeStore.isDark"/>
    
    <div class="flex">
      <!-- Sidebar -->
      <aside 
        class="fixed left-0 top-0 h-screen w-64 z-50 transition-transform duration-300"
        :class="[
          themeStore.isDark 
            ? 'bg-white/5 backdrop-blur-sm border-r border-white/10' 
            : 'bg-white border-r border-gray-200 shadow-lg',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        ]"
      >
        <div class="p-6 border-b" :class="themeStore.isDark ? 'border-white/10' : 'border-gray-200'">
          <RouterLink to="/backoffice" class="flex items-center gap-3 group">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center"
                 :class="themeStore.isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'">
              <i class="pi pi-cog text-xl" :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'"></i>
            </div>
            <div>
              <h2 class="font-bold text-lg" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">Back Office</h2>
              <p class="text-xs" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'">Administration</p>
            </div>
          </RouterLink>
        </div>

        <nav class="p-4 space-y-2">
          <RouterLink
            v-for="item in menuItems"
            :key="item.path"
            :to="{ name: item.name }"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all group"
            :class="[
              $route.name === item.name
                ? themeStore.isDark
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-blue-50 text-blue-600 border border-blue-200'
                : themeStore.isDark
                  ? 'text-white/70 hover:bg-white/5 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100'
            ]"
            @click="mobileMenuOpen = false"
          >
            <i :class="['pi', item.icon, 'text-lg']"></i>
            <span class="font-medium">{{ item.label }}</span>
            <Tag 
              v-if="item.badge" 
              :value="item.badge" 
              severity="danger" 
              class="ml-auto text-xs"
            />
          </RouterLink>
        </nav>

        <div class="absolute bottom-0 left-0 right-0 p-4 border-t" :class="themeStore.isDark ? 'border-white/10' : 'border-gray-200'">
          <Button 
            label="Retour au site" 
            icon="pi pi-arrow-left" 
            severity="secondary" 
            outlined
            class="w-full"
            :class="themeStore.isDark ? 'border-white/30 text-white hover:bg-white/10' : 'border-gray-300 text-gray-700 hover:bg-gray-100'"
            @click="$router.push({ name: 'home' })"
          />
        </div>
      </aside>

      <!-- Mobile menu overlay -->
      <div 
        v-if="mobileMenuOpen"
        class="fixed inset-0 bg-black/50 z-40 md:hidden"
        @click="mobileMenuOpen = false"
      ></div>

      <!-- Main content -->
      <main class="flex-1 md:ml-64 min-h-screen">
        <!-- Loading state while verifying auth -->
        <div v-if="isVerifyingAuth" class="flex items-center justify-center min-h-screen">
          <div class="text-center">
            <ProgressSpinner />
            <p class="mt-4" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">
              Vérification de l'authentification...
            </p>
          </div>
        </div>

        <!-- Authenticated content -->
        <template v-else>
          <!-- Top bar -->
          <div 
            class="sticky top-0 z-30 p-4 border-b backdrop-blur-sm"
            :class="themeStore.isDark ? 'bg-white/5 border-white/10' : 'bg-white/80 border-gray-200'"
          >
            <div class="flex items-center justify-between">
              <Button 
                icon="pi pi-bars" 
                severity="secondary" 
                text
                rounded
                class="md:hidden"
                :class="themeStore.isDark ? 'text-white' : 'text-gray-700'"
                @click="mobileMenuOpen = !mobileMenuOpen"
              />
              <h1 class="text-xl font-semibold md:hidden" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
                {{ currentPageTitle }}
              </h1>
              <div class="flex items-center gap-4">
                <span v-if="accountStore.userEmail" class="text-sm" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">
                  {{ accountStore.userEmail }}
                </span>
                <Button 
                  icon="pi pi-sign-out" 
                  severity="secondary" 
                  text
                  rounded
                  :class="themeStore.isDark ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'"
                  @click="handleLogout"
                  v-tooltip.top="'Déconnexion'"
                />
              </div>
            </div>
          </div>

          <!-- Page content -->
          <slot />
        </template>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme.js'
import { useAccountStore } from '@/stores/account.js'
import BackgroundEffects from '@/components/BackgroundEffects.vue'
import ProgressSpinner from 'primevue/progressspinner'
import Button from 'primevue/button'

export default {
  name: 'BackOfficeLayout',
  components: {
    BackgroundEffects,
    ProgressSpinner,
    Button
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const themeStore = useThemeStore()
    const accountStore = useAccountStore()
    const mobileMenuOpen = ref(false)
    const isVerifyingAuth = ref(true)

    const menuItems = [
      {
        name: 'backoffice-dashboard',
        path: '/backoffice',
        label: 'Tableau de bord',
        icon: 'pi-home'
      },
      {
        name: 'backoffice-jobs',
        path: '/backoffice/jobs',
        label: 'Offres d\'emploi',
        icon: 'pi-briefcase'
      },
      {
        name: 'backoffice-applications',
        path: '/backoffice/applications',
        label: 'Candidatures',
        icon: 'pi-file-edit',
        badge: null // Can be dynamic based on pending applications count
      },
      {
        name: 'backoffice-news',
        path: '/backoffice/news',
        label: 'Articles',
        icon: 'pi-calendar-plus'
      },
      {
        name: 'backoffice-users',
        path: '/backoffice/users',
        label: 'Utilisateurs',
        icon: 'pi-users'
      }
    ]

    const currentPageTitle = computed(() => {
      const item = menuItems.find(i => i.name === route.name)
      return item ? item.label : 'Back Office'
    })

    const handleLogout = () => {
      accountStore.logout()
      router.push({ name: 'sign-in', query: { next: route.fullPath } })
    }

    // Verify authentication on mount
    onMounted(async () => {
      // Check if user is authenticated
      if (!accountStore.isAuthenticated()) {
        router.push({ name: 'sign-in', query: { next: route.fullPath } })
        return
      }

      // Verify token with backend
      try {
        await accountStore.verifyAuth()
        isVerifyingAuth.value = false
      } catch (err) {
        // If verification fails, redirect to login
        console.error('Authentication verification failed:', err)
        router.push({ name: 'sign-in', query: { next: route.fullPath, expired: 'true' } })
      }
    })

    return {
      themeStore,
      accountStore,
      mobileMenuOpen,
      menuItems,
      currentPageTitle,
      isVerifyingAuth,
      handleLogout
    }
  }
}
</script>

<style scoped>
/* Ensure sidebar is above content on mobile */
@media (max-width: 768px) {
  aside {
    z-index: 50;
  }
}
</style>

