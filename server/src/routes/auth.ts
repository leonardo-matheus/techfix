import { Router } from 'express'
import { login, register, me, updateProfile } from '../controllers/authController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.get('/me', authMiddleware, me)
router.put('/profile', authMiddleware, updateProfile)

export default router
