import { create } from 'zustand/react'
import type { AuthUserI } from '@/shared/models/user/auth-user.model.ts'

interface AuthState {
  user: AuthUserI | null
  isInitializing: boolean
  setUser: (user: AuthUserI | null) => void
  setInitializing: (value: boolean) => void
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isInitializing: true,
  setUser: user => set({ user }),
  setInitializing: value => set({ isInitializing: value }),
}))
