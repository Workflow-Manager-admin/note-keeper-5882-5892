<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="isAuthenticated">
      <!-- Sidebar Navigation -->
      <nav class="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-30">
        <div class="px-6 py-4">
          <h1 class="text-2xl font-bold text-primary">Notes App</h1>
        </div>
        <div class="mt-6">
          <NuxtLink
            to="/notes"
            class="block px-6 py-2 text-gray-600 hover:bg-gray-100"
            active-class="bg-primary text-white"
          >
            My Notes
          </NuxtLink>
          <button
            @click="logout"
            class="block w-full text-left px-6 py-2 text-gray-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="ml-64">
        <!-- Header -->
        <header class="bg-white shadow-sm">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div class="flex justify-between items-center">
              <div class="flex-1">
                <!-- Search Bar -->
                <div class="max-w-lg">
                  <label for="search" class="sr-only">Search notes</label>
                  <div class="relative">
                    <input
                      type="text"
                      id="search"
                      v-model="searchQuery"
                      class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Search notes..."
                    />
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        class="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center">
                <span class="text-gray-700">{{ user?.email }}</span>
              </div>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NuxtPage />
        </main>
      </div>
    </div>
    <div v-else>
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useNotesStore } from '~/stores/notes'

const authStore = useAuthStore()
const notesStore = useNotesStore()

const searchQuery = ref('')
const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

// Handle search with debounce
watch(searchQuery, (newQuery) => {
  notesStore.searchNotes(newQuery)
}, { debounce: 300 })

const logout = () => {
  authStore.logout()
  navigateTo('/login')
}
</script>

<style>
:root {
  --color-primary: #4F46E5;
  --color-secondary: #64748B;
  --color-accent: #F59E42;
}

.text-primary {
  color: var(--color-primary);
}

.bg-primary {
  background-color: var(--color-primary);
}
</style>
