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
      <div class="max-w-4xl mx-auto">
        <Button 
          label="Retour" 
          icon="pi pi-arrow-left" 
          severity="secondary" 
          outlined
          class="transition-all"
          :class="themeStore.isDark 
            ? 'border-white/30 text-white hover:bg-white/10' 
            : 'border-gray-800/30 text-gray-900 hover:bg-gray-100'"
          @click="$router.back()"
        />
      </div>
    </div>

    <div class="relative z-10 py-12 px-6 md:px-12 lg:px-24">
      <div class="max-w-4xl mx-auto">
        <div v-if="newsStore.loading" class="text-center py-20">
          <ProgressSpinner size="large"/>
          <p 
            class="mt-4 transition-colors"
            :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'"
          >Chargement...</p>
        </div>
        
        <div 
          v-else-if="article" 
          class="p-8 backdrop-blur-sm rounded-2xl transition-colors"
          :class="themeStore.isDark 
            ? 'bg-white/5 border border-white/10' 
            : 'bg-white/90 border border-gray-200/50 shadow-lg'"
        >
          <h1 
            class="text-3xl md:text-4xl font-bold mb-4 transition-colors"
            :class="themeStore.isDark ? 'text-white' : 'text-gray-900'"
          >{{ article.title }}</h1>
          <div class="flex items-center gap-4 mb-8">
            <span 
              class="text-sm flex items-center gap-2 transition-colors"
              :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'"
            >
              <i class="pi pi-calendar"></i>
              {{ formatDate(article.publishedAt || article.createdAt) }}
            </span>
            <Tag v-if="article.category" :value="article.category" severity="info"/>
          </div>
          <div class="prose prose-invert max-w-none">
            <div 
              class="whitespace-pre-line leading-relaxed text-lg transition-colors"
              :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'"
            >{{ article.content }}</div>
          </div>
        </div>
        
        <div v-else class="text-center py-20">
          <div 
            class="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors"
            :class="themeStore.isDark ? 'bg-blue-500/10' : 'bg-blue-500/20'"
          >
            <i 
              class="pi pi-exclamation-triangle text-4xl transition-colors"
              :class="themeStore.isDark ? 'text-blue-400/50' : 'text-blue-600/70'"
            ></i>
          </div>
          <p 
            class="text-xl mb-4 transition-colors"
            :class="themeStore.isDark ? 'text-white/70' : 'text-gray-700'"
          >Article non trouvé</p>
          <RouterLink to="/news">
            <Button 
              label="Voir toutes les actualités" 
              severity="contrast"
              class="bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all"
            />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useNewsStore} from "@/stores/news.js";
import {useThemeStore} from "@/stores/theme.js";
import {onMounted, computed} from "vue";
import {useRoute} from "vue-router";
import BackgroundEffects from '@/components/BackgroundEffects.vue'

export default {
  name: 'NewsArticle',
  components: {
    BackgroundEffects
  },
  setup() {
    const newsStore = useNewsStore()
    const themeStore = useThemeStore()
    const route = useRoute()
    
    const article = computed(() => newsStore.currentArticle)
    
    const formatDate = (date) => {
      if (!date) return ''
      return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    
    onMounted(async () => {
      await newsStore.fetchArticleById(route.params.id)
    })
    
    return {
      newsStore,
      themeStore,
      article,
      formatDate
    }
  }
}
</script>
