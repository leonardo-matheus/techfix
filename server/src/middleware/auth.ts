import { Request, Response, NextFunction } from 'express'
import { verifyToken, TokenPayload } from '../utils/jwt.js'

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).json({ error: 'Token não fornecido' })
    return
  }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) {
    res.status(401).json({ error: 'Token mal formatado' })
    return
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    res.status(401).json({ error: 'Token mal formatado' })
    return
  }

  try {
    const decoded = verifyToken(token)
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido ou expirado' })
  }
}

export function adminMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ error: 'Não autenticado' })
    return
  }

  if (req.user.role !== 'ADMIN') {
    res.status(403).json({ error: 'Acesso negado' })
    return
  }

  next()
}
