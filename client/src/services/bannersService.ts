import api from './api'
import type { Banner } from '@/types'

export const bannersService = {
  async getActiveBanners(position?: string): Promise<Banner[]> {
    const { data } = await api.get<Banner[]>('/banners/active', {
      params: { position },
    })
    return data
  },

  // Admin methods
  async getBanners(params?: {
    position?: string
    active?: boolean
  }): Promise<Banner[]> {
    const { data } = await api.get<Banner[]>('/banners', { params })
    return data
  },

  async getBanner(id: string): Promise<Banner> {
    const { data } = await api.get<Banner>(`/banners/${id}`)
    return data
  },

  async createBanner(
    banner: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Banner> {
    const { data } = await api.post<Banner>('/banners', banner)
    return data
  },

  async updateBanner(id: string, banner: Partial<Banner>): Promise<Banner> {
    const { data } = await api.put<Banner>(`/banners/${id}`, banner)
    return data
  },

  async deleteBanner(id: string): Promise<void> {
    await api.delete(`/banners/${id}`)
  },

  async reorderBanners(
    banners: Array<{ id: string; order: number }>
  ): Promise<void> {
    await api.post('/banners/reorder', { banners })
  },
}
