import { Router } from 'express'
import {
  getBanners,
  getActiveBanners,
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  reorderBanners,
} from '../controllers/bannersController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

// Public routes
router.get('/active', getActiveBanners)

// Admin routes
router.get('/', authMiddleware, getBanners)
router.get('/:id', authMiddleware, getBanner)
router.post('/', authMiddleware, createBanner)
router.put('/:id', authMiddleware, updateBanner)
router.delete('/:id', authMiddleware, deleteBanner)
router.post('/reorder', authMiddleware, reorderBanners)

export default router
