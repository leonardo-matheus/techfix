import { Router } from 'express'
import {
  getContacts,
  getContact,
  createContact,
  markAsRead,
  deleteContact,
} from '../controllers/contactsController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

// Public route for submitting contact form
router.post('/', createContact)

// Admin routes
router.get('/', authMiddleware, getContacts)
router.get('/:id', authMiddleware, getContact)
router.patch('/:id/read', authMiddleware, markAsRead)
router.delete('/:id', authMiddleware, deleteContact)

export default router
