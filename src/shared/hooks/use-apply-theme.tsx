import { useEffect } from 'react'
import { useThemeStore } from '@/shared/store/theme-store/theme-store.ts'
import { localStorageService } from '@/shared/services/local-storage-service/local-storage.service.ts'
import type { Theme } from '@/shared/models/theme-type.ts'
import { ThemeKey } from '@/shared/constants/local-storage-constants.ts'

export function useApplyTheme() {
  const theme = useThemeStore(s => s.theme)
  const setThemeSilent = useThemeStore(s => s.setThemeSilent)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    return localStorageService.subscribe<Theme>(ThemeKey, value => {
      if (value) setThemeSilent(value)
    })
  }, [setThemeSilent])
}
