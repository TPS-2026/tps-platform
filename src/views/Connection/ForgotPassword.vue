<template>
  <div class="min-h-screen text-white overflow-x-hidden relative bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50 flex items-center justify-center p-8">
    <ConnectionBackground/>
    
    <div class="relative z-10 w-full max-w-md">
      <div class="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
        <div class="mb-6 text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <i class="pi pi-key text-2xl text-white"></i>
          </div>
          <h1 class="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Mot de passe oublié</h1>
        </div>
        
        <form @submit.prevent="requestReset" class="space-y-4">
          <p class="text-white/70 text-sm mb-4 text-center">
            Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>
          
          <div>
            <label class="block text-sm font-medium mb-2 text-white/80">Email</label>
            <InputText v-model="email" type="email" required class="w-full"/>
          </div>
          
          <Button 
            type="submit" 
            label="Envoyer" 
            severity="contrast" 
            class="w-full bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all"
            :loading="loading"
          />
          
          <div class="text-center">
            <RouterLink to="/sign-in" class="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              Retour à la connexion
            </RouterLink>
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
import ConnectionBackground from '@/components/ConnectionBackground.vue'

export default {
  name: 'ForgotPassword',
  components: {
    ConnectionBackground
  },
  setup() {
    const accountStore = useAccountStore()
    const toast = useToast()
    
    const email = ref('')
    const loading = ref(false)
    
    const requestReset = async () => {
      loading.value = true
      try {
        await accountStore.askResetPassword(email.value)
        toast.add({
          severity: 'success',
          summary: 'Email envoyé',
          detail: 'Vérifiez votre boîte mail pour réinitialiser votre mot de passe',
          life: 5000
        })
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Une erreur est survenue',
          life: 5000
        })
      } finally {
        loading.value = false
      }
    }
    
    return {
      email,
      loading,
      requestReset
    }
  }
}
</script>
