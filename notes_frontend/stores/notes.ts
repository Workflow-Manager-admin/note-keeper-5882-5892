import { defineStore } from 'pinia'

interface Note {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string
}

interface NotesState {
  notes: Note[]
  searchResults: Note[]
  currentNote: Note | null
  loading: boolean
}

export const useNotesStore = defineStore('notes', {
  state: (): NotesState => ({
    notes: [],
    searchResults: [],
    currentNote: null,
    loading: false
  }),

  getters: {
    displayedNotes: (state) => 
      state.searchResults.length > 0 ? state.searchResults : state.notes
  },

  actions: {
    async fetchNotes() {
      this.loading = true
      try {
        const config = useRuntimeConfig()
        const authStore = useAuthStore()
        
        const response = await fetch(`${config.public.apiBaseUrl}/notes`, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch notes')
        }

        const data = await response.json()
        this.notes = data
        this.searchResults = []
      } catch (error) {
        console.error('Fetch notes error:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async createNote(title: string, content: string) {
      try {
        const config = useRuntimeConfig()
        const authStore = useAuthStore()
        
        const response = await fetch(`${config.public.apiBaseUrl}/notes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.token}`
          },
          body: JSON.stringify({ title, content })
        })

        if (!response.ok) {
          throw new Error('Failed to create note')
        }

        const newNote = await response.json()
        this.notes.unshift(newNote)
      } catch (error) {
        console.error('Create note error:', error)
        throw error
      }
    },

    async updateNote(noteId: string, title: string, content: string) {
      try {
        const config = useRuntimeConfig()
        const authStore = useAuthStore()
        
        const response = await fetch(`${config.public.apiBaseUrl}/notes/${noteId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.token}`
          },
          body: JSON.stringify({ title, content })
        })

        if (!response.ok) {
          throw new Error('Failed to update note')
        }

        const updatedNote = await response.json()
        const index = this.notes.findIndex(note => note.id === noteId)
        if (index !== -1) {
          this.notes[index] = updatedNote
        }
      } catch (error) {
        console.error('Update note error:', error)
        throw error
      }
    },

    async deleteNote(noteId: string) {
      try {
        const config = useRuntimeConfig()
        const authStore = useAuthStore()
        
        const response = await fetch(`${config.public.apiBaseUrl}/notes/${noteId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to delete note')
        }

        this.notes = this.notes.filter(note => note.id !== noteId)
        this.searchResults = this.searchResults.filter(note => note.id !== noteId)
      } catch (error) {
        console.error('Delete note error:', error)
        throw error
      }
    },

    searchNotes(query: string) {
      if (!query.trim()) {
        this.searchResults = []
        return
      }

      const searchTerm = query.toLowerCase()
      this.searchResults = this.notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm) ||
        note.content.toLowerCase().includes(searchTerm)
      )
    }
  }
})
