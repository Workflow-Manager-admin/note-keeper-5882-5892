export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  
  // Initialize auth state on app start
  if (process.client) {
    await authStore.initAuth()
  }
})
