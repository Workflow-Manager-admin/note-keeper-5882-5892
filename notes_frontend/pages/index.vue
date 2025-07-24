<script setup lang="ts">
// Redirect to notes page
if (process.client) {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    navigateTo('/notes')
  } else {
    navigateTo('/login')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
  </div>
</template>
