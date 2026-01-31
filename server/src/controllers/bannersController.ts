import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const bannerSchema = z.object({
  title: z.string().min(2, 'Título deve ter no mínimo 2 caracteres'),
  image: z.string().min(1, 'Imagem é obrigatória'),
  link: z.string().optional().nullable(),
  position: z.string().min(1, 'Posição é obrigatória'),
  active: z.boolean().default(true),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  order: z.number().default(0),
})

export async function getBanners(req: Request, res: Response): Promise<void> {
  try {
    const { position, active } = req.query

    const where: {
      position?: string
      active?: boolean
    } = {}

    if (position && typeof position === 'string') {
      where.position = position
    }

    if (active === 'true') {
      where.active = true
    } else if (active === 'false') {
      where.active = false
    }

    const banners = await prisma.banner.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })

    res.json(banners)
  } catch (error) {
    console.error('Get banners error:', error)
    res.status(500).json({ error: 'Erro ao buscar banners' })
  }
}

export async function getActiveBanners(req: Request, res: Response): Promise<void> {
  try {
    const { position } = req.query
    const now = new Date()

    const where: {
      active: boolean
      position?: string
      OR: Array<{
        startDate?: null | { lte: Date }
        endDate?: null | { gte: Date }
        AND?: Array<{ startDate?: { lte: Date }; endDate?: { gte: Date } }>
      }>
    } = {
      active: true,
      OR: [
        { startDate: null, endDate: null },
        { startDate: { lte: now }, endDate: null },
        { startDate: null, endDate: { gte: now } },
        { AND: [{ startDate: { lte: now } }, { endDate: { gte: now } }] },
      ],
    }

    if (position && typeof position === 'string') {
      where.position = position
    }

    const banners = await prisma.banner.findMany({
      where,
      orderBy: [{ order: 'asc' }],
    })

    res.json(banners)
  } catch (error) {
    console.error('Get active banners error:', error)
    res.status(500).json({ error: 'Erro ao buscar banners' })
  }
}

export async function getBanner(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params

    const banner = await prisma.banner.findUnique({
      where: { id },
    })

    if (!banner) {
      res.status(404).json({ error: 'Banner não encontrado' })
      return
    }

    res.json(banner)
  } catch (error) {
    console.error('Get banner error:', error)
    res.status(500).json({ error: 'Erro ao buscar banner' })
  }
}

export async function createBanner(req: Request, res: Response): Promise<void> {
  try {
    const data = bannerSchema.parse(req.body)

    const banner = await prisma.banner.create({
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    })

    res.status(201).json(banner)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message })
      return
    }
    console.error('Create banner error:', error)
    res.status(500).json({ error: 'Erro ao criar banner' })
  }
}

export async function updateBanner(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params
    const data = bannerSchema.partial().parse(req.body)

    const existingBanner = await prisma.banner.findUnique({
      where: { id },
    })

    if (!existingBanner) {
      res.status(404).json({ error: 'Banner não encontrado' })
      return
    }

    const banner = await prisma.banner.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : data.startDate === null ? null : undefined,
        endDate: data.endDate ? new Date(data.endDate) : data.endDate === null ? null : undefined,
      },
    })

    res.json(banner)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message })
      return
    }
    console.error('Update banner error:', error)
    res.status(500).json({ error: 'Erro ao atualizar banner' })
  }
}

export async function deleteBanner(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params

    const existingBanner = await prisma.banner.findUnique({
      where: { id },
    })

    if (!existingBanner) {
      res.status(404).json({ error: 'Banner não encontrado' })
      return
    }

    await prisma.banner.delete({
      where: { id },
    })

    res.json({ message: 'Banner excluído com sucesso' })
  } catch (error) {
    console.error('Delete banner error:', error)
    res.status(500).json({ error: 'Erro ao excluir banner' })
  }
}

export async function reorderBanners(req: Request, res: Response): Promise<void> {
  try {
    const schema = z.object({
      banners: z.array(
        z.object({
          id: z.string(),
          order: z.number(),
        })
      ),
    })

    const { banners } = schema.parse(req.body)

    await prisma.$transaction(
      banners.map((b) =>
        prisma.banner.update({
          where: { id: b.id },
          data: { order: b.order },
        })
      )
    )

    res.json({ message: 'Ordem atualizada com sucesso' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message })
      return
    }
    console.error('Reorder banners error:', error)
    res.status(500).json({ error: 'Erro ao reordenar banners' })
  }
}
