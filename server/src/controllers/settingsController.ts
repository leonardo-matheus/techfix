import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const settingsSchema = z.object({
  companyName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  socialLinks: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
})

export async function getSettings(_req: Request, res: Response): Promise<void> {
  try {
    let settings = await prisma.settings.findUnique({
      where: { id: 'settings' },
    })

    if (!settings) {
      settings = await prisma.settings.create({
        data: { id: 'settings' },
      })
    }

    // Parse socialLinks if it's a string
    const response = {
      ...settings,
      socialLinks: typeof settings.socialLinks === 'string'
        ? JSON.parse(settings.socialLinks)
        : settings.socialLinks,
    }

    res.json(response)
  } catch (error) {
    console.error('Get settings error:', error)
    res.status(500).json({ error: 'Erro ao buscar configurações' })
  }
}

export async function updateSettings(req: Request, res: Response): Promise<void> {
  try {
    const data = settingsSchema.parse(req.body)

    const settings = await prisma.settings.upsert({
      where: { id: 'settings' },
      create: {
        id: 'settings',
        ...data,
      },
      update: data,
    })

    res.json(settings)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message })
      return
    }
    console.error('Update settings error:', error)
    res.status(500).json({ error: 'Erro ao atualizar configurações' })
  }
}
