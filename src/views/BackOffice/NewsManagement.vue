<template>
  <BackOfficeLayout>
    <div class="py-6 px-6 md:px-12">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold mb-2" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
              Gestion des articles
            </h1>
            <p :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">Créez, modifiez et supprimez les articles et actualités</p>
          </div>
          <div class="flex gap-3">
            <Button 
              label="Nouvel article" 
              icon="pi pi-plus" 
              severity="contrast"
              class="bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all"
              @click="openArticleDialog(null)"
            />
          </div>
        </div>

        <div v-if="loading" class="text-center py-20">
          <ProgressSpinner size="large"/>
          <p class="mt-4" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">Chargement...</p>
        </div>

        <div v-else-if="articles.length === 0" 
             class="text-center py-20 rounded-2xl"
             :class="themeStore.isDark 
               ? 'bg-white/5 backdrop-blur-sm border border-white/10' 
               : 'bg-white border border-gray-200 shadow-sm'">
          <div class="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
               :class="themeStore.isDark ? 'bg-purple-500/10' : 'bg-purple-50'">
            <i class="pi pi-calendar-plus text-4xl" :class="themeStore.isDark ? 'text-purple-400/50' : 'text-purple-400'"></i>
          </div>
          <p class="text-xl mb-4" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">Aucun article</p>
          <Button 
            label="Créer le premier article" 
            icon="pi pi-plus"
            severity="contrast"
            class="bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all"
            @click="openArticleDialog(null)"
          />
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="article in articles.filter(a => a && a.id)" 
            :key="article.id"
            class="p-6 rounded-2xl transition-all"
            :class="themeStore.isDark 
              ? 'bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30' 
              : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm'"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-xl font-semibold mb-2" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">{{ article.title }}</h3>
                <div class="flex items-center gap-4 mb-3">
                  <span class="text-sm flex items-center gap-2" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'">
                    <i class="pi pi-calendar"></i>
                    {{ formatDate(article.publishedAt || article.createdAt) }}
                  </span>
                  <Tag v-if="article.category" :value="article.category" severity="info" class="text-xs"/>
                  <Tag v-if="article.publishedAt" :value="'Publié'" severity="success" class="text-xs"/>
                  <Tag v-else :value="'Brouillon'" severity="warning" class="text-xs"/>
                </div>
                <p class="line-clamp-2 mb-3" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">{{ article.excerpt || article.content }}</p>
              </div>
              <div class="flex gap-2 ml-4">
                <Button 
                  icon="pi pi-pencil" 
                  severity="secondary" 
                  outlined
                  rounded
                  :class="themeStore.isDark 
                    ? 'border-white/30 text-white hover:bg-white/10' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'"
                  @click="openArticleDialog(article)"
                  v-tooltip.top="'Modifier'"
                />
                <Button 
                  icon="pi pi-trash" 
                  severity="danger" 
                  outlined
                  rounded
                  class="border-red-400/30 text-red-400 hover:bg-red-400/10"
                  @click="confirmDelete(article)"
                  v-tooltip.top="'Supprimer'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Article Dialog -->
    <Dialog 
      v-model:visible="showDialog" 
      :header="isEditing ? 'Modifier l\'article' : 'Nouvel article'"
      :style="{ width: '90vw', maxWidth: '800px' }"
      :modal="true"
      class="p-fluid"
    >
      <form @submit.prevent="saveArticle" class="space-y-1">
        <!-- Section: Informations -->
        <div class="flex items-center gap-2 pt-2 pb-3">
          <i class="pi pi-info-circle text-blue-400"></i>
          <span class="text-sm font-semibold text-white/90 uppercase tracking-wide">Informations</span>
          <div class="flex-1 h-px bg-white/10"></div>
        </div>
        <div class="space-y-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div>
            <label class="block text-xs font-medium mb-1.5 text-white/60">Titre <span class="text-red-400">*</span></label>
            <InputText v-model="articleForm.title" required class="w-full" placeholder="Titre de l'article" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <label class="block text-xs font-medium mb-1.5 text-white/60">Catégorie</label>
              <InputText v-model="articleForm.category" class="w-full" placeholder="Ex: Actualité, Projet, Événement" />
            </div>
            <div class="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/[0.08]">
              <Checkbox v-model="articleForm.published" :binary="true" />
              <div>
                <span class="text-sm font-medium text-white/90">Publier immédiatement</span>
                <p class="text-xs text-white/40">L'article sera visible sur le site</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Section: Image -->
        <div class="flex items-center gap-2 pt-6 pb-3">
          <i class="pi pi-image text-purple-400"></i>
          <span class="text-sm font-semibold text-white/90 uppercase tracking-wide">Image de couverture</span>
          <div class="flex-1 h-px bg-white/10"></div>
        </div>
        <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div v-if="articleForm.coverImage" class="mb-4">
            <div class="relative group">
              <img
                :src="articleForm.coverImage"
                alt="Aperçu"
                class="w-full h-48 object-cover rounded-lg border border-white/10"
                @error="$event.target.style.display='none'"
              />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  rounded
                  @click="removeImage"
                  v-tooltip.top="'Supprimer l\'image'"
                />
              </div>
            </div>
          </div>
          <FileUpload
            mode="basic"
            accept="image/*"
            :maxFileSize="5000000"
            :chooseLabel="articleForm.coverImage ? 'Changer l\'image' : 'Choisir une image'"
            chooseIcon="pi pi-upload"
            @select="onImageSelect"
            class="w-full"
          />
          <small class="text-white/40 text-xs mt-2 block">Max 5 MB — JPG, PNG, GIF, WEBP</small>
        </div>

        <!-- Section: Contenu -->
        <div class="flex items-center gap-2 pt-6 pb-3">
          <i class="pi pi-file-edit text-cyan-400"></i>
          <span class="text-sm font-semibold text-white/90 uppercase tracking-wide">Contenu</span>
          <div class="flex-1 h-px bg-white/10"></div>
        </div>
        <div class="space-y-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div>
            <label class="block text-xs font-medium mb-1.5 text-white/60">Extrait (résumé court)</label>
            <Textarea v-model="articleForm.excerpt" rows="2" class="w-full" placeholder="Un court résumé qui apparaîtra dans la liste des articles..." />
          </div>
          <div>
            <label class="block text-xs font-medium mb-1.5 text-white/60">Contenu <span class="text-red-400">*</span></label>
            <Textarea v-model="articleForm.content" rows="10" required class="w-full" placeholder="Rédigez le contenu complet de l'article..." />
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-6 border-t border-white/10 mt-2">
          <Button
            label="Annuler"
            severity="secondary"
            outlined
            icon="pi pi-times"
            @click="closeDialog"
          />
          <Button
            :label="isEditing ? 'Modifier' : 'Créer'"
            type="submit"
            severity="contrast"
            :icon="isEditing ? 'pi pi-check' : 'pi pi-plus'"
            class="bg-gradient-to-r from-blue-500 to-purple-600 border-0"
          />
        </div>
      </form>
    </Dialog>

    <!-- Delete Confirmation -->
    <ConfirmDialog />
  </BackOfficeLayout>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import apiClient from '@/utils/axios.js'
import BackOfficeLayout from './BackOfficeLayout.vue'
import { useThemeStore } from '@/stores/theme.js'
import { uploadImage } from '@/services/upload.js'

export default {
  name: 'NewsManagement',
  components: {
    BackOfficeLayout
  },
  setup() {
    const themeStore = useThemeStore()
    const articles = ref([])
    const loading = ref(false)
    const showDialog = ref(false)
    const editingArticle = ref(null)
    const confirm = useConfirm()
    const toast = useToast()
    const uploadingImage = ref(false)

    const articleForm = ref({
      title: '',
      category: '',
      excerpt: '',
      content: '',
      coverImage: '',
      published: false
    })

    const fetchArticles = async () => {
      loading.value = true
      try {
        const response = await apiClient.get('/news', {
          params: { page: 1, pageSize: 100 }
        })
        const data = response.data.items || response.data || []
        // Filter out any null or invalid articles
        articles.value = Array.isArray(data) ? data.filter(a => a && a.id) : []
      } catch (error) {
        console.error('Error fetching articles:', error)
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les articles',
          life: 3000
        })
        articles.value = []
      } finally {
        loading.value = false
      }
    }

    const openArticleDialog = (article) => {
      // Always reset first
      editingArticle.value = null
      
      // If article is provided and has an id, we're editing
      if (article && typeof article === 'object' && article.id) {
        editingArticle.value = { ...article } // Create a copy to avoid reactivity issues
        articleForm.value = {
          title: article.title || '',
          category: article.category || '',
          excerpt: article.excerpt || '',
          content: article.content || '',
          coverImage: article.coverImage || '', // Backend uses camelCase
          published: !!article.published || !!article.publishedAt // Backend uses 'published' boolean
        }
      } else {
        // Creating a new article
        editingArticle.value = null
        articleForm.value = {
          title: '',
          category: '',
          excerpt: '',
          content: '',
          coverImage: '',
          published: false
        }
      }
      showDialog.value = true
    }

    const onImageSelect = async (event) => {
      const file = event.files[0]
      if (!file) return
      
      uploadingImage.value = true
      try {
        const result = await uploadImage(file)
        articleForm.value.coverImage = result.url
        
        toast.add({
          severity: 'success',
          summary: 'Image uploadée',
          detail: 'L\'image a été uploadée avec succès',
          life: 3000
        })
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Erreur d\'upload',
          detail: error.message || 'Impossible d\'uploader l\'image',
          life: 5000
        })
      } finally {
        uploadingImage.value = false
      }
    }
    
    const removeImage = () => {
      articleForm.value.coverImage = ''
    }

    const closeDialog = () => {
      showDialog.value = false
      editingArticle.value = null
      // Reset form
      articleForm.value = {
        title: '',
        category: '',
        excerpt: '',
        content: '',
        coverImage: '',
        published: false
      }
    }

    const saveArticle = async () => {
      try {
        // Prepare article data according to backend model
        const articleData = {
          title: articleForm.value.title || '',
          category: articleForm.value.category || '',
          excerpt: articleForm.value.excerpt || '',
          content: articleForm.value.content || '',
          coverImage: articleForm.value.coverImage || '',
          published: !!articleForm.value.published // Convert to boolean
        }
        
        if (isEditing.value) {
          // Update existing article
          const articleId = editingArticle.value.id
          await apiClient.put(`/news/${articleId}`, articleData)
          toast.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Article modifié avec succès',
            life: 3000
          })
        } else {
          // Create new article
          await apiClient.post('/news', articleData)
          toast.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Article créé avec succès',
            life: 3000
          })
        }
        closeDialog()
        await fetchArticles()
      } catch (error) {
        console.error('Error saving article:', error)
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: error.response?.data?.message || 'Impossible de sauvegarder l\'article',
          life: 3000
        })
      }
    }

    const confirmDelete = (article) => {
      confirm.require({
        message: `Êtes-vous sûr de vouloir supprimer l'article "${article.title}" ?`,
        header: 'Confirmation de suppression',
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        accept: async () => {
          try {
            await apiClient.delete(`/news/${article.id}`)
            toast.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Article supprimé avec succès',
              life: 3000
            })
            await fetchArticles()
          } catch (error) {
            console.error('Error deleting article:', error)
            toast.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Impossible de supprimer l\'article',
              life: 3000
            })
          }
        }
      })
    }

    const formatDate = (date) => {
      if (!date) return ''
      return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    // Computed property to safely check if we're editing
    const isEditing = computed(() => {
      return editingArticle.value && editingArticle.value.id
    })

    onMounted(() => {
      fetchArticles()
    })

    return {
      articles,
      loading,
      showDialog,
      editingArticle,
      articleForm,
      isEditing,
      uploadingImage,
      openArticleDialog,
      closeDialog,
      onImageSelect,
      removeImage,
      saveArticle,
      confirmDelete,
      formatDate,
      themeStore
    }
  }
}
</script>

<style scoped>
/* Dialog styles */
:deep(.p-dialog) {
  background: rgba(30, 30, 40, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

:deep(.p-dialog-header) {
  background: rgba(255, 255, 255, 0.05) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: white !important;
}

:deep(.p-dialog-title) {
  color: white !important;
}

:deep(.p-dialog-content) {
  background: transparent !important;
  color: white !important;
}

:deep(.p-dialog-footer) {
  background: rgba(255, 255, 255, 0.05) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
}

:deep(.p-dialog-header-icon) {
  color: rgba(255, 255, 255, 0.7) !important;
}

:deep(.p-dialog-header-icon:hover) {
  color: white !important;
  background: rgba(255, 255, 255, 0.1) !important;
}

/* Ensure all form fields in dialog have the custom style */
:deep(.p-inputtext),
:deep(.p-inputtextarea),
:deep(.p-select),
:deep(.p-inputnumber-input) {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  backdrop-filter: blur(10px);
}

:deep(.p-inputtext:focus),
:deep(.p-inputtextarea:focus),
:deep(.p-select:focus),
:deep(.p-inputnumber-input:focus) {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(96, 165, 250, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(96, 165, 250, 0.25) !important;
}

:deep(.p-inputtext::placeholder),
:deep(.p-inputtextarea::placeholder) {
  color: rgba(255, 255, 255, 0.5) !important;
}

:deep(.p-select-label),
:deep(.p-placeholder) {
  color: rgba(255, 255, 255, 0.7) !important;
}

:deep(.p-select-overlay),
:deep(.p-multiselect-overlay) {
  background: rgba(30, 30, 40, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

:deep(.p-select-item),
:deep(.p-multiselect-item) {
  color: white !important;
}

:deep(.p-select-item:hover),
:deep(.p-multiselect-item:hover) {
  background: rgba(255, 255, 255, 0.1) !important;
}

:deep(.p-select-item.p-highlight),
:deep(.p-multiselect-item.p-highlight) {
  background: rgba(96, 165, 250, 0.3) !important;
  color: white !important;
}
</style>

