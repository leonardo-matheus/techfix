import api from './api'
import type { Settings } from '@/types'

export const settingsService = {
  async getSettings(): Promise<Settings> {
    const { data } = await api.get<Settings>('/settings')
    return data
  },

  async updateSettings(settings: Partial<Settings>): Promise<Settings> {
    const { data } = await api.put<Settings>('/settings', settings)
    return data
  },
}
