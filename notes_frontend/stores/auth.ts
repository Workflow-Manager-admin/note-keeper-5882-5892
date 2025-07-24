import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    async login(email: string, password: string) {
      try {
        const config = useRuntimeConfig()
        const response = await fetch(`${config.public.apiBaseUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })

        if (!response.ok) {
          throw new Error('Login failed')
        }

        const data = await response.json()
        this.token = data.token
        this.user = data.user
        
        // Store token in localStorage
        localStorage.setItem('token', data.token)
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },

    async register(email: string, password: string) {
      try {
        const config = useRuntimeConfig()
        const response = await fetch(`${config.public.apiBaseUrl}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })

        if (!response.ok) {
          throw new Error('Registration failed')
        }

        const data = await response.json()
        this.token = data.token
        this.user = data.user
        
        // Store token in localStorage
        localStorage.setItem('token', data.token)
      } catch (error) {
        console.error('Registration error:', error)
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },

    async initAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        try {
          const config = useRuntimeConfig()
          const response = await fetch(`${config.public.apiBaseUrl}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (response.ok) {
            const data = await response.json()
            this.user = data.user
          } else {
            this.logout()
          }
        } catch (error) {
          console.error('Auth initialization error:', error)
          this.logout()
        }
      }
    }
  }
})
