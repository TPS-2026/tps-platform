<template>
  <div class="w-64 bg-[#101112] border-r border-[#282929] min-h-screen flex flex-col">
    <div class="p-6 border-b border-[#282929]">
      <RouterLink to="/home" class="flex items-center gap-2">
        <h1 class="text-xl font-bold text-primary">TPS</h1>
      </RouterLink>
    </div>
    
    <div class="flex-1 overflow-y-auto p-4">
      <Menu :model="menuItems" class="border-none bg-transparent"/>
    </div>
    
    <div class="p-4 border-t border-[#282929]">
      <div v-if="accountStore.accessToken" class="flex items-center gap-2 mb-4">
        <Avatar :label="accountStore.userEmail?.charAt(0).toUpperCase()" shape="circle" class="bg-primary"/>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium truncate">{{ accountStore.userEmail }}</div>
        </div>
      </div>
      <div class="flex gap-2">
        <Button 
          v-if="accountStore.accessToken" 
          label="Déconnexion" 
          severity="secondary" 
          text 
          @click="logout"
          class="flex-1"
        />
        <RouterLink v-else to="/sign-in" class="flex-1">
          <Button label="Connexion" severity="contrast" class="w-full"/>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import {useAccountStore} from "@/stores/account.js";

export default {
  name: 'MainMenu',
  setup() {
    const accountStore = useAccountStore()
    return { accountStore }
  },
  computed: {
    menuItems() {
      const routes = this.$router.options.routes.filter(r => r.displayInMenu)
      const grouped = {}
      
      routes.forEach(route => {
        const group = route.menuGroup || 'Autres'
        if (!grouped[group]) {
          grouped[group] = []
        }
        grouped[group].push({
          label: route.label || route.name,
          icon: route.icon || 'pi pi-circle',
          command: () => this.$router.push({ name: route.name })
        })
      })
      
      return Object.keys(grouped).map(group => ({
        label: group,
        items: grouped[group]
      }))
    }
  },
  methods: {
    logout() {
      this.accountStore.logout()
      this.$router.push({ name: 'landing' })
    }
  }
}
</script>

<style scoped>
:deep(.p-menu) {
  background: transparent;
  border: none;
}

:deep(.p-menuitem-link) {
  border-radius: 8px;
  margin-bottom: 4px;
}

:deep(.p-menuitem-link:hover) {
  background: #1C1D1E;
}
</style>

