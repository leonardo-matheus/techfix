import { useState, useEffect, useCallback } from 'react'
import { projectsService } from '@/services/projectsService'
import type { Project } from '@/types'
import { getErrorMessage } from '@/lib/utils'

export function usePublicProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await projectsService.getPublicProjects()
        setProjects(data)
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, isLoading, error }
}

export function useProject(slug: string) {
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await projectsService.getProjectBySlug(slug)
        setProject(data)
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setIsLoading(false)
      }
    }

    if (slug) {
      fetchProject()
    }
  }, [slug])

  return { project, isLoading, error }
}

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await projectsService.getCategories()
        setCategories(data)
      } catch {
        // Silently fail
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, isLoading }
}

// Admin hook for managing projects
export function useAdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async (params?: {
    category?: string
    status?: string
    search?: string
  }) => {
    setIsLoading(true)
    try {
      const data = await projectsService.getProjects(params)
      setProjects(data)
      setError(null)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const createProject = async (
    project: Omit<Project, 'id' | 'views' | 'createdAt' | 'updatedAt'>
  ) => {
    const newProject = await projectsService.createProject(project)
    setProjects((prev) => [...prev, newProject])
    return newProject
  }

  const updateProject = async (id: string, project: Partial<Project>) => {
    const updated = await projectsService.updateProject(id, project)
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)))
    return updated
  }

  const deleteProject = async (id: string) => {
    await projectsService.deleteProject(id)
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  const reorderProjects = async (
    orderedProjects: Array<{ id: string; order: number }>
  ) => {
    await projectsService.reorderProjects(orderedProjects)
    fetchProjects()
  }

  return {
    projects,
    isLoading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    reorderProjects,
  }
}
