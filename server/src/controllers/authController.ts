import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { generateToken } from '../utils/jwt.js'

const prisma = new PrismaClient()

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const data = loginSchema.parse(req.body)

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (!user) {
      res.status(401).json({ error: 'Credenciais inválidas' })
      return
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password)

    if (!passwordMatch) {
      res.status(401).json({ error: 'Credenciais inválidas' })
      return
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message })
      return
    }
    console.error('Login error:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const data = registerSchema.parse(req.body)

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      res.status(400).json({ error: 'Email já cadastrado' })
      return
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    })

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message })
      return
    }
    console.error('Register error:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export async function me(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Não autenticado' })
      return
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })

    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' })
      return
    }

    res.json(user)
  } catch (error) {
    console.error('Me error:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export async function updateProfile(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Não autenticado' })
      return
    }

    const updateSchema = z.object({
      name: z.string().min(2).optional(),
      currentPassword: z.string().optional(),
      newPassword: z.string().min(6).optional(),
    })

    const data = updateSchema.parse(req.body)

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    })

    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' })
      return
    }

    const updateData: { name?: string; password?: string } = {}

    if (data.name) {
      updateData.name = data.name
    }

    if (data.currentPassword && data.newPassword) {
      const passwordMatch = await bcrypt.compare(data.currentPassword, user.password)
      if (!passwordMatch) {
        res.status(400).json({ error: 'Senha atual incorreta' })
        return
      }
      updateData.password = await bcrypt.hash(data.newPassword, 10)
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    res.json(updatedUser)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message })
      return
    }
    console.error('Update profile error:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
