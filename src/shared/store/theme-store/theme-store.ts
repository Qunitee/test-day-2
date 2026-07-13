import { Theme } from '@/shared/models/theme-type.ts'
import { create } from 'zustand/react'
import { localStorageService } from '@/shared/services/local-storage-service/local-storage.service.ts'
import { ThemeKey } from '@/shared/constants/local-storage-constants.ts'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  setThemeSilent: (theme: Theme) => void
  toggleTheme: () => void
}

const initialTheme = localStorageService.getItem<Theme>(ThemeKey) || Theme.Light

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: initialTheme,
  setTheme: theme => {
    localStorageService.setItem(ThemeKey, theme)
    set({ theme })
  },
  setThemeSilent: theme => set({ theme }),
  toggleTheme: () => {
    const next = get().theme === Theme.Light ? Theme.Dark : Theme.Light
    localStorageService.setItem(ThemeKey, next)
    set({ theme: next })
  },
}))
