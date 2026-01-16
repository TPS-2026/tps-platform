<template>
  <BackOfficeLayout>
    <div class="p-6">
      <!-- Header -->
      <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
            Gestion des utilisateurs
          </h1>
          <p class="text-sm mt-1" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'">
            Gérez les utilisateurs du système
          </p>
        </div>
        <Button
          label="Nouvel utilisateur"
          icon="pi pi-plus"
          @click="openCreateDialog"
          class="w-full md:w-auto"
        />
      </div>

      <!-- Filters -->
      <div class="mb-6 p-4 rounded-lg" :class="themeStore.isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">
              Recherche
            </label>
            <InputText
              v-model="searchQuery"
              placeholder="Email, nom..."
              class="w-full"
              @input="debouncedSearch"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">
              Rôle
            </label>
            <Select
              v-model="filters.role"
              :options="roleOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Tous les rôles"
              class="w-full"
              @change="() => { pagination.page = 1; fetchUsers(1); }"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">
              Statut
            </label>
            <Select
              v-model="filters.blocked"
              :options="blockedOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Tous"
              class="w-full"
              @change="() => { pagination.page = 1; fetchUsers(1); }"
            />
          </div>
          <div class="flex items-end">
            <Button
              label="Réinitialiser"
              severity="secondary"
              outlined
              icon="pi pi-refresh"
              @click="resetFilters"
              class="w-full"
            />
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="rounded-lg overflow-hidden" :class="themeStore.isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'">
        <DataTable
          :value="users"
          :loading="loading"
          :paginator="true"
          :rows="pagination.pageSize"
          :totalRecords="pagination.total"
          :first="(pagination.page - 1) * pagination.pageSize"
          @page="onPageChange"
          :rowsPerPageOptions="[10, 25, 50]"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :currentPageReportTemplate="`${pagination.total} utilisateur${pagination.total > 1 ? 's' : ''}`"
          responsiveLayout="scroll"
        >
          <Column field="email" header="Email" sortable>
            <template #body="{ data }">
              <div class="flex items-center gap-2">
                <span>{{ data.email }}</span>
                <Tag v-if="data.blocked" value="Bloqué" severity="danger" class="text-xs" />
                <Tag v-else value="Actif" severity="success" class="text-xs" />
              </div>
            </template>
          </Column>
          <Column field="fullName" header="Nom complet" sortable>
            <template #body="{ data }">
              {{ data.fullName || '-' }}
            </template>
          </Column>
          <Column field="role" header="Rôle" sortable>
            <template #body="{ data }">
              <Tag
                :value="data.role === 'admin' ? 'Administrateur' : 'Utilisateur'"
                :severity="data.role === 'admin' ? 'warning' : 'info'"
              />
            </template>
          </Column>
          <Column field="createdAt" header="Date de création" sortable>
            <template #body="{ data }">
              {{ formatDate(data.createdAt) }}
            </template>
          </Column>
          <Column header="Actions" :exportable="false" style="min-width: 200px">
            <template #body="{ data }">
              <div class="flex gap-2">
                <Button
                  icon="pi pi-pencil"
                  severity="info"
                  text
                  rounded
                  v-tooltip.top="'Modifier'"
                  @click="openEditDialog(data)"
                />
                <Button
                  v-if="!data.blocked"
                  icon="pi pi-ban"
                  severity="warning"
                  text
                  rounded
                  v-tooltip.top="'Bloquer'"
                  @click="blockUser(data)"
                />
                <Button
                  v-else
                  icon="pi pi-check"
                  severity="success"
                  text
                  rounded
                  v-tooltip.top="'Débloquer'"
                  @click="unblockUser(data)"
                />
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  text
                  rounded
                  v-tooltip.top="'Supprimer'"
                  @click="confirmDelete(data)"
                  :disabled="data.id === currentUserId"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- Create/Edit Dialog -->
      <Dialog
        v-model:visible="dialogVisible"
        :header="editingUser ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'"
        :modal="true"
        :style="{ width: '500px' }"
        :class="themeStore.isDark ? 'dark-dialog' : ''"
      >
        <form @submit.prevent="saveUser" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">
              Email *
            </label>
            <InputText
              v-model="userForm.email"
              type="email"
              required
              :disabled="!!editingUser"
              class="w-full"
            />
          </div>
          <div v-if="!editingUser">
            <label class="block text-sm font-medium mb-2" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">
              Mot de passe *
            </label>
            <Password
              v-model="userForm.password"
              :feedback="false"
              toggleMask
              required
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">
              Nom complet
            </label>
            <InputText
              v-model="userForm.fullName"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">
              Rôle *
            </label>
            <Select
              v-model="userForm.role"
              :options="roleOptions"
              optionLabel="label"
              optionValue="value"
              required
              class="w-full"
            />
          </div>
          <div class="flex justify-end gap-2 pt-4">
            <Button
              label="Annuler"
              severity="secondary"
              outlined
              @click="closeDialog"
            />
            <Button
              type="submit"
              label="Enregistrer"
              :loading="saving"
            />
          </div>
        </form>
      </Dialog>
    </div>
  </BackOfficeLayout>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import apiClient from '@/utils/axios.js'
import BackOfficeLayout from './BackOfficeLayout.vue'
import { useThemeStore } from '@/stores/theme.js'
import { useAccountStore } from '@/stores/account.js'

export default {
  name: 'UsersManagement',
  components: {
    BackOfficeLayout
  },
  setup() {
    const themeStore = useThemeStore()
    const accountStore = useAccountStore()
    const confirm = useConfirm()
    const toast = useToast()

    const users = ref([])
    const loading = ref(false)
    const saving = ref(false)
    const dialogVisible = ref(false)
    const editingUser = ref(null)

    const searchQuery = ref('')
    const filters = ref({
      role: null,
      blocked: null
    })

    const pagination = ref({
      page: 1,
      pageSize: 10,
      total: 0,
      totalPages: 0
    })

    const userForm = ref({
      email: '',
      password: '',
      fullName: '',
      role: 'admin'
    })

    const roleOptions = [
      { label: 'Administrateur', value: 'admin' },
      { label: 'Utilisateur', value: 'user' }
    ]

    const blockedOptions = [
      { label: 'Tous', value: null },
      { label: 'Actifs', value: 'false' },
      { label: 'Bloqués', value: 'true' }
    ]

    const currentUserId = computed(() => accountStore.userID)

    let searchTimeout = null
    const debouncedSearch = () => {
      clearTimeout(searchTimeout)
      searchTimeout = setTimeout(() => {
        pagination.value.page = 1
        fetchUsers(1)
      }, 500)
    }

    const fetchUsers = async (page = 1) => {
      loading.value = true
      try {
        const params = {
          page,
          pageSize: pagination.value.pageSize
        }

        if (filters.value.role) {
          params.role = filters.value.role
        }
        if (filters.value.blocked !== null) {
          params.blocked = filters.value.blocked
        }
        if (searchQuery.value) {
          params.search = searchQuery.value
        }

        const response = await apiClient.get('/users', { params })

        if (response.data.items) {
          users.value = response.data.items
          pagination.value = {
            page: response.data.page || page,
            pageSize: response.data.pageSize || pagination.value.pageSize,
            total: response.data.total || 0,
            totalPages: response.data.totalPages || 0
          }
        } else {
          users.value = response.data || []
          pagination.value = {
            page: page,
            pageSize: pagination.value.pageSize,
            total: response.data.length || 0,
            totalPages: Math.ceil((response.data.length || 0) / pagination.value.pageSize)
          }
        }
      } catch (error) {
        console.error('Error fetching users:', error)
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: error.response?.data?.message || 'Erreur lors du chargement des utilisateurs',
          life: 5000
        })
        users.value = []
      } finally {
        loading.value = false
      }
    }

    const onPageChange = (event) => {
      pagination.value.page = event.page + 1
      fetchUsers(event.page + 1)
    }

    const openCreateDialog = () => {
      editingUser.value = null
      userForm.value = {
        email: '',
        password: '',
        fullName: '',
        role: 'admin'
      }
      dialogVisible.value = true
    }

    const openEditDialog = (user) => {
      editingUser.value = user
      userForm.value = {
        email: user.email,
        password: '',
        fullName: user.fullName || '',
        role: user.role
      }
      dialogVisible.value = true
    }

    const closeDialog = () => {
      dialogVisible.value = false
      editingUser.value = null
      userForm.value = {
        email: '',
        password: '',
        fullName: '',
        role: 'admin'
      }
    }

    const saveUser = async () => {
      saving.value = true
      try {
        if (editingUser.value) {
          // Update user
          await apiClient.put(
            `/users/${editingUser.value.id}`,
            {
              fullName: userForm.value.fullName,
              role: userForm.value.role
            }
          )
          toast.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Utilisateur modifié avec succès',
            life: 3000
          })
        } else {
          // Create user
          await apiClient.post('/users', userForm.value)
          toast.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Utilisateur créé avec succès',
            life: 3000
          })
        }
        closeDialog()
        await fetchUsers(pagination.value.page)
      } catch (error) {
        console.error('Error saving user:', error)
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: error.response?.data?.message || 'Erreur lors de l\'enregistrement',
          life: 5000
        })
      } finally {
        saving.value = false
      }
    }

    const blockUser = async (user) => {
      try {
        await apiClient.post(`/users/${user.id}/block`, {})
        toast.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Utilisateur bloqué',
          life: 3000
        })
        await fetchUsers(pagination.value.page)
      } catch (error) {
        console.error('Error blocking user:', error)
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: error.response?.data?.message || 'Erreur lors du blocage',
          life: 5000
        })
      }
    }

    const unblockUser = async (user) => {
      try {
        await apiClient.post(`/users/${user.id}/unblock`, {})
        toast.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Utilisateur débloqué',
          life: 3000
        })
        await fetchUsers(pagination.value.page)
      } catch (error) {
        console.error('Error unblocking user:', error)
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: error.response?.data?.message || 'Erreur lors du déblocage',
          life: 5000
        })
      }
    }

    const confirmDelete = (user) => {
      if (user.id === currentUserId.value) {
        toast.add({
          severity: 'warn',
          summary: 'Attention',
          detail: 'Vous ne pouvez pas supprimer votre propre compte',
          life: 5000
        })
        return
      }

      confirm.require({
        message: `Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.email} ?`,
        header: 'Confirmation de suppression',
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        accept: async () => {
          try {
            await apiClient.delete(`/users/${user.id}`)
            toast.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Utilisateur supprimé',
              life: 3000
            })
            await fetchUsers(pagination.value.page)
          } catch (error) {
            console.error('Error deleting user:', error)
            toast.add({
              severity: 'error',
              summary: 'Erreur',
              detail: error.response?.data?.message || 'Erreur lors de la suppression',
              life: 5000
            })
          }
        }
      })
    }

    const resetFilters = () => {
      searchQuery.value = ''
      filters.value = {
        role: null,
        blocked: null
      }
      pagination.value.page = 1
      fetchUsers(1)
    }

    const formatDate = (dateString) => {
      if (!dateString) return '-'
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    onMounted(() => {
      fetchUsers(1)
    })

    return {
      themeStore,
      accountStore,
      users,
      loading,
      saving,
      dialogVisible,
      editingUser,
      searchQuery,
      filters,
      pagination,
      userForm,
      roleOptions,
      blockedOptions,
      currentUserId,
      debouncedSearch,
      fetchUsers,
      onPageChange,
      openCreateDialog,
      openEditDialog,
      closeDialog,
      saveUser,
      blockUser,
      unblockUser,
      confirmDelete,
      resetFilters,
      formatDate
    }
  }
}
</script>

