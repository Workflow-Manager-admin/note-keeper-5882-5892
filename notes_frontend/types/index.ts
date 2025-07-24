export interface User {
  id: string;
  email: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface NotesState {
  notes: Note[];
  searchResults: Note[];
  currentNote: Note | null;
  loading: boolean;
}
