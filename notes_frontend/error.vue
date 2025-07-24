<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        {{ error.statusCode === 404 ? 'Page Not Found' : 'An Error Occurred' }}
      </h1>
      <p class="text-lg text-gray-600 mb-8">
        {{ error.message }}
      </p>
      <button
        @click="handleError"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Return to Home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
})

const handleError = () => {
  clearError()
  navigateTo('/')
}
</script>
