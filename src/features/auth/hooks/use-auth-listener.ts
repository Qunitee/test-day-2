import { useEffect } from 'react'
import { authService } from '@/shared/services/auth-service/auth.service.ts'
import { useAuthStore } from '@/shared/store/auth-store/auth-store.ts'

export function useAuthListener() {
  const setUser = useAuthStore(s => s.setUser)
  const setInitializing = useAuthStore(s => s.setInitializing)

  useEffect(() => {
    return authService.subscribe(user => {
      setUser(user)
      setInitializing(false)
    })
  }, [setUser, setInitializing])
}
