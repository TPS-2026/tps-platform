<template>
  <div class="min-h-screen text-white overflow-x-hidden relative bg-gradient-to-br from-purple-900/30 via-blue-900/40 to-indigo-900/50 flex items-center justify-center p-8">
    <ConnectionBackground/>
    
    <div class="relative z-10 w-full max-w-md">
      <div class="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
        <div class="mb-6 text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <i class="pi pi-lock text-2xl text-white"></i>
          </div>
          <h1 class="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Réinitialiser le mot de passe</h1>
        </div>
        
        <form @submit.prevent="resetPassword" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2 text-white/80">Code de réinitialisation</label>
            <InputText v-model="code" required class="w-full"/>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2 text-white/80">Nouveau mot de passe</label>
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
            label="Réinitialiser" 
            severity="contrast" 
            class="w-full bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all"
            :loading="loading"
            :disabled="password !== confirmPassword"
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
import {useRouter} from "vue-router";
import ConnectionBackground from '@/components/ConnectionBackground.vue'

export default {
  name: 'ResetPassword',
  components: {
    ConnectionBackground
  },
  setup() {
    const accountStore = useAccountStore()
    const router = useRouter()
    const toast = useToast()
    
    const code = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const loading = ref(false)
    
    const resetPassword = async () => {
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
        await accountStore.submitResetPassword(code.value, password.value)
        toast.add({
          severity: 'success',
          summary: 'Mot de passe réinitialisé',
          detail: 'Vous pouvez maintenant vous connecter',
          life: 5000
        })
        router.push({ name: 'sign-in' })
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Code invalide ou expiré',
          life: 5000
        })
      } finally {
        loading.value = false
      }
    }
    
    return {
      code,
      password,
      confirmPassword,
      loading,
      resetPassword
    }
  }
}
</script>
