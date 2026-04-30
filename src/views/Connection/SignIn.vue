<template>
  <div class="min-h-screen text-white overflow-x-hidden relative bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50 flex items-center justify-center p-8">
    <ConnectionBackground/>
    
    <div class="relative z-10 w-full max-w-md">
      <div class="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
        <div class="mb-6 text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-white">TPS</span>
          </div>
          <h1 class="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Connexion</h1>
        </div>
        
        <form @submit.prevent="login" class="space-y-4">
          <div v-if="route.query.expired" class="p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-sm text-yellow-200">
            Votre session a expiré. Veuillez vous reconnecter.
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2 text-white/80">Email</label>
            <InputText v-model="email" type="email" required class="w-full"/>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2 text-white/80">Mot de passe</label>
            <Password v-model="password" :feedback="false" toggleMask class="w-full" required/>
          </div>
          
          <div class="flex justify-between items-center">
            <RouterLink to="/forgot-password" class="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              Mot de passe oublié ?
            </RouterLink>
          </div>
          
          <Button 
            type="submit" 
            label="Se connecter" 
            severity="contrast" 
            class="w-full bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all"
            :loading="loading"
          />
          
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {useAccountStore} from "@/stores/account.js";
import {useToast} from "primevue/usetoast";
import {ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import ConnectionBackground from '@/components/ConnectionBackground.vue'

export default {
  name: 'SignIn',
  components: {
    ConnectionBackground
  },
  setup() {
    const accountStore = useAccountStore()
    const router = useRouter()
    const route = useRoute()
    const toast = useToast()
    
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    
    const login = async () => {
      loading.value = true
      try {
        await accountStore.login(email.value, password.value)
        toast.add({
          severity: 'success',
          summary: 'Connexion réussie',
          detail: 'Bienvenue !',
          life: 3000
        })
        
        // Handle redirect after login
        const next = route.query.next
        if (next) {
          // If next is a full path (starts with /), use it directly
          if (typeof next === 'string' && next.startsWith('/')) {
            router.push(next)
          } else {
            // Otherwise, treat it as a route name
            router.push({ name: next })
          }
        } else {
          // Default redirect to backoffice dashboard
          router.push({ name: 'backoffice-dashboard' })
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Email ou mot de passe incorrect'
        toast.add({
          severity: 'error',
          summary: 'Erreur de connexion',
          detail: errorMessage,
          life: 5000
        })
      } finally {
        loading.value = false
      }
    }
    
    return {
      email,
      password,
      loading,
      login,
      route
    }
  }
}
</script>
