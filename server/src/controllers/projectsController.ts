import { Request, Response } from 'express'
import { PrismaClient, ProjectStatus } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const projectSchema = z.object({
  title: z.string().min(2, 'Título deve ter no mínimo 2 caracteres'),
  slug: z.string().min(2, 'Slug deve ter no mínimo 2 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  content: z.string().optional(),
  images: z.array(z.string()).default([]),
  demoUrl: z.string().url().optional().nullable(),
  githubUrl: z.string().url().optional().nullable(),
  category: z.string().min(2, 'Categoria é obrigatória'),
  tags: z.array(z.string()).default([]),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  featured: z.boolean().default(false),
  order: z.number().default(0),
})

export async function getProjects(req: Request, res: Response): Promise<void> {
  try {
    const { category, status, featured, search } = req.query

    const where: {
      category?: string
      status?: ProjectStatus
      featured?: boolean
      OR?: Array<{ title: { contains: string; mode: 'insensitive' } } | { description: { contains: string; mode: 'insensitive' } }>
    } = {}

    if (category && typeof category === 'string') {
      where.category = category
    }

    if (status && typeof status === 'string') {
      where.status = status as ProjectStatus
    }

    if (featured === 'true') {
      where.featured = true
    }

    if (search && typeof search === 'string') {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })

    res.json(projects)
  } catch (error) {
    console.error('Get projects error:', error)
    res.status(500).json({ error: 'Erro ao buscar projetos' })
  }
}

export async function getPublicProjects(_req: Request, res: Response): Promise<void> {
  try {
    const projects = await prisma.project.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        images: true,
        demoUrl: true,
        githubUrl: true,
        category: true,
        tags: true,
        featured: true,
      },
    })

    res.json(projects)
  } catch (error) {
    console.error('Get public projects error:', error)
    res.status(500).json({ error: 'Erro ao buscar projetos' })
  }
}

export async function getProject(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params

    const project = await prisma.project.findUnique({
      where: { id },
    })

    if (!project) {
      res.status(404).json({ error: 'Projeto não encontrado' })
      return
    }

    res.json(project)
  } catch (error) {
    console.error('Get project error:', error)
    res.status(500).json({ error: 'Erro ao buscar projeto' })
  }
}

export async function getProjectBySlug(req: Request, res: Response): Promise<void> {
  try {
    const { slug } = req.params

    const project = await prisma.project.findUnique({
      where: { slug },
    })

    if (!project || project.status !== 'PUBLISHED') {
      res.status(404).json({ error: 'Projeto não encontrado' })
      return
    }

    // Track project view
    await prisma.project.update({
      where: { id: project.id },
      data: { views: { increment: 1 } },
    })

    await prisma.projectAnalytics.create({
      data: { projectId: project.id },
    })

    res.json(project)
  } catch (error) {
    console.error('Get project by slug error:', error)
    res.status(500).json({ error: 'Erro ao buscar projeto' })
  }
}

export async function createProject(req: Request, res: Response): Promise<void> {
  try {
    const data = projectSchema.parse(req.body)

    const existingProject = await prisma.project.findUnique({
      where: { slug: data.slug },
    })

    if (existingProject) {
      res.status(400).json({ error: 'Já existe um projeto com este slug' })
      return
    }

    const project = await prisma.project.create({
      data,
    })

    res.status(201).json(project)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message })
      return
    }
    console.error('Create project error:', error)
    res.status(500).json({ error: 'Erro ao criar projeto' })
  }
}

export async function updateProject(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params
    const data = projectSchema.partial().parse(req.body)

    const existingProject = await prisma.project.findUnique({
      where: { id },
    })

    if (!existingProject) {
      res.status(404).json({ error: 'Projeto não encontrado' })
      return
    }

    if (data.slug && data.slug !== existingProject.slug) {
      const slugExists = await prisma.project.findUnique({
        where: { slug: data.slug },
      })
      if (slugExists) {
        res.status(400).json({ error: 'Já existe um projeto com este slug' })
        return
      }
    }

    const project = await prisma.project.update({
      where: { id },
      data,
    })

    res.json(project)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message })
      return
    }
    console.error('Update project error:', error)
    res.status(500).json({ error: 'Erro ao atualizar projeto' })
  }
}

export async function deleteProject(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params

    const existingProject = await prisma.project.findUnique({
      where: { id },
    })

    if (!existingProject) {
      res.status(404).json({ error: 'Projeto não encontrado' })
      return
    }

    await prisma.project.delete({
      where: { id },
    })

    res.json({ message: 'Projeto excluído com sucesso' })
  } catch (error) {
    console.error('Delete project error:', error)
    res.status(500).json({ error: 'Erro ao excluir projeto' })
  }
}

export async function reorderProjects(req: Request, res: Response): Promise<void> {
  try {
    const schema = z.object({
      projects: z.array(
        z.object({
          id: z.string(),
          order: z.number(),
        })
      ),
    })

    const { projects } = schema.parse(req.body)

    await prisma.$transaction(
      projects.map((p) =>
        prisma.project.update({
          where: { id: p.id },
          data: { order: p.order },
        })
      )
    )

    res.json({ message: 'Ordem atualizada com sucesso' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message })
      return
    }
    console.error('Reorder projects error:', error)
    res.status(500).json({ error: 'Erro ao reordenar projetos' })
  }
}

export async function getCategories(_req: Request, res: Response): Promise<void> {
  try {
    const projects = await prisma.project.findMany({
      select: { category: true },
      distinct: ['category'],
    })

    const categories = projects.map((p) => p.category)
    res.json(categories)
  } catch (error) {
    console.error('Get categories error:', error)
    res.status(500).json({ error: 'Erro ao buscar categorias' })
  }
}
