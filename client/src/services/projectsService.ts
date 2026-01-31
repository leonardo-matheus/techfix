import api from './api'
import type { Project } from '@/types'

interface GetProjectsParams {
  category?: string
  status?: string
  featured?: boolean
  search?: string
}

// Fallback to static data for GitHub Pages demo
async function fetchStaticProjects(): Promise<Project[]> {
  const response = await fetch('/data/projects.json')
  return response.json()
}

export const projectsService = {
  async getPublicProjects(): Promise<Project[]> {
    try {
      const { data } = await api.get<Project[]>('/projects/public')
      return data
    } catch {
      // Fallback to static data
      return fetchStaticProjects()
    }
  },

  async getProjectBySlug(slug: string): Promise<Project> {
    try {
      const { data } = await api.get<Project>(`/projects/public/${slug}`)
      return data
    } catch {
      // Fallback to static data
      const projects = await fetchStaticProjects()
      const project = projects.find(p => p.slug === slug)
      if (!project) throw new Error('Project not found')
      return project
    }
  },

  async getCategories(): Promise<string[]> {
    try {
      const { data } = await api.get<string[]>('/projects/categories')
      return data
    } catch {
      // Fallback to static data
      const projects = await fetchStaticProjects()
      const categories = [...new Set(projects.map(p => p.category))]
      return categories
    }
  },

  // Admin methods
  async getProjects(params?: GetProjectsParams): Promise<Project[]> {
    const { data } = await api.get<Project[]>('/projects', { params })
    return data
  },

  async getProject(id: string): Promise<Project> {
    const { data } = await api.get<Project>(`/projects/${id}`)
    return data
  },

  async createProject(
    project: Omit<Project, 'id' | 'views' | 'createdAt' | 'updatedAt'>
  ): Promise<Project> {
    const { data } = await api.post<Project>('/projects', project)
    return data
  },

  async updateProject(
    id: string,
    project: Partial<Project>
  ): Promise<Project> {
    const { data } = await api.put<Project>(`/projects/${id}`, project)
    return data
  },

  async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`)
  },

  async reorderProjects(
    projects: Array<{ id: string; order: number }>
  ): Promise<void> {
    await api.post('/projects/reorder', { projects })
  },
}
