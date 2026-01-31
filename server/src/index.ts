import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import path from 'path'
import { fileURLToPath } from 'url'

import { corsOptions } from './config/cors.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import { trackVisit } from './middleware/trackVisit.js'

import authRoutes from './routes/auth.js'
import projectsRoutes from './routes/projects.js'
import bannersRoutes from './routes/banners.js'
import analyticsRoutes from './routes/analytics.js'
import contactsRoutes from './routes/contacts.js'
import settingsRoutes from './routes/settings.js'
import uploadRoutes from './routes/upload.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}))
app.use(cors(corsOptions))

// Rate limiting (higher limit for development)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: process.env.NODE_ENV === 'production' ? 100 : 1000,
  message: { error: 'Muitas requisições, tente novamente mais tarde' },
})
app.use('/api', limiter)

// Body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

// Track visits on public routes
app.use('/api/projects/public', trackVisit)
app.use('/api/banners/active', trackVisit)

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectsRoutes)
app.use('/api/banners', bannersRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/contacts', contactsRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/upload', uploadRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Error handling
app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app
