import { PrismaClient, ProjectStatus, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@techfix.com' },
    update: {},
    create: {
      email: 'admin@techfix.com',
      password: hashedPassword,
      name: 'Administrador',
      role: Role.ADMIN,
    },
  })
  console.log('Admin user created:', admin.email)

  // Create sample projects
  const projects = [
    {
      title: 'Sistema de Gestão Empresarial',
      slug: 'sistema-gestao-empresarial',
      description: 'ERP completo para gestão de pequenas e médias empresas',
      content: `
## Sobre o Projeto

Sistema completo de gestão empresarial desenvolvido com as mais modernas tecnologias do mercado.

### Funcionalidades

- Gestão de estoque
- Controle financeiro
- Emissão de notas fiscais
- Dashboard de métricas
- Relatórios personalizados

### Tecnologias Utilizadas

- React + TypeScript
- Node.js + Express
- PostgreSQL
- Docker
      `,
      images: ['/uploads/project-1.jpg'],
      category: 'Web',
      tags: ['React', 'Node.js', 'PostgreSQL', 'ERP'],
      status: ProjectStatus.PUBLISHED,
      featured: true,
      order: 1,
    },
    {
      title: 'App de Delivery',
      slug: 'app-delivery',
      description: 'Aplicativo mobile para delivery de restaurantes',
      content: `
## Sobre o Projeto

Aplicativo completo para delivery com app do cliente, app do entregador e painel administrativo.

### Funcionalidades

- Catálogo de produtos
- Carrinho de compras
- Rastreamento em tempo real
- Sistema de avaliações
- Push notifications

### Tecnologias Utilizadas

- React Native
- Node.js
- MongoDB
- Socket.io
      `,
      images: ['/uploads/project-2.jpg'],
      category: 'Mobile',
      tags: ['React Native', 'Node.js', 'MongoDB', 'Mobile'],
      status: ProjectStatus.PUBLISHED,
      featured: true,
      order: 2,
    },
    {
      title: 'E-commerce Fashion',
      slug: 'ecommerce-fashion',
      description: 'Loja virtual completa para marca de moda',
      content: `
## Sobre o Projeto

E-commerce de alta performance para marca de moda com integração com marketplaces.

### Funcionalidades

- Catálogo de produtos com variações
- Checkout otimizado
- Integração com gateways de pagamento
- Sistema de cupons
- Gestão de estoque multi-canal

### Tecnologias Utilizadas

- Next.js
- Stripe
- PostgreSQL
- Redis
      `,
      images: ['/uploads/project-3.jpg'],
      category: 'E-commerce',
      tags: ['Next.js', 'Stripe', 'E-commerce', 'PostgreSQL'],
      status: ProjectStatus.PUBLISHED,
      featured: false,
      order: 3,
    },
    {
      title: 'Dashboard Analytics',
      slug: 'dashboard-analytics',
      description: 'Painel de análise de dados para tomada de decisão',
      content: `
## Sobre o Projeto

Dashboard interativo para visualização e análise de dados empresariais.

### Funcionalidades

- Gráficos interativos
- Filtros avançados
- Exportação de relatórios
- Alertas personalizados
- Integração com múltiplas fontes de dados

### Tecnologias Utilizadas

- React
- D3.js
- Python
- Apache Kafka
      `,
      images: ['/uploads/project-4.jpg'],
      category: 'Data',
      tags: ['React', 'D3.js', 'Python', 'Analytics'],
      status: ProjectStatus.PUBLISHED,
      featured: true,
      order: 4,
    },
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    })
  }
  console.log('Projects created:', projects.length)

  // Create sample banners
  const banners = [
    {
      title: 'Promoção de Lançamento',
      image: '/uploads/banner-1.jpg',
      link: '/contato',
      position: 'hero',
      active: true,
      order: 1,
    },
    {
      title: 'Consultoria Gratuita',
      image: '/uploads/banner-2.jpg',
      link: '/contato',
      position: 'services',
      active: true,
      order: 2,
    },
  ]

  for (const banner of banners) {
    await prisma.banner.create({
      data: banner,
    })
  }
  console.log('Banners created:', banners.length)

  // Create settings
  await prisma.settings.upsert({
    where: { id: 'settings' },
    update: {},
    create: {
      companyName: 'TechFix',
      email: 'contato@techfix.com.br',
      phone: '(11) 99999-9999',
      address: 'Av. Paulista, 1000 - São Paulo, SP',
      socialLinks: JSON.stringify({
        instagram: 'https://instagram.com/techfix',
        linkedin: 'https://linkedin.com/company/techfix',
        github: 'https://github.com/techfix',
      }),
      seoTitle: 'TechFix - Desenvolvimento de Software',
      seoDesc: 'Transformamos ideias em soluções digitais. Desenvolvimento web, mobile e sistemas sob medida.',
    },
  })
  console.log('Settings created')

  // Create sample visits for analytics
  const pages = ['/', '/sobre', '/projetos', '/contato']
  const devices = ['desktop', 'mobile', 'tablet']
  const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge']
  const countries = ['Brasil', 'Portugal', 'Estados Unidos']

  for (let i = 0; i < 100; i++) {
    const daysAgo = Math.floor(Math.random() * 30)
    await prisma.visit.create({
      data: {
        page: pages[Math.floor(Math.random() * pages.length)],
        device: devices[Math.floor(Math.random() * devices.length)],
        browser: browsers[Math.floor(Math.random() * browsers.length)],
        country: countries[Math.floor(Math.random() * countries.length)],
        createdAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
      },
    })
  }
  console.log('Sample visits created: 100')

  // Create sample contacts
  const contacts = [
    {
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 98888-7777',
      message: 'Gostaria de um orçamento para desenvolvimento de um app.',
      read: false,
    },
    {
      name: 'Maria Santos',
      email: 'maria@email.com',
      phone: '(21) 97777-6666',
      message: 'Preciso de um sistema de gestão para minha empresa.',
      read: true,
    },
  ]

  for (const contact of contacts) {
    await prisma.contact.create({
      data: contact,
    })
  }
  console.log('Sample contacts created:', contacts.length)

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
