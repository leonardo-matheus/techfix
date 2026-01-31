import api from './api'
import type { AuthResponse, User } from '@/types'

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', {
      email,
      password,
    })
    return data
  },

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register', {
      name,
      email,
      password,
    })
    return data
  },

  async me(): Promise<User> {
    const { data } = await api.get<User>('/auth/me')
    return data
  },

  async updateProfile(profile: {
    name?: string
    currentPassword?: string
    newPassword?: string
  }): Promise<User> {
    const { data } = await api.put<User>('/auth/profile', profile)
    return data
  },
}
