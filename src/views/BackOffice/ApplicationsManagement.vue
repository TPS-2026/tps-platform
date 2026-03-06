<template>
  <BackOfficeLayout>
    <div class="py-6 px-6 md:px-12">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold mb-2" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
              Gestion des candidatures
            </h1>
            <p :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">Consultez et gérez toutes les candidatures reçues</p>
          </div>
        </div>

        <!-- Search and Filters -->
        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <div class="flex-1 relative">
            <InputText 
              v-model="searchQuery" 
              placeholder="Rechercher par nom, email, téléphone, offre d'emploi..."
              class="w-full pr-10"
              :class="themeStore.isDark 
                ? 'bg-white/10 border-white/20 text-white placeholder:text-white/40' 
                : 'bg-white border-gray-300 text-gray-900'"
              @input="onSearch"
            />
            <i class="pi pi-search absolute right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none" 
               :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'"></i>
          </div>
          <div class="w-full md:w-48">
            <Select 
              v-model="statusFilter" 
              :options="statusOptions" 
              optionLabel="label"
              optionValue="value"
              placeholder="Filtrer par statut"
              class="w-full status-select"
              @change="() => { pagination.page = 1; fetchApplications(1); }"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center gap-2">
                  <i :class="['pi', getStatusIconForValue(slotProps.value), 'text-xs']" 
                     :style="{ color: getStatusColorForValue(slotProps.value) }"></i>
                  <span>{{ getStatusLabel(slotProps.value) }}</span>
                </div>
                <span v-else>{{ slotProps.placeholder }}</span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center gap-2">
                  <i v-if="slotProps.option.icon" :class="['pi', slotProps.option.icon, 'text-xs']" 
                     :style="{ color: slotProps.option.color ? getStatusColorForValue(slotProps.option.value) : 'inherit' }"></i>
                  <span>{{ slotProps.option.label }}</span>
                </div>
              </template>
            </Select>
          </div>
        </div>

        <div v-if="loading" class="text-center py-20">
          <ProgressSpinner size="large"/>
          <p class="mt-4 text-white/70 dark:text-gray-400">Chargement...</p>
        </div>

        <div v-else-if="applications.length === 0" class="text-center py-20 backdrop-blur-sm rounded-2xl"
             :class="themeStore.isDark
               ? 'bg-white/5 border border-white/10'
               : 'bg-white border border-gray-200'">
          <div class="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="pi pi-inbox text-4xl" :class="themeStore.isDark ? 'text-blue-400/50' : 'text-blue-500'"></i>
          </div>
          <p class="text-xl mb-4" :class="themeStore.isDark ? 'text-white/70' : 'text-gray-600'">Aucune candidature trouvée</p>
        </div>

        <div v-else>
          <!-- Results count -->
          <div class="mb-4 px-2 flex items-center justify-between">
            <p class="text-sm" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-600'">
              {{ pagination.total }} candidature{{ pagination.total > 1 ? 's' : '' }} 
              <span v-if="searchQuery || statusFilter">
                (filtrée{{ (searchQuery && statusFilter) ? 's' : '' }})
              </span>
              <span v-if="pagination.totalPages > 1" class="ml-2">
                - Page {{ pagination.page }} sur {{ pagination.totalPages }}
              </span>
            </p>
          </div>

          <!-- Table Header (Desktop) -->
          <div class="hidden md:grid md:grid-cols-12 gap-4 mb-4 px-4">
            <div class="col-span-3">
              <span class="text-sm font-semibold" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">Candidat</span>
            </div>
            <div class="col-span-2">
              <span class="text-sm font-semibold" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">Contact</span>
            </div>
            <div class="col-span-2">
              <span class="text-sm font-semibold" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">Offre</span>
            </div>
            <div class="col-span-2">
              <span class="text-sm font-semibold" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">Date</span>
            </div>
            <div class="col-span-2">
              <span class="text-sm font-semibold" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">Statut</span>
            </div>
            <div class="col-span-1 text-right">
              <span class="text-sm font-semibold" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">Actions</span>
            </div>
          </div>

          <!-- Applications List -->
          <div v-if="applications.length === 0 && !loading" class="text-center py-12 rounded-xl"
               :class="themeStore.isDark 
                 ? 'bg-white/5 border border-white/10' 
                 : 'bg-white border border-gray-200'">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                 :class="themeStore.isDark ? 'bg-blue-500/10' : 'bg-blue-50'">
              <i class="pi pi-search text-2xl" :class="themeStore.isDark ? 'text-blue-400/50' : 'text-blue-400'"></i>
            </div>
            <p class="text-lg font-medium mb-2" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">
              Aucune candidature trouvée
            </p>
            <p class="text-sm" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'">
              Essayez de modifier vos critères de recherche
            </p>
          </div>

          <div v-else class="space-y-3">
            <div 
              v-for="application in applications" 
              :key="application.id"
              class="p-4 rounded-xl transition-all hover:shadow-lg"
              :class="themeStore.isDark 
                ? 'bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30' 
                : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm'"
            >
              <!-- Mobile Layout -->
              <div class="md:hidden space-y-3">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold mb-1" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
                      {{ application.fullName }}
                    </h3>
                    <span 
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
                      :class="getStatusColor(application.status)"
                    >
                      <i :class="['pi', getStatusIcon(application.status), 'text-xs']"></i>
                      {{ getStatusLabel(application.status) }}
                    </span>
                  </div>
                  <div class="flex gap-2">
                    <Button 
                      icon="pi pi-eye" 
                      severity="secondary" 
                      outlined
                      rounded
                      size="small"
                      :class="themeStore.isDark 
                        ? 'border-white/30 text-white hover:bg-white/10' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'"
                      @click="viewApplication(application)"
                    />
                    <Button 
                      icon="pi pi-trash" 
                      severity="danger" 
                      outlined
                      rounded
                      size="small"
                      class="border-red-400/30 text-red-400 hover:bg-red-400/10"
                      @click="confirmDelete(application)"
                    />
                  </div>
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex items-center gap-2">
                    <i class="pi pi-envelope text-xs" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'"></i>
                    <span :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">{{ application.email }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="pi pi-phone text-xs" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'"></i>
                    <span :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">{{ application.phone }}</span>
                  </div>
                  <div v-if="application.jobTitle" class="flex items-center gap-2">
                    <i class="pi pi-briefcase text-xs" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'"></i>
                    <span :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'" class="line-clamp-1">{{ application.jobTitle }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="pi pi-calendar text-xs" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'"></i>
                    <span :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'">{{ formatDateShort(application.createdAt) }}</span>
                  </div>
                </div>
                <div class="pt-2 border-t" :class="themeStore.isDark ? 'border-white/10' : 'border-gray-200'">
                  <Select 
                    v-model="application.status" 
                    :options="statusOptions.filter(s => s.value !== null)" 
                    optionLabel="label"
                    optionValue="value"
                    class="w-full"
                    @change="updateApplicationStatus(application)"
                  />
                </div>
              </div>

              <!-- Desktop Layout -->
              <div class="hidden md:grid md:grid-cols-12 gap-4 items-center">
                <!-- Candidate -->
                <div class="col-span-3">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center"
                         :class="themeStore.isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'">
                      <i class="pi pi-user text-sm" :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'"></i>
                    </div>
                    <div>
                      <h3 class="font-semibold" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
                        {{ application.fullName }}
                      </h3>
                      <p v-if="application.experience !== null" class="text-xs" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'">
                        {{ application.experience }} ans d'expérience
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Contact -->
                <div class="col-span-2">
                  <div class="space-y-1">
                    <div class="flex items-center gap-2 text-sm">
                      <i class="pi pi-envelope text-xs" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'"></i>
                      <span :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'" class="truncate">{{ application.email }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                      <i class="pi pi-phone text-xs" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'"></i>
                      <span :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">{{ application.phone }}</span>
                    </div>
                  </div>
                </div>

                <!-- Job -->
                <div class="col-span-2">
                  <div v-if="application.jobTitle" class="flex items-center gap-2">
                    <i class="pi pi-briefcase text-xs" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'"></i>
                    <span :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'" class="line-clamp-1 text-sm">{{ application.jobTitle }}</span>
                  </div>
                  <span v-else class="text-sm" :class="themeStore.isDark ? 'text-white/40' : 'text-gray-400'">-</span>
                </div>

                <!-- Date -->
                <div class="col-span-2">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="pi pi-calendar text-xs" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'"></i>
                    <span :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">{{ formatDateShort(application.createdAt) }}</span>
                  </div>
                </div>

                <!-- Status -->
                <div class="col-span-2">
                  <Select 
                    v-model="application.status" 
                    :options="statusOptions.filter(s => s.value !== null)" 
                    optionLabel="label"
                    optionValue="value"
                    class="w-full status-select"
                    @change="updateApplicationStatus(application)"
                  >
                    <template #value="slotProps">
                      <div v-if="slotProps.value" class="flex items-center gap-2">
                        <i :class="['pi', getStatusIconForValue(slotProps.value), 'text-xs']" 
                           :style="{ color: getStatusColorForValue(slotProps.value) }"></i>
                        <span>{{ getStatusLabel(slotProps.value) }}</span>
                      </div>
                      <span v-else>{{ slotProps.placeholder }}</span>
                    </template>
                    <template #option="slotProps">
                      <div class="flex items-center gap-2">
                        <i :class="['pi', slotProps.option.icon, 'text-xs']" 
                           :style="{ color: getStatusColorForValue(slotProps.option.value) }"></i>
                        <span>{{ slotProps.option.label }}</span>
                      </div>
                    </template>
                  </Select>
                </div>

                <!-- Actions -->
                <div class="col-span-1 flex justify-end gap-2">
                  <Button 
                    icon="pi pi-eye" 
                    severity="secondary" 
                    outlined
                    rounded
                    size="small"
                    :class="themeStore.isDark 
                      ? 'border-white/30 text-white hover:bg-white/10' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'"
                    @click="viewApplication(application)"
                    v-tooltip.top="'Voir les détails'"
                  />
                  <Button 
                    icon="pi pi-trash" 
                    severity="danger" 
                    outlined
                    rounded
                    size="small"
                    class="border-red-400/30 text-red-400 hover:bg-red-400/10"
                    @click="confirmDelete(application)"
                    v-tooltip.top="'Supprimer'"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="pagination.totalPages > 1" class="mt-6 flex justify-center">
            <Paginator
              :rows="pagination.pageSize"
              :totalRecords="pagination.total"
              :first="(pagination.page - 1) * pagination.pageSize"
              @page="onPageChange"
              :class="themeStore.isDark 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white border-gray-200 shadow-sm'"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Application Details Dialog -->
    <Dialog 
      v-model:visible="showDetailsDialog" 
      :header="selectedApplication ? `Candidature de ${selectedApplication.fullName}` : 'Détails de la candidature'"
      :style="{ width: '90vw', maxWidth: '800px' }"
      :modal="true"
      class="application-details-dialog"
    >
      <div v-if="selectedApplication" class="space-y-6">
        <!-- Header with Status -->
        <div class="flex items-center justify-between pb-4 border-b" :class="themeStore.isDark ? 'border-white/10' : 'border-gray-200'">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full flex items-center justify-center"
                 :class="themeStore.isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'">
              <i class="pi pi-user text-xl" :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'"></i>
            </div>
            <div>
              <h3 class="text-xl font-semibold" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
                {{ selectedApplication.fullName }}
              </h3>
              <span 
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border mt-2"
                :class="getStatusColor(selectedApplication.status)"
              >
                <i :class="['pi', getStatusIcon(selectedApplication.status), 'text-sm']"></i>
                {{ getStatusLabel(selectedApplication.status) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div>
          <h4 class="text-sm font-semibold mb-3 flex items-center gap-2" :class="themeStore.isDark ? 'text-white/90' : 'text-gray-900'">
            <i class="pi pi-info-circle"></i>
            Informations de contact
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg"
               :class="themeStore.isDark ? 'bg-white/5' : 'bg-gray-50'">
            <div>
              <p class="text-xs font-medium mb-1" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'">Email</p>
              <div class="flex items-center gap-2">
                <i class="pi pi-envelope text-xs" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-400'"></i>
                <a :href="`mailto:${selectedApplication.email}`" 
                   class="text-sm hover:underline"
                   :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'">
                  {{ selectedApplication.email }}
                </a>
              </div>
            </div>
            <div>
              <p class="text-xs font-medium mb-1" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'">Téléphone</p>
              <div class="flex items-center gap-2">
                <i class="pi pi-phone text-xs" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-400'"></i>
                <a :href="`tel:${selectedApplication.phone}`" 
                   class="text-sm hover:underline"
                   :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'">
                  {{ selectedApplication.phone }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Job and Experience -->
        <div>
          <h4 class="text-sm font-semibold mb-3 flex items-center gap-2" :class="themeStore.isDark ? 'text-white/90' : 'text-gray-900'">
            <i class="pi pi-briefcase"></i>
            Informations professionnelles
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg"
               :class="themeStore.isDark ? 'bg-white/5' : 'bg-gray-50'">
            <div v-if="selectedApplication.jobTitle">
              <p class="text-xs font-medium mb-1" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'">Offre d'emploi</p>
              <p class="text-sm" :class="themeStore.isDark ? 'text-white/90' : 'text-gray-900'">{{ selectedApplication.jobTitle }}</p>
            </div>
            <div v-if="selectedApplication.experience !== null">
              <p class="text-xs font-medium mb-1" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'">Expérience</p>
              <p class="text-sm" :class="themeStore.isDark ? 'text-white/90' : 'text-gray-900'">{{ selectedApplication.experience }} ans</p>
            </div>
            <div v-if="selectedApplication.availability">
              <p class="text-xs font-medium mb-1" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'">Disponibilité</p>
              <p class="text-sm" :class="themeStore.isDark ? 'text-white/90' : 'text-gray-900'">{{ formatDate(selectedApplication.availability) }}</p>
            </div>
            <div>
              <p class="text-xs font-medium mb-1" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'">Date de candidature</p>
              <p class="text-sm" :class="themeStore.isDark ? 'text-white/90' : 'text-gray-900'">{{ formatDate(selectedApplication.createdAt) }}</p>
            </div>
          </div>
        </div>

        <!-- Cover Letter -->
        <div v-if="selectedApplication.coverLetter">
          <h4 class="text-sm font-semibold mb-3 flex items-center gap-2" :class="themeStore.isDark ? 'text-white/90' : 'text-gray-900'">
            <i class="pi pi-file-edit"></i>
            Lettre de motivation
          </h4>
          <div class="p-4 rounded-lg max-h-64 overflow-y-auto"
               :class="themeStore.isDark ? 'bg-white/5' : 'bg-gray-50'">
            <p class="text-sm whitespace-pre-wrap leading-relaxed" :class="themeStore.isDark ? 'text-white/80' : 'text-gray-700'">
              {{ selectedApplication.coverLetter }}
            </p>
          </div>
        </div>

        <!-- CV -->
        <div v-if="selectedApplication.cvFileName">
          <h4 class="text-sm font-semibold mb-3 flex items-center gap-2" :class="themeStore.isDark ? 'text-white/90' : 'text-gray-900'">
            <i class="pi pi-file"></i>
            CV
          </h4>
          <div class="p-4 rounded-lg flex items-center justify-between"
               :class="themeStore.isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center"
                   :class="themeStore.isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'">
                <i class="pi pi-file-pdf text-lg" :class="themeStore.isDark ? 'text-blue-400' : 'text-blue-600'"></i>
              </div>
              <div>
                <p class="text-sm font-medium" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
                  {{ selectedApplication.cvFileName }}
                </p>
                <p v-if="selectedApplication.cvFileSize" class="text-xs" :class="themeStore.isDark ? 'text-white/60' : 'text-gray-500'">
                  {{ formatFileSize(selectedApplication.cvFileSize) }}
                </p>
              </div>
            </div>
            <Button 
              label="Télécharger" 
              icon="pi pi-download"
              severity="secondary"
              outlined
              size="small"
              @click="downloadCV(selectedApplication)"
              v-tooltip.top="'Télécharger le CV'"
            />
          </div>
        </div>
      </div>
    </Dialog>
  </BackOfficeLayout>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import apiClient from '@/utils/axios.js'
import BackOfficeLayout from './BackOfficeLayout.vue'
import { useThemeStore } from '@/stores/theme.js'

export default {
  name: 'ApplicationsManagement',
  components: {
    BackOfficeLayout
  },
  setup() {
    const applications = ref([])
    const loading = ref(false)
    const statusFilter = ref(null)
    const searchQuery = ref('')
    const showDetailsDialog = ref(false)
    const selectedApplication = ref(null)
    const confirm = useConfirm()
    const toast = useToast()
    const themeStore = useThemeStore()
    
    // Pagination
    const pagination = ref({
      page: 1,
      pageSize: 20,
      total: 0,
      totalPages: 0
    })
    
    // Debounce search
    let searchTimeout = null

    const statusOptions = computed(() => [
      { label: 'Tous', value: null, icon: 'pi-filter' },
      { label: 'En attente', value: 'pending', icon: 'pi-clock', color: 'yellow' },
      { label: 'Examinée', value: 'reviewed', icon: 'pi-eye', color: 'blue' },
      { label: 'Acceptée', value: 'accepted', icon: 'pi-check-circle', color: 'green' },
      { label: 'Refusée', value: 'rejected', icon: 'pi-times-circle', color: 'red' }
    ])

    const fetchApplications = async (page = 1) => {
      loading.value = true
      try {
        const params = {
          page,
          pageSize: pagination.value.pageSize
        }
        if (statusFilter.value) {
          params.status = statusFilter.value
        }
        if (searchQuery.value && searchQuery.value.trim()) {
          params.search = searchQuery.value.trim()
        }
        
        const response = await apiClient.get('/applications', { params })
        
        if (response.data && response.data.hasOwnProperty('items')) {
          // Paginated response (items can be null when empty in Go)
          applications.value = response.data.items || []
          pagination.value = {
            page: response.data.page || page,
            pageSize: response.data.pageSize || pagination.value.pageSize,
            total: response.data.total || 0,
            totalPages: response.data.totalPages || 0
          }
        } else {
          // Legacy format (array)
          applications.value = response.data
          pagination.value = {
            page: 1,
            pageSize: pagination.value.pageSize,
            total: response.data.length,
            totalPages: Math.ceil(response.data.length / pagination.value.pageSize)
          }
        }
      } catch (error) {
        console.error('Error fetching applications:', error)
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les candidatures',
          life: 3000
        })
      } finally {
        loading.value = false
      }
    }

    const onSearch = () => {
      // Debounce search - wait 500ms after user stops typing
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
      searchTimeout = setTimeout(() => {
        pagination.value.page = 1 // Reset to first page on search
        fetchApplications(1)
      }, 500)
    }

    const onPageChange = (event) => {
      fetchApplications(event.page + 1) // PrimeVue Paginator uses 0-based index
    }

    const updateApplicationStatus = async (application) => {
      try {
        await apiClient.put(`/applications/${application.id}`, {
          status: application.status
        })
        toast.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Statut mis à jour avec succès',
          life: 3000
        })
        await fetchApplications(pagination.value.page)
      } catch (error) {
        console.error('Error updating application:', error)
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de mettre à jour le statut',
          life: 3000
        })
        // Revert the change
        await fetchApplications(pagination.value.page)
      }
    }

    const viewApplication = (application) => {
      selectedApplication.value = application
      showDetailsDialog.value = true
    }

    const confirmDelete = (application) => {
      confirm.require({
        message: `Êtes-vous sûr de vouloir supprimer la candidature de ${application.fullName} ?`,
        accept: async () => {
          try {
            await apiClient.delete(`/applications/${application.id}`)
            toast.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Candidature supprimée avec succès',
              life: 3000
            })
            await fetchApplications(pagination.value.page)
          } catch (error) {
            console.error('Error deleting application:', error)
            toast.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Impossible de supprimer la candidature',
              life: 3000
            })
          }
        }
      })
    }

    const getStatusLabel = (status) => {
      const labels = {
        'pending': 'En attente',
        'reviewed': 'Examinée',
        'accepted': 'Acceptée',
        'rejected': 'Refusée'
      }
      return labels[status] || status
    }

    const getStatusSeverity = (status) => {
      const severities = {
        'pending': 'warning',
        'reviewed': 'info',
        'accepted': 'success',
        'rejected': 'danger'
      }
      return severities[status] || 'secondary'
    }

    const getStatusColor = (status) => {
      const colors = {
        'pending': themeStore.isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-50 text-yellow-700 border-yellow-200',
        'reviewed': themeStore.isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200',
        'accepted': themeStore.isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-50 text-green-700 border-green-200',
        'rejected': themeStore.isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-50 text-red-700 border-red-200'
      }
      return colors[status] || (themeStore.isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-50 text-gray-700 border-gray-200')
    }

    const getStatusIcon = (status) => {
      const icons = {
        'pending': 'pi-clock',
        'reviewed': 'pi-eye',
        'accepted': 'pi-check-circle',
        'rejected': 'pi-times-circle'
      }
      return icons[status] || 'pi-circle'
    }

    const getStatusIconForValue = (value) => {
      const option = statusOptions.value.find(opt => opt.value === value)
      return option?.icon || 'pi-circle'
    }

    const getStatusColorForValue = (value) => {
      if (!value) return themeStore.isDark ? '#9ca3af' : '#6b7280'
      const colors = {
        'pending': themeStore.isDark ? '#eab308' : '#ca8a04',
        'reviewed': themeStore.isDark ? '#3b82f6' : '#2563eb',
        'accepted': themeStore.isDark ? '#22c55e' : '#16a34a',
        'rejected': themeStore.isDark ? '#ef4444' : '#dc2626'
      }
      return colors[value] || (themeStore.isDark ? '#9ca3af' : '#6b7280')
    }

    const formatDate = (date) => {
      if (!date) return ''
      return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const formatDateShort = (date) => {
      if (!date) return ''
      return new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }

    const formatFileSize = (bytes) => {
      if (!bytes) return ''
      if (bytes < 1024) return bytes + ' B'
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
    }

    const downloadCV = async (application) => {
      if (!application.cvFileName) {
        toast.add({
          severity: 'warn',
          summary: 'Aucun CV',
          detail: 'Aucun CV disponible pour cette candidature',
          life: 3000
        })
        return
      }

      try {
        // Check if cvFileName is a URL (presigned or public)
        // Supports AWS S3, Railway Storage, and other S3-compatible services
        const isUrl = application.cvFileName.startsWith('http://') || 
                     application.cvFileName.startsWith('https://')
        
        if (isUrl) {
          // Open URL directly (presigned URLs are already valid)
          window.open(application.cvFileName, '_blank')
        } else {
          // Legacy: if it's just a filename, try to construct URL
          // This shouldn't happen with new uploads, but handle gracefully
          toast.add({
            severity: 'warn',
            summary: 'CV non disponible',
            detail: 'Le CV n\'est pas disponible en ligne',
            life: 3000
          })
        }
      } catch (error) {
        console.error('Error downloading CV:', error)
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de télécharger le CV',
          life: 3000
        })
      }
    }

    onMounted(() => {
      fetchApplications(1)
    })

      return {
      applications,
      loading,
      statusFilter,
      searchQuery,
      statusOptions,
      pagination,
      showDetailsDialog,
      selectedApplication,
      fetchApplications,
      onSearch,
      onPageChange,
      updateApplicationStatus,
      viewApplication,
      confirmDelete,
      downloadCV,
      getStatusLabel,
      getStatusSeverity,
      getStatusColor,
      getStatusIcon,
      getStatusIconForValue,
      getStatusColorForValue,
      formatDate,
      formatDateShort,
      formatFileSize,
      themeStore
    }
  }
}
</script>

<style scoped>
/* Dialog styles */
:deep(.application-details-dialog .p-dialog) {
  background: rgba(30, 30, 40, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

:deep(.application-details-dialog .p-dialog-header) {
  background: rgba(255, 255, 255, 0.05) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: white !important;
}

:deep(.application-details-dialog .p-dialog-title) {
  color: white !important;
}

:deep(.application-details-dialog .p-dialog-content) {
  background: transparent !important;
  color: white !important;
}

:deep(.p-select),
:deep(.p-select-label) {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
}

:deep(.p-select-overlay) {
  background: rgba(30, 30, 40, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

:deep(.p-select-item) {
  color: white !important;
}

:deep(.p-select-item:hover) {
  background: rgba(255, 255, 255, 0.1) !important;
}

/* Status select colors */
:deep(.status-select .p-select-label) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

:deep(.status-select .p-select-item) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Light mode select styles */
:deep(.light .p-select),
:deep(.light .p-select-label) {
  background: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  color: #374151 !important;
}

:deep(.light .p-select-overlay) {
  background: rgba(255, 255, 255, 0.98) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
}

:deep(.light .p-select-item) {
  color: #374151 !important;
}

:deep(.light .p-select-item:hover) {
  background: rgba(0, 0, 0, 0.05) !important;
}

/* Light mode dialog styles */
:deep(.light .application-details-dialog .p-dialog) {
  background: rgba(255, 255, 255, 0.98) !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
}

:deep(.light .application-details-dialog .p-dialog-header) {
  background: rgba(0, 0, 0, 0.02) !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
  color: #1f2937 !important;
}

:deep(.light .application-details-dialog .p-dialog-title) {
  color: #1f2937 !important;
}

:deep(.light .application-details-dialog .p-dialog-content) {
  background: transparent !important;
  color: #374151 !important;
}
</style>

