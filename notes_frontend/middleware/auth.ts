export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // Initialize auth state if needed
  if (process.client && !authStore.isAuthenticated) {
    authStore.initAuth()
  }

  // Allow access to auth pages
  if (to.path === '/login' || to.path === '/register') {
    if (authStore.isAuthenticated) {
      return navigateTo('/notes')
    }
    return
  }

  // Protect other routes
  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})
