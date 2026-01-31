import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function parseUserAgent(userAgent: string | undefined): { device: string; browser: string } {
  if (!userAgent) {
    return { device: 'unknown', browser: 'unknown' }
  }

  let device = 'desktop'
  if (/mobile/i.test(userAgent)) {
    device = 'mobile'
  } else if (/tablet|ipad/i.test(userAgent)) {
    device = 'tablet'
  }

  let browser = 'unknown'
  if (/chrome/i.test(userAgent) && !/edge|edg/i.test(userAgent)) {
    browser = 'Chrome'
  } else if (/firefox/i.test(userAgent)) {
    browser = 'Firefox'
  } else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) {
    browser = 'Safari'
  } else if (/edge|edg/i.test(userAgent)) {
    browser = 'Edge'
  } else if (/opera|opr/i.test(userAgent)) {
    browser = 'Opera'
  }

  return { device, browser }
}

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim()
  }
  return req.socket.remoteAddress || 'unknown'
}

export async function trackVisit(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { device, browser } = parseUserAgent(req.headers['user-agent'])
    const ip = getClientIp(req)

    await prisma.visit.create({
      data: {
        page: req.path,
        referrer: req.headers.referer || null,
        userAgent: req.headers['user-agent'] || null,
        ip,
        device,
        browser,
      },
    })
  } catch (error) {
    console.error('Error tracking visit:', error)
  }

  next()
}
