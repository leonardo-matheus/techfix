import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { authService } from '@/services/authService'
import { getErrorMessage } from '@/lib/utils'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { setAuth, logout: storeLogout, user, isAuthenticated } = useAuthStore()

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true)
      setError(null)

      try {
        const { token, user } = await authService.login(email, password)
        setAuth(token, user)
        navigate('/admin')
      } catch (err) {
        const message = getErrorMessage(err)
        setError(message)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [setAuth, navigate]
  )

  const logout = useCallback(() => {
    storeLogout()
    navigate('/admin/login')
  }, [storeLogout, navigate])

  const checkAuth = useCallback(async () => {
    if (!isAuthenticated) return false

    try {
      await authService.me()
      return true
    } catch {
      storeLogout()
      return false
    }
  }, [isAuthenticated, storeLogout])

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuth,
    clearError: () => setError(null),
  }
}
