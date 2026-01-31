import { Router } from 'express'
import {
  getDashboardStats,
  getVisitsOverTime,
  getTopProjects,
  getDeviceStats,
  getBrowserStats,
  getPageStats,
  getCountryStats,
  getRecentActivity,
  exportAnalytics,
} from '../controllers/analyticsController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

// All analytics routes require authentication
router.use(authMiddleware)

router.get('/dashboard', getDashboardStats)
router.get('/visits', getVisitsOverTime)
router.get('/top-projects', getTopProjects)
router.get('/devices', getDeviceStats)
router.get('/browsers', getBrowserStats)
router.get('/pages', getPageStats)
router.get('/countries', getCountryStats)
router.get('/recent', getRecentActivity)
router.get('/export', exportAnalytics)

export default router
