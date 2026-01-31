import { Router } from 'express'
import {
  getProjects,
  getPublicProjects,
  getProject,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
  getCategories,
} from '../controllers/projectsController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

// Public routes
router.get('/public', getPublicProjects)
router.get('/public/:slug', getProjectBySlug)
router.get('/categories', getCategories)

// Admin routes
router.get('/', authMiddleware, getProjects)
router.get('/:id', authMiddleware, getProject)
router.post('/', authMiddleware, createProject)
router.put('/:id', authMiddleware, updateProject)
router.delete('/:id', authMiddleware, deleteProject)
router.post('/reorder', authMiddleware, reorderProjects)

export default router
