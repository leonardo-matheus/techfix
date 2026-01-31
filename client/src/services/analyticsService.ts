import api from './api'
import type {
  DashboardStats,
  ChartData,
  DeviceStats,
  BrowserStats,
  PageStats,
  CountryStats,
  TopProject,
  RecentActivity,
} from '@/types'

type Period = 'today' | 'week' | 'month' | 'year'

export const analyticsService = {
  async getDashboardStats(period?: Period): Promise<DashboardStats> {
    const { data } = await api.get<DashboardStats>('/analytics/dashboard', {
      params: { period },
    })
    return data
  },

  async getVisitsOverTime(period?: Period): Promise<ChartData[]> {
    const { data } = await api.get<ChartData[]>('/analytics/visits', {
      params: { period },
    })
    return data
  },

  async getTopProjects(limit?: number): Promise<TopProject[]> {
    const { data } = await api.get<TopProject[]>('/analytics/top-projects', {
      params: { limit },
    })
    return data
  },

  async getDeviceStats(period?: Period): Promise<DeviceStats[]> {
    const { data } = await api.get<DeviceStats[]>('/analytics/devices', {
      params: { period },
    })
    return data
  },

  async getBrowserStats(period?: Period): Promise<BrowserStats[]> {
    const { data } = await api.get<BrowserStats[]>('/analytics/browsers', {
      params: { period },
    })
    return data
  },

  async getPageStats(period?: Period): Promise<PageStats[]> {
    const { data } = await api.get<PageStats[]>('/analytics/pages', {
      params: { period },
    })
    return data
  },

  async getCountryStats(period?: Period): Promise<CountryStats[]> {
    const { data } = await api.get<CountryStats[]>('/analytics/countries', {
      params: { period },
    })
    return data
  },

  async getRecentActivity(limit?: number): Promise<RecentActivity> {
    const { data } = await api.get<RecentActivity>('/analytics/recent', {
      params: { limit },
    })
    return data
  },

  async exportAnalytics(
    period: Period,
    format: 'csv' | 'json'
  ): Promise<Blob | object> {
    const { data } = await api.get('/analytics/export', {
      params: { period, format },
      responseType: format === 'csv' ? 'blob' : 'json',
    })
    return data
  },
}
