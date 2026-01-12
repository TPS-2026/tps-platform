<template>
  <div class="min-h-screen text-white overflow-x-hidden relative bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50">
    <BackgroundEffects/>
    
    <div class="relative z-10 py-12 px-6 md:px-12 lg:px-24">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Gestion des articles
            </h1>
            <p class="text-white/70">Créez, modifiez et supprimez les articles et actualités</p>
          </div>
          <div class="flex gap-3">
            <Button 
              label="Retour" 
              icon="pi pi-arrow-left" 
              severity="secondary" 
              outlined
              class="border-white/30 text-white hover:bg-white/10 transition-all"
              @click="$router.push({ name: 'backoffice-dashboard' })"
            />
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
          <p class="mt-4 text-white/70">Chargement...</p>
        </div>

        <div v-else-if="articles.length === 0" class="text-center py-20 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <div class="w-24 h-24 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="pi pi-newspaper text-4xl text-purple-400/50"></i>
          </div>
          <p class="text-xl text-white/70 mb-4">Aucun article</p>
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
            v-for="article in articles" 
            :key="article.id"
            class="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 transition-all"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-xl font-semibold mb-2">{{ article.title }}</h3>
                <div class="flex items-center gap-4 mb-3">
                  <span class="text-sm text-white/60 flex items-center gap-2">
                    <i class="pi pi-calendar"></i>
                    {{ formatDate(article.publishedAt || article.createdAt) }}
                  </span>
                  <Tag v-if="article.category" :value="article.category" severity="info" class="text-xs"/>
                  <Tag v-if="article.publishedAt" :value="'Publié'" severity="success" class="text-xs"/>
                  <Tag v-else :value="'Brouillon'" severity="warning" class="text-xs"/>
                </div>
                <p class="text-white/70 line-clamp-2 mb-3">{{ article.excerpt || article.content }}</p>
              </div>
              <div class="flex gap-2 ml-4">
                <Button 
                  icon="pi pi-pencil" 
                  severity="secondary" 
                  outlined
                  rounded
                  class="border-white/30 text-white hover:bg-white/10"
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
      :header="editingArticle ? 'Modifier l\'article' : 'Nouvel article'"
      :style="{ width: '90vw', maxWidth: '800px' }"
      :modal="true"
      class="p-fluid"
    >
      <form @submit.prevent="saveArticle" class="space-y-6">
        <div>
          <label class="block text-sm font-medium mb-2">Titre *</label>
          <InputText v-model="articleForm.title" required class="w-full" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">Catégorie</label>
            <InputText v-model="articleForm.category" class="w-full" />
          </div>
          <div>
            <label class="flex items-center gap-2">
              <Checkbox v-model="articleForm.published" :binary="true" />
              <span>Publier immédiatement</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Extrait (résumé court)</label>
          <Textarea v-model="articleForm.excerpt" rows="3" class="w-full" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Contenu *</label>
          <Textarea v-model="articleForm.content" rows="10" required class="w-full" />
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <Button 
            label="Annuler" 
            severity="secondary" 
            outlined
            @click="closeDialog"
          />
          <Button 
            :label="editingArticle ? 'Modifier' : 'Créer'" 
            type="submit"
            severity="contrast"
            class="bg-gradient-to-r from-blue-500 to-purple-600 border-0"
          />
        </div>
      </form>
    </Dialog>

    <!-- Delete Confirmation -->
    <ConfirmDialog />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import axios from 'axios'
import BackgroundEffects from '@/components/BackgroundEffects.vue'

const apiBaseURL = 'http://localhost:3000/api'

export default {
  name: 'NewsManagement',
  components: {
    BackgroundEffects
  },
  setup() {
    const articles = ref([])
    const loading = ref(false)
    const showDialog = ref(false)
    const editingArticle = ref(null)
    const confirm = useConfirm()
    const toast = useToast()

    const articleForm = ref({
      title: '',
      category: '',
      excerpt: '',
      content: '',
      published: false
    })

    const fetchArticles = async () => {
      loading.value = true
      try {
        const response = await axios.get(`${apiBaseURL}/news`, {
          params: { page: 1, pageSize: 100 }
        })
        articles.value = response.data.items || response.data
      } catch (error) {
        console.error('Error fetching articles:', error)
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les articles',
          life: 3000
        })
      } finally {
        loading.value = false
      }
    }

    const openArticleDialog = (article) => {
      if (article) {
        editingArticle.value = article
        articleForm.value = {
          title: article.title || '',
          category: article.category || '',
          excerpt: article.excerpt || '',
          content: article.content || '',
          published: !!article.publishedAt
        }
      } else {
        editingArticle.value = null
        articleForm.value = {
          title: '',
          category: '',
          excerpt: '',
          content: '',
          published: false
        }
      }
      showDialog.value = true
    }

    const closeDialog = () => {
      showDialog.value = false
      editingArticle.value = null
    }

    const saveArticle = async () => {
      try {
        if (editingArticle.value) {
          await axios.put(`${apiBaseURL}/news/${editingArticle.value.id}`, articleForm.value)
          toast.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Article modifié avec succès',
            life: 3000
          })
        } else {
          await axios.post(`${apiBaseURL}/news`, articleForm.value)
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
          detail: 'Impossible de sauvegarder l\'article',
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
            await axios.delete(`${apiBaseURL}/news/${article.id}`)
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

    onMounted(() => {
      fetchArticles()
    })

    return {
      articles,
      loading,
      showDialog,
      editingArticle,
      articleForm,
      openArticleDialog,
      closeDialog,
      saveArticle,
      confirmDelete,
      formatDate
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

