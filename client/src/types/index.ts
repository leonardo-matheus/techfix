export interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'EDITOR'
  createdAt?: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  content?: string
  images: string[]
  demoUrl?: string
  githubUrl?: string
  category: string
  tags: string[]
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  featured: boolean
  order: number
  views: number
  createdAt: string
  updatedAt: string
}

export interface Banner {
  id: string
  title: string
  image: string
  link?: string
  position: string
  active: boolean
  startDate?: string
  endDate?: string
  order: number
  createdAt: string
  updatedAt: string
}

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  read: boolean
  createdAt: string
}

export interface Visit {
  id: string
  page: string
  device?: string
  browser?: string
  country?: string
  createdAt: string
}

export interface Settings {
  id: string
  companyName: string
  email: string
  phone: string
  address: string
  socialLinks: {
    instagram?: string
    linkedin?: string
    github?: string
    twitter?: string
    facebook?: string
  }
  seoTitle: string
  seoDesc: string
  updatedAt: string
}

export interface DashboardStats {
  visits: {
    today: number
    week: number
    month: number
    growthRate: number
  }
  projects: {
    total: number
    totalViews: number
  }
  contacts: {
    total: number
    unread: number
  }
}

export interface ChartData {
  date: string
  visits: number
}

export interface DeviceStats {
  device: string
  count: number
  percentage: number
}

export interface BrowserStats {
  browser: string
  count: number
  percentage: number
}

export interface PageStats {
  page: string
  visits: number
}

export interface CountryStats {
  country: string
  visits: number
}

export interface TopProject {
  id: string
  title: string
  slug: string
  views: number
  category: string
}

export interface RecentActivity {
  visits: Visit[]
  contacts: Pick<Contact, 'id' | 'name' | 'email' | 'read' | 'createdAt'>[]
}

export interface UploadResponse {
  url: string
  filename: string
  originalname: string
  size: number
}

export type ApiError = {
  error: string
  stack?: string
}
