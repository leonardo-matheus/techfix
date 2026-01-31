import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Sidebar } from '@/components/layout/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import { useAuthStore } from '@/store/authStore'
import { Skeleton } from '@/components/ui/skeleton'

// Lazy loaded pages
const Home = lazy(() => import('@/pages/public/Home'))
const About = lazy(() => import('@/pages/public/About'))
const ProjectsPage = lazy(() => import('@/pages/public/ProjectsPage'))
const ProjectDetails = lazy(() => import('@/pages/public/ProjectDetails'))
const Contact = lazy(() => import('@/pages/public/Contact'))

const Login = lazy(() => import('@/pages/admin/Login'))
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'))
const ProjectsManager = lazy(() => import('@/pages/admin/ProjectsManager'))
const BannersManager = lazy(() => import('@/pages/admin/BannersManager'))
const ContactsManager = lazy(() => import('@/pages/admin/ContactsManager'))
const AnalyticsPage = lazy(() => import('@/pages/admin/AnalyticsPage'))
const Settings = lazy(() => import('@/pages/admin/Settings'))

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 w-full max-w-md px-4">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  )
}

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingFallback />}>
            <Outlet />
          </Suspense>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  )
}

function AdminLayout() {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-muted/30">
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/projetos" element={<ProjectsPage />} />
          <Route path="/projetos/:slug" element={<ProjectDetails />} />
          <Route path="/contato" element={<Contact />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={
          <Suspense fallback={<LoadingFallback />}>
            <Login />
          </Suspense>
        } />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projetos" element={<ProjectsManager />} />
          <Route path="banners" element={<BannersManager />} />
          <Route path="contatos" element={<ContactsManager />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="configuracoes" element={<Settings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
