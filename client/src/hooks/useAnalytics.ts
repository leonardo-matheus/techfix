import { useState, useEffect, useCallback } from 'react'
import { analyticsService } from '@/services/analyticsService'
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
import { getErrorMessage } from '@/lib/utils'

type Period = 'today' | 'week' | 'month' | 'year'

export function useDashboardStats(period: Period = 'month') {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      setIsLoading(true)
      try {
        const data = await analyticsService.getDashboardStats(period)
        setStats(data)
        setError(null)
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [period])

  return { stats, isLoading, error }
}

export function useVisitsOverTime(period: Period = 'month') {
  const [data, setData] = useState<ChartData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const result = await analyticsService.getVisitsOverTime(period)
        setData(result)
        setError(null)
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [period])

  return { data, isLoading, error }
}

export function useTopProjects(limit = 10) {
  const [projects, setProjects] = useState<TopProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const data = await analyticsService.getTopProjects(limit)
        setProjects(data)
        setError(null)
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [limit])

  return { projects, isLoading, error }
}

export function useDeviceStats(period: Period = 'month') {
  const [stats, setStats] = useState<DeviceStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const data = await analyticsService.getDeviceStats(period)
        setStats(data)
        setError(null)
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [period])

  return { stats, isLoading, error }
}

export function useBrowserStats(period: Period = 'month') {
  const [stats, setStats] = useState<BrowserStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const data = await analyticsService.getBrowserStats(period)
        setStats(data)
        setError(null)
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [period])

  return { stats, isLoading, error }
}

export function usePageStats(period: Period = 'month') {
  const [stats, setStats] = useState<PageStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const data = await analyticsService.getPageStats(period)
        setStats(data)
        setError(null)
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [period])

  return { stats, isLoading, error }
}

export function useCountryStats(period: Period = 'month') {
  const [stats, setStats] = useState<CountryStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const data = await analyticsService.getCountryStats(period)
        setStats(data)
        setError(null)
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [period])

  return { stats, isLoading, error }
}

export function useRecentActivity(limit = 20) {
  const [activity, setActivity] = useState<RecentActivity | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await analyticsService.getRecentActivity(limit)
      setActivity(data)
      setError(null)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }, [limit])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { activity, isLoading, error, refresh }
}
