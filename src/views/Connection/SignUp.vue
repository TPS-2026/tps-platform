<template>
  <div class="min-h-screen text-white overflow-x-hidden relative bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50 flex items-center justify-center p-8">
    <ConnectionBackground/>
    
    <div class="relative z-10 w-full max-w-md">
      <div class="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
        <div class="mb-6 text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-white">TPS</span>
          </div>
          <h1 class="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Inscription</h1>
        </div>
        
        <form @submit.prevent="register" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2 text-white/80">Email</label>
            <InputText v-model="email" type="email" required class="w-full"/>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2 text-white/80">Mot de passe</label>
            <Password 
              v-model="password" 
              :feedback="true" 
              toggleMask 
              class="w-full" 
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2 text-white/80">Confirmer le mot de passe</label>
            <Password v-model="confirmPassword" :feedback="false" toggleMask class="w-full" required/>
          </div>
          
          <Button 
            type="submit" 
            label="S'inscrire" 
            severity="contrast" 
            class="w-full bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all"
            :loading="loading"
            :disabled="password !== confirmPassword"
          />
          
          <div class="text-center text-sm text-white/70">
            Déjà un compte ? 
            <RouterLink to="/sign-in" class="text-blue-400 hover:text-blue-300 transition-colors">Se connecter</RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {useAccountStore} from "@/stores/account.js";
import {useToast} from "primevue/usetoast";
import {ref} from "vue";
import {useRouter} from "vue-router";
import ConnectionBackground from '@/components/ConnectionBackground.vue'

export default {
  name: 'SignUp',
  components: {
    ConnectionBackground
  },
  setup() {
    const accountStore = useAccountStore()
    const router = useRouter()
    const toast = useToast()
    
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const loading = ref(false)
    
    const register = async () => {
      if (password.value !== confirmPassword.value) {
        toast.add({
          severity: 'warn',
          summary: 'Mots de passe différents',
          detail: 'Les mots de passe ne correspondent pas',
          life: 3000
        })
        return
      }
      
      loading.value = true
      try {
        await accountStore.register(email.value, password.value)
        toast.add({
          severity: 'success',
          summary: 'Inscription réussie',
          detail: 'Bienvenue !',
          life: 3000
        })
        router.push({ name: 'home' })
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Erreur d\'inscription',
          detail: 'Une erreur est survenue lors de l\'inscription',
          life: 5000
        })
      } finally {
        loading.value = false
      }
    }
    
    return {
      email,
      password,
      confirmPassword,
      loading,
      register
    }
  }
}
</script>
