import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  ArrowLeft,
  Calendar,
  Eye,
  ExternalLink,
  Github,
  Cpu,
  Code2,
  Database,
  Layers,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useProject } from '@/hooks/useProjects'
import { formatDate } from '@/lib/utils'
import { Banner } from '@/components/landing/Banner'

const tagIcons: Record<string, React.ElementType> = {
  'React': Code2,
  'Python': Code2,
  'ESP32': Cpu,
  'IoT': Cpu,
  'Hardware': Cpu,
  'PostgreSQL': Database,
  'MongoDB': Database,
  'SQLite': Database,
  'Node.js': Layers,
}

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>()
  const { project, isLoading, error } = useProject(slug || '')

  if (isLoading) {
    return (
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-8 w-48 mb-8" />
          <Skeleton className="h-[400px] w-full rounded-2xl mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </main>
    )
  }

  if (error || !project) {
    return (
      <main className="pt-20">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Projeto não encontrado</h1>
          <p className="text-muted-foreground mb-8">
            O projeto que você está procurando não existe ou foi removido.
          </p>
          <Button asChild>
            <Link to="/projetos">Ver todos os projetos</Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-12">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button asChild variant="ghost" className="mb-8">
              <Link to="/projetos">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para projetos
              </Link>
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Category Badge */}
              <Badge className="mb-4 text-sm" variant="secondary">
                {project.category}
              </Badge>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {project.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {project.description}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatDate(project.createdAt)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  {project.views} visualizações
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.demoUrl && (
                  <Button size="lg" asChild>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ver Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button size="lg" variant="outline" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Ver no GitHub
                    </a>
                  </Button>
                )}
                <Button size="lg" variant={project.demoUrl || project.githubUrl ? "ghost" : "default"} asChild>
                  <Link to="/contato">
                    Solicitar Orçamento
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 shadow-2xl">
                {project.images[0] ? (
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-contain p-8"
                  />
                ) : project.demoUrl ? (
                  <iframe
                    src={project.demoUrl}
                    title={project.title}
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary via-primary/80 to-blue-600">
                    <div className="text-center text-white">
                      <Cpu className="h-20 w-20 mx-auto mb-4 opacity-80" />
                      <span className="text-2xl font-bold">{project.title}</span>
                    </div>
                  </div>
                )}
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-primary/10 rounded-2xl" />
              <div className="absolute -z-20 -top-8 -right-8 w-full h-full bg-primary/5 rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tags Section */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-sm font-medium text-muted-foreground mr-2">
              Tecnologias:
            </span>
            {project.tags.map((tag) => {
              const Icon = tagIcons[tag] || Code2
              return (
                <Badge
                  key={tag}
                  variant="outline"
                  className="px-3 py-1.5 text-sm bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="mr-1.5 h-3.5 w-3.5" />
                  {tag}
                </Badge>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {project.content && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-li:text-muted-foreground prose-li:my-2
                prose-strong:text-foreground prose-strong:font-semibold
                prose-ul:my-6 prose-ol:my-6
                prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-muted prose-pre:border
              "
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {project.content}
              </ReactMarkdown>
            </motion.div>
          )}

          {/* Quick Info Cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
              <CardContent className="p-6 text-center">
                <Code2 className="h-10 w-10 mx-auto mb-4 text-blue-500" />
                <h3 className="font-semibold mb-2">Frontend</h3>
                <p className="text-sm text-muted-foreground">
                  React + TypeScript
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
              <CardContent className="p-6 text-center">
                <Cpu className="h-10 w-10 mx-auto mb-4 text-green-500" />
                <h3 className="font-semibold mb-2">Hardware</h3>
                <p className="text-sm text-muted-foreground">
                  ESP32 + Sensores
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
              <CardContent className="p-6 text-center">
                <Database className="h-10 w-10 mx-auto mb-4 text-purple-500" />
                <h3 className="font-semibold mb-2">Backend</h3>
                <p className="text-sm text-muted-foreground">
                  Python + OpenCV
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Gallery */}
          {project.images.length > 1 && (
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6">Galeria</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.images.slice(1).map((image, index) => (
                  <motion.div
                    key={index}
                    className="aspect-video rounded-lg overflow-hidden bg-muted"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - Imagem ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Interessado neste projeto?
                </h3>
                <p className="text-muted-foreground">
                  Entre em contato para saber mais ou solicitar um orçamento personalizado.
                </p>
              </div>
              <Button size="lg" asChild>
                <Link to="/contato">
                  Falar com especialista
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </article>

      <Banner />
    </main>
  )
}
