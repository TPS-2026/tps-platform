<template>
  <BackOfficeLayout>
    <div class="py-6 px-6 md:px-12">
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h1 class="text-3xl md:text-4xl font-bold mb-2" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
            Tableau de bord
          </h1>
          <p class="text-white/70 dark:text-gray-400">
            Vue d'ensemble de votre plateforme
          </p>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Total Jobs -->
          <div 
            class="p-6 rounded-2xl transition-all"
            :class="themeStore.isDark 
              ? 'bg-white/5 backdrop-blur-sm border border-white/10' 
              : 'bg-white border border-gray-200 shadow-sm'"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center"
                   :class="themeStore.isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'">
                <i class="pi pi-briefcase text-xl" :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'"></i>
              </div>
              <span 
                class="text-2xl font-bold"
                :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
              >{{ stats.totalJobs }}</span>
            </div>
            <p class="text-sm" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">Offres d'emploi</p>
          </div>

          <!-- Total Applications -->
          <div 
            class="p-6 rounded-2xl transition-all"
            :class="themeStore.isDark 
              ? 'bg-white/5 backdrop-blur-sm border border-white/10' 
              : 'bg-white border border-gray-200 shadow-sm'"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center"
                   :class="themeStore.isDark ? 'bg-green-500/20' : 'bg-green-500/10'">
                <i class="pi pi-file-edit text-xl" :class="themeStore.isDark ? 'text-green-400' : 'text-green-600'"></i>
              </div>
              <span 
                class="text-2xl font-bold"
                :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
              >{{ stats.totalApplications }}</span>
            </div>
            <p class="text-sm" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">Candidatures</p>
          </div>

          <!-- Pending Applications -->
          <div 
            class="p-6 rounded-2xl transition-all"
            :class="themeStore.isDark 
              ? 'bg-white/5 backdrop-blur-sm border border-white/10' 
              : 'bg-white border border-gray-200 shadow-sm'"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center"
                   :class="themeStore.isDark ? 'bg-yellow-500/20' : 'bg-yellow-500/10'">
                <i class="pi pi-clock text-xl" :class="themeStore.isDark ? 'text-yellow-400' : 'text-yellow-600'"></i>
              </div>
              <span 
                class="text-2xl font-bold"
                :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
              >{{ stats.pendingApplications }}</span>
            </div>
            <p class="text-sm" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">En attente</p>
          </div>

          <!-- Total Articles -->
          <div 
            class="p-6 rounded-2xl transition-all"
            :class="themeStore.isDark 
              ? 'bg-white/5 backdrop-blur-sm border border-white/10' 
              : 'bg-white border border-gray-200 shadow-sm'"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center"
                   :class="themeStore.isDark ? 'bg-purple-500/20' : 'bg-purple-500/10'">
                <i class="pi pi-calendar-plus text-xl" :class="themeStore.isDark ? 'text-purple-400' : 'text-purple-600'"></i>
              </div>
              <span 
                class="text-2xl font-bold"
                :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
              >{{ stats.totalArticles }}</span>
            </div>
            <p class="text-sm" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">Articles publiés</p>
          </div>
        </div>

        <!-- Charts and Details -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- Applications by Status -->
          <div 
            class="p-6 rounded-2xl transition-all"
            :class="themeStore.isDark 
              ? 'bg-white/5 backdrop-blur-sm border border-white/10' 
              : 'bg-white border border-gray-200 shadow-sm'"
          >
            <h3 class="text-lg font-semibold mb-6" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
              Candidatures par statut
            </h3>
            <div class="space-y-4">
              <div v-for="status in applicationStatuses" :key="status.value" class="flex items-center gap-4">
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">
                      {{ status.label }}
                    </span>
                    <span class="text-sm font-bold" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
                      {{ status.count }}
                    </span>
                  </div>
                  <div 
                    class="h-2 rounded-full overflow-hidden"
                    :class="themeStore.isDark ? 'bg-white/10' : 'bg-gray-200'"
                  >
                    <div 
                      class="h-full rounded-full transition-all duration-500"
                      :class="status.color"
                      :style="{ width: status.percentage + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Applications by Day (Last 7 days) -->
          <div 
            class="p-6 rounded-2xl transition-all"
            :class="themeStore.isDark 
              ? 'bg-white/5 backdrop-blur-sm border border-white/10' 
              : 'bg-white border border-gray-200 shadow-sm'"
          >
            <h3 class="text-lg font-semibold mb-6" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
              Candidatures des 7 derniers jours
            </h3>
            <div class="flex items-end justify-between gap-2 h-48">
              <div 
                v-for="(day, index) in applicationsByDay" 
                :key="index"
                class="flex-1 flex flex-col items-center gap-2"
              >
                <div 
                  class="w-full rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer"
                  :class="themeStore.isDark ? 'bg-green-500/60' : 'bg-green-500'"
                  :style="{ height: day.percentage + '%', minHeight: day.count > 0 ? '4px' : '0' }"
                  :title="`${day.count} candidature(s) le ${day.label}`"
                ></div>
                <span class="text-xs" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'">
                  {{ day.label }}
                </span>
                <span 
                  class="text-xs font-bold"
                  :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
                >{{ day.count }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            class="group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer hover:scale-105"
            :class="themeStore.isDark 
              ? 'bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30' 
              : 'bg-white border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md'"
            @click="$router.push({ name: 'backoffice-jobs' })"
          >
            <div class="flex items-center gap-4 mb-4">
              <div class="w-14 h-14 rounded-xl flex items-center justify-center"
                   :class="themeStore.isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'">
                <i class="pi pi-briefcase text-2xl" :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'"></i>
              </div>
              <h2 class="text-xl font-semibold" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">Offres d'emploi</h2>
            </div>
            <p class="mb-4" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">
              Gérez les offres d'emploi publiées sur la plateforme
            </p>
            <Button 
              label="Gérer les offres" 
              severity="secondary" 
              text
              icon="pi pi-arrow-right"
              iconPos="right"
              :class="themeStore.isDark 
                ? 'text-white hover:text-blue-400' 
                : 'text-gray-700 hover:text-blue-600'"
            />
          </div>

          <div 
            class="group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer hover:scale-105"
            :class="themeStore.isDark 
              ? 'bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30' 
              : 'bg-white border border-gray-200 hover:border-green-300 shadow-sm hover:shadow-md'"
            @click="$router.push({ name: 'backoffice-applications' })"
          >
            <div class="flex items-center gap-4 mb-4">
              <div class="w-14 h-14 rounded-xl flex items-center justify-center"
                   :class="themeStore.isDark ? 'bg-green-500/20' : 'bg-green-500/10'">
                <i class="pi pi-file-edit text-2xl" :class="themeStore.isDark ? 'text-green-400' : 'text-green-600'"></i>
              </div>
              <h2 class="text-xl font-semibold" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">Candidatures</h2>
            </div>
            <p class="mb-4" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">
              Consultez et gérez toutes les candidatures reçues
            </p>
            <Button 
              label="Gérer les candidatures" 
              severity="secondary" 
              text
              icon="pi pi-arrow-right"
              iconPos="right"
              :class="themeStore.isDark 
                ? 'text-white hover:text-green-400' 
                : 'text-gray-700 hover:text-green-600'"
            />
          </div>

          <div 
            class="group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer hover:scale-105"
            :class="themeStore.isDark 
              ? 'bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30' 
              : 'bg-white border border-gray-200 hover:border-purple-300 shadow-sm hover:shadow-md'"
            @click="$router.push({ name: 'backoffice-news' })"
          >
            <div class="flex items-center gap-4 mb-4">
              <div class="w-14 h-14 rounded-xl flex items-center justify-center"
                   :class="themeStore.isDark ? 'bg-purple-500/20' : 'bg-purple-500/10'">
                <i class="pi pi-calendar-plus text-2xl" :class="themeStore.isDark ? 'text-purple-400' : 'text-purple-600'"></i>
              </div>
              <h2 class="text-xl font-semibold" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">Articles</h2>
            </div>
            <p class="mb-4" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">
              Gérez les articles et actualités publiés sur la plateforme
            </p>
            <Button 
              label="Gérer les articles" 
              severity="secondary" 
              text
              icon="pi pi-arrow-right"
              iconPos="right"
              :class="themeStore.isDark 
                ? 'text-white hover:text-purple-400' 
                : 'text-gray-700 hover:text-purple-600'"
            />
          </div>
        </div>
      </div>
    </div>
  </BackOfficeLayout>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import apiClient from '@/utils/axios.js'
import BackOfficeLayout from './BackOfficeLayout.vue'
import { useThemeStore } from '@/stores/theme.js'

export default {
  name: 'BackOfficeDashboard',
  components: {
    BackOfficeLayout
  },
  setup() {
    const themeStore = useThemeStore()
    const loading = ref(true)
    const stats = ref({
      totalJobs: 0,
      totalApplications: 0,
      pendingApplications: 0,
      totalArticles: 0
    })
    const applications = ref([])
    const jobs = ref([])
    const articles = ref([])

    const fetchStats = async () => {
      loading.value = true
      try {
        // Fetch all data
        const [jobsRes, applicationsRes, articlesRes] = await Promise.all([
          apiClient.get('/jobs'),
          apiClient.get('/applications'),
          apiClient.get('/news', { params: { page: 1, pageSize: 100, admin: 'true' } })
        ])

        jobs.value = jobsRes.data || []
        applications.value = applicationsRes.data || []
        articles.value = articlesRes.data?.items || articlesRes.data || []

        // Calculate stats
        stats.value = {
          totalJobs: jobs.value.length,
          totalApplications: applications.value.length,
          pendingApplications: applications.value.filter(app => app.status === 'pending').length,
          totalArticles: articles.value.filter(article => article.published).length
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        loading.value = false
      }
    }

    const applicationStatuses = computed(() => {
      const statusCounts = {
        pending: 0,
        reviewed: 0,
        accepted: 0,
        rejected: 0
      }

      applications.value.forEach(app => {
        if (statusCounts.hasOwnProperty(app.status)) {
          statusCounts[app.status]++
        }
      })

      const total = applications.value.length || 1
      const statuses = [
        { label: 'En attente', value: 'pending', count: statusCounts.pending, color: 'bg-yellow-500' },
        { label: 'Examinée', value: 'reviewed', count: statusCounts.reviewed, color: 'bg-blue-500' },
        { label: 'Acceptée', value: 'accepted', count: statusCounts.accepted, color: 'bg-green-500' },
        { label: 'Refusée', value: 'rejected', count: statusCounts.rejected, color: 'bg-red-500' }
      ]

      return statuses.map(status => ({
        ...status,
        percentage: total > 0 ? (status.count / total) * 100 : 0
      }))
    })

    const applicationsByDay = computed(() => {
      const days = []
      const today = new Date()
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        const dateStr = date.toISOString().split('T')[0]
        
        const count = applications.value.filter(app => {
          const appDate = new Date(app.createdAt).toISOString().split('T')[0]
          return appDate === dateStr
        }).length

        days.push({
          label: date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }),
          count,
          date: dateStr
        })
      }

      const maxCount = Math.max(...days.map(d => d.count), 1)
      return days.map(day => ({
        ...day,
        percentage: maxCount > 0 ? (day.count / maxCount) * 100 : 0
      }))
    })

    onMounted(() => {
      fetchStats()
    })

    return {
      themeStore,
      loading,
      stats,
      applicationStatuses,
      applicationsByDay
    }
  }
}
</script>








