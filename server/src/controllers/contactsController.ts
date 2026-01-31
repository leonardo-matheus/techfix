import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres'),
})

export async function getContacts(req: Request, res: Response): Promise<void> {
  try {
    const { read } = req.query

    const where: { read?: boolean } = {}

    if (read === 'true') {
      where.read = true
    } else if (read === 'false') {
      where.read = false
    }

    const contacts = await prisma.contact.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    res.json(contacts)
  } catch (error) {
    console.error('Get contacts error:', error)
    res.status(500).json({ error: 'Erro ao buscar contatos' })
  }
}

export async function getContact(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params

    const contact = await prisma.contact.findUnique({
      where: { id },
    })

    if (!contact) {
      res.status(404).json({ error: 'Contato não encontrado' })
      return
    }

    res.json(contact)
  } catch (error) {
    console.error('Get contact error:', error)
    res.status(500).json({ error: 'Erro ao buscar contato' })
  }
}

export async function createContact(req: Request, res: Response): Promise<void> {
  try {
    const data = contactSchema.parse(req.body)

    const contact = await prisma.contact.create({
      data,
    })

    res.status(201).json(contact)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message })
      return
    }
    console.error('Create contact error:', error)
    res.status(500).json({ error: 'Erro ao enviar mensagem' })
  }
}

export async function markAsRead(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params

    const contact = await prisma.contact.update({
      where: { id },
      data: { read: true },
    })

    res.json(contact)
  } catch (error) {
    console.error('Mark as read error:', error)
    res.status(500).json({ error: 'Erro ao marcar como lido' })
  }
}

export async function deleteContact(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params

    await prisma.contact.delete({
      where: { id },
    })

    res.json({ message: 'Contato excluído com sucesso' })
  } catch (error) {
    console.error('Delete contact error:', error)
    res.status(500).json({ error: 'Erro ao excluir contato' })
  }
}
