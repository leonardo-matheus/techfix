import type { Project } from '@/types'
import { mockProjects } from '@/data/projects'

interface GetProjectsParams {
  category?: string
  status?: string
  featured?: boolean
  search?: string
}

export const projectsService = {
  async getPublicProjects(): Promise<Project[]> {
    return mockProjects.filter(p => p.status === 'PUBLISHED')
  },

  async getProjectBySlug(slug: string): Promise<Project> {
    const project = mockProjects.find(p => p.slug === slug)
    if (!project) throw new Error('Project not found')
    return project
  },

  async getCategories(): Promise<string[]> {
    const categories = [...new Set(mockProjects.map(p => p.category))]
    return categories
  },

  // Admin methods (mock for demo)
  async getProjects(params?: GetProjectsParams): Promise<Project[]> {
    let projects = [...mockProjects]
    if (params?.category) {
      projects = projects.filter(p => p.category === params.category)
    }
    if (params?.status) {
      projects = projects.filter(p => p.status === params.status)
    }
    if (params?.featured !== undefined) {
      projects = projects.filter(p => p.featured === params.featured)
    }
    if (params?.search) {
      const search = params.search.toLowerCase()
      projects = projects.filter(p =>
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      )
    }
    return projects
  },

  async getProject(id: string): Promise<Project> {
    const project = mockProjects.find(p => p.id === id)
    if (!project) throw new Error('Project not found')
    return project
  },

  async createProject(
    project: Omit<Project, 'id' | 'views' | 'createdAt' | 'updatedAt'>
  ): Promise<Project> {
    // Mock - just return the project with generated fields
    return {
      ...project,
      id: String(mockProjects.length + 1),
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  async updateProject(
    id: string,
    project: Partial<Project>
  ): Promise<Project> {
    const existing = mockProjects.find(p => p.id === id)
    if (!existing) throw new Error('Project not found')
    return { ...existing, ...project, updatedAt: new Date().toISOString() }
  },

  async deleteProject(id: string): Promise<void> {
    // Mock - no-op
    console.log('Delete project:', id)
  },

  async reorderProjects(
    projects: Array<{ id: string; order: number }>
  ): Promise<void> {
    // Mock - no-op
    console.log('Reorder projects:', projects)
  },
}
