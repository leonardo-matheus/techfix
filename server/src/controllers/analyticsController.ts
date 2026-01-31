import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

function getDateRange(period: string): { start: Date; end: Date } {
  const end = new Date()
  const start = new Date()

  switch (period) {
    case 'today':
      start.setHours(0, 0, 0, 0)
      break
    case 'week':
      start.setDate(start.getDate() - 7)
      break
    case 'month':
      start.setMonth(start.getMonth() - 1)
      break
    case 'year':
      start.setFullYear(start.getFullYear() - 1)
      break
    default:
      start.setDate(start.getDate() - 30)
  }

  return { start, end }
}

export async function getDashboardStats(req: Request, res: Response): Promise<void> {
  try {
    const { period = 'month' } = req.query
    const { start, end } = getDateRange(period as string)

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - 7)

    const monthStart = new Date()
    monthStart.setMonth(monthStart.getMonth() - 1)

    const [
      totalVisitsToday,
      totalVisitsWeek,
      totalVisitsMonth,
      totalProjects,
      totalContacts,
      unreadContacts,
      projectViews,
    ] = await Promise.all([
      prisma.visit.count({
        where: { createdAt: { gte: todayStart } },
      }),
      prisma.visit.count({
        where: { createdAt: { gte: weekStart } },
      }),
      prisma.visit.count({
        where: { createdAt: { gte: monthStart } },
      }),
      prisma.project.count({
        where: { status: 'PUBLISHED' },
      }),
      prisma.contact.count(),
      prisma.contact.count({
        where: { read: false },
      }),
      prisma.project.aggregate({
        _sum: { views: true },
      }),
    ])

    // Previous period for comparison
    const prevMonthStart = new Date(monthStart)
    prevMonthStart.setMonth(prevMonthStart.getMonth() - 1)

    const prevMonthVisits = await prisma.visit.count({
      where: {
        createdAt: {
          gte: prevMonthStart,
          lt: monthStart,
        },
      },
    })

    const growthRate = prevMonthVisits > 0
      ? ((totalVisitsMonth - prevMonthVisits) / prevMonthVisits) * 100
      : 0

    res.json({
      visits: {
        today: totalVisitsToday,
        week: totalVisitsWeek,
        month: totalVisitsMonth,
        growthRate: Math.round(growthRate * 10) / 10,
      },
      projects: {
        total: totalProjects,
        totalViews: projectViews._sum.views || 0,
      },
      contacts: {
        total: totalContacts,
        unread: unreadContacts,
      },
    })
  } catch (error) {
    console.error('Get dashboard stats error:', error)
    res.status(500).json({ error: 'Erro ao buscar estatísticas' })
  }
}

export async function getVisitsOverTime(req: Request, res: Response): Promise<void> {
  try {
    const { period = 'month' } = req.query
    const { start, end } = getDateRange(period as string)

    const visits = await prisma.visit.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      _count: true,
    })

    // Group by date
    const visitsByDate: Record<string, number> = {}
    visits.forEach((v) => {
      const date = v.createdAt.toISOString().split('T')[0]
      visitsByDate[date] = (visitsByDate[date] || 0) + v._count
    })

    // Fill missing dates
    const result: Array<{ date: string; visits: number }> = []
    const currentDate = new Date(start)
    while (currentDate <= end) {
      const dateStr = currentDate.toISOString().split('T')[0]
      result.push({
        date: dateStr,
        visits: visitsByDate[dateStr] || 0,
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }

    res.json(result)
  } catch (error) {
    console.error('Get visits over time error:', error)
    res.status(500).json({ error: 'Erro ao buscar dados de visitas' })
  }
}

export async function getTopProjects(req: Request, res: Response): Promise<void> {
  try {
    const { limit = '10' } = req.query

    const projects = await prisma.project.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { views: 'desc' },
      take: parseInt(limit as string),
      select: {
        id: true,
        title: true,
        slug: true,
        views: true,
        category: true,
      },
    })

    res.json(projects)
  } catch (error) {
    console.error('Get top projects error:', error)
    res.status(500).json({ error: 'Erro ao buscar projetos mais vistos' })
  }
}

export async function getDeviceStats(req: Request, res: Response): Promise<void> {
  try {
    const { period = 'month' } = req.query
    const { start, end } = getDateRange(period as string)

    const devices = await prisma.visit.groupBy({
      by: ['device'],
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
        device: { not: null },
      },
      _count: true,
    })

    const total = devices.reduce((sum, d) => sum + d._count, 0)

    const result = devices.map((d) => ({
      device: d.device || 'unknown',
      count: d._count,
      percentage: Math.round((d._count / total) * 100 * 10) / 10,
    }))

    res.json(result)
  } catch (error) {
    console.error('Get device stats error:', error)
    res.status(500).json({ error: 'Erro ao buscar estatísticas de dispositivos' })
  }
}

export async function getBrowserStats(req: Request, res: Response): Promise<void> {
  try {
    const { period = 'month' } = req.query
    const { start, end } = getDateRange(period as string)

    const browsers = await prisma.visit.groupBy({
      by: ['browser'],
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
        browser: { not: null },
      },
      _count: true,
    })

    const total = browsers.reduce((sum, b) => sum + b._count, 0)

    const result = browsers.map((b) => ({
      browser: b.browser || 'unknown',
      count: b._count,
      percentage: Math.round((b._count / total) * 100 * 10) / 10,
    }))

    res.json(result)
  } catch (error) {
    console.error('Get browser stats error:', error)
    res.status(500).json({ error: 'Erro ao buscar estatísticas de navegadores' })
  }
}

export async function getPageStats(req: Request, res: Response): Promise<void> {
  try {
    const { period = 'month' } = req.query
    const { start, end } = getDateRange(period as string)

    const pages = await prisma.visit.groupBy({
      by: ['page'],
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      _count: true,
      orderBy: { _count: { page: 'desc' } },
      take: 10,
    })

    res.json(
      pages.map((p) => ({
        page: p.page,
        visits: p._count,
      }))
    )
  } catch (error) {
    console.error('Get page stats error:', error)
    res.status(500).json({ error: 'Erro ao buscar estatísticas de páginas' })
  }
}

export async function getCountryStats(req: Request, res: Response): Promise<void> {
  try {
    const { period = 'month' } = req.query
    const { start, end } = getDateRange(period as string)

    const countries = await prisma.visit.groupBy({
      by: ['country'],
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
        country: { not: null },
      },
      _count: true,
      orderBy: { _count: { country: 'desc' } },
      take: 10,
    })

    res.json(
      countries.map((c) => ({
        country: c.country || 'Desconhecido',
        visits: c._count,
      }))
    )
  } catch (error) {
    console.error('Get country stats error:', error)
    res.status(500).json({ error: 'Erro ao buscar estatísticas por país' })
  }
}

export async function getRecentActivity(req: Request, res: Response): Promise<void> {
  try {
    const { limit = '20' } = req.query

    const [recentVisits, recentContacts] = await Promise.all([
      prisma.visit.findMany({
        orderBy: { createdAt: 'desc' },
        take: parseInt(limit as string),
        select: {
          id: true,
          page: true,
          device: true,
          browser: true,
          country: true,
          createdAt: true,
        },
      }),
      prisma.contact.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          read: true,
          createdAt: true,
        },
      }),
    ])

    res.json({
      visits: recentVisits,
      contacts: recentContacts,
    })
  } catch (error) {
    console.error('Get recent activity error:', error)
    res.status(500).json({ error: 'Erro ao buscar atividades recentes' })
  }
}

export async function exportAnalytics(req: Request, res: Response): Promise<void> {
  try {
    const schema = z.object({
      period: z.enum(['today', 'week', 'month', 'year']).default('month'),
      format: z.enum(['csv', 'json']).default('csv'),
    })

    const { period, format } = schema.parse(req.query)
    const { start, end } = getDateRange(period)

    const visits = await prisma.visit.findMany({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    if (format === 'json') {
      res.json(visits)
      return
    }

    // CSV format
    const headers = ['ID', 'Página', 'Dispositivo', 'Navegador', 'País', 'Data']
    const rows = visits.map((v) => [
      v.id,
      v.page,
      v.device || '',
      v.browser || '',
      v.country || '',
      v.createdAt.toISOString(),
    ])

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', `attachment; filename=analytics-${period}.csv`)
    res.send(csv)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message })
      return
    }
    console.error('Export analytics error:', error)
    res.status(500).json({ error: 'Erro ao exportar dados' })
  }
}
