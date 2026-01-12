<template>
  <div 
    class="min-h-screen overflow-x-hidden relative transition-colors duration-300"
    :class="themeStore.isDark 
      ? 'text-white bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50' 
      : 'text-gray-900 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50'"
  >
    <BackgroundEffects/>
    
    <!-- Hero Section -->
    <div class="relative z-10 py-20 px-6 md:px-12 lg:px-24">
      <div class="max-w-7xl mx-auto text-center">
        <h1 
          class="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent transition-all"
          :class="themeStore.isDark 
            ? 'bg-gradient-to-r from-white via-blue-200 to-purple-200' 
            : 'bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700'"
        >
          Actualités TPS
        </h1>
        <p 
          class="text-xl max-w-3xl mx-auto transition-colors"
          :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
        >
          Restez informé de l'actualité de TPS, de nos projets et de nos réalisations
        </p>
      </div>
    </div>

    <div class="relative z-10 py-12 px-6 md:px-12 lg:px-24">
      <div class="max-w-7xl mx-auto">
        <div v-if="newsStore.loading" class="text-center py-20">
          <ProgressSpinner size="large"/>
          <p 
            class="mt-4 transition-colors"
            :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
          >Chargement des actualités...</p>
        </div>
        
        <div v-else-if="newsStore.news.length === 0" class="text-center py-20">
          <div 
            class="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors"
            :class="themeStore.isDark ? 'bg-blue-500/10' : 'bg-blue-500/20'"
          >
            <i 
              class="pi pi-newspaper text-4xl transition-colors"
              :class="themeStore.isDark ? 'text-blue-400/50' : 'text-blue-600/70'"
            ></i>
          </div>
          <p 
            class="text-xl transition-colors"
            :class="themeStore.isDark ? 'text-white/70' : 'text-gray-700'"
          >Aucune actualité pour le moment</p>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="article in newsStore.news" 
            :key="article.id"
            class="group relative p-8 backdrop-blur-sm rounded-2xl transition-all duration-300 cursor-pointer hover:scale-105"
            :class="themeStore.isDark 
              ? 'bg-white/5 border border-white/10 hover:border-white/30' 
              : 'bg-white/90 border border-gray-200/50 hover:border-gray-300/70 shadow-lg'"
            @click="$router.push({ name: 'news-article', params: { id: article.id } })"
          >
            <h3 
              class="text-xl font-semibold mb-4 transition-colors line-clamp-2"
              :class="themeStore.isDark 
                ? 'text-white group-hover:text-blue-400' 
                : 'text-gray-900 group-hover:text-blue-600'"
            >{{ article.title }}</h3>
            <div class="flex items-center gap-4 mb-4">
              <span 
                class="text-sm flex items-center gap-2 transition-colors"
                :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
              >
                <i class="pi pi-calendar"></i>
                {{ formatDate(article.publishedAt || article.createdAt) }}
              </span>
              <Tag v-if="article.category" :value="article.category" severity="info" class="text-xs"/>
            </div>
            <p 
              class="mb-6 line-clamp-3 leading-relaxed transition-colors"
              :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
            >{{ article.excerpt || article.content }}</p>
            <Button 
              label="Lire la suite" 
              severity="secondary" 
              text
              icon="pi pi-arrow-right"
              iconPos="right"
              class="transition-colors group-hover:translate-x-1 transition-transform"
              :class="themeStore.isDark 
                ? 'text-white hover:text-blue-400' 
                : 'text-gray-700 hover:text-blue-600'"
              @click.stop="$router.push({ name: 'news-article', params: { id: article.id } })"
            />
          </div>
        </div>
        
        <div v-if="newsStore.pagination.total > newsStore.pagination.pageSize" class="mt-12 flex justify-center">
          <Paginator
            :rows="newsStore.pagination.pageSize"
            :totalRecords="newsStore.pagination.total"
            @page="onPageChange"
            class="transition-colors"
            :class="themeStore.isDark 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/90 border-gray-200/50 shadow-lg'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useNewsStore} from "@/stores/news.js";
import {useThemeStore} from "@/stores/theme.js";
import {onMounted} from "vue";
import BackgroundEffects from '@/components/BackgroundEffects.vue'

export default {
  name: 'News',
  components: {
    BackgroundEffects
  },
  setup() {
    const newsStore = useNewsStore()
    const themeStore = useThemeStore()
    
    const formatDate = (date) => {
      if (!date) return ''
      return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    
    const onPageChange = async (event) => {
      await newsStore.fetchNews(event.page + 1)
    }
    
    onMounted(async () => {
      await newsStore.fetchNews()
    })
    
    return {
      newsStore,
      themeStore,
      formatDate,
      onPageChange
    }
  }
}
</script>
