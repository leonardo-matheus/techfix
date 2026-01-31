import { Router } from 'express'
import { getSettings, updateSettings } from '../controllers/settingsController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

// Public route to get settings for the frontend
router.get('/', getSettings)

// Admin route to update settings
router.put('/', authMiddleware, updateSettings)

export default router
